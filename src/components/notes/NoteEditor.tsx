import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../../stores/appStore";
import { useUIStore } from "../../stores/useUIStore";
import type { Note } from "../../types";
import TagChip from "../tags/TagChip";
import TagPicker from "../tags/TagPicker";
import EditorToolbar from "./EditorToolbar";
import ExportMenu from "./ExportMenu";
import MarkdownPreview from "./MarkdownPreview";
import { Paper, Textarea, Button, Group, Text } from "@mantine/core";

export default function NoteEditor() {
  const { t } = useTranslation();
  const { notes, tags, saveNote } = useAppStore();
  const { editorMode, setEditorMode } = useUIStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sorted = [...notes].sort((a, b) => b.updated_at - a.updated_at);
  const editingNote = editingId
    ? notes.find((n) => n.id === editingId)
    : sorted[0];

  useEffect(() => {
    if (!editingId && notes.length > 0) {
      setEditingId(sorted[0]?.id ?? null);
    }
  }, [notes]);

  if (!editingNote) {
    return (
      <Text c="dimmed" size="sm" ta="center" py="xl">
        {t("notes.selectNote")}
      </Text>
    );
  }

  const handleChange = (content: string) => {
    const updated: Note = { ...editingNote, content, updated_at: Date.now() };
    saveNote(updated);
  };

  useEffect(() => {
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, []);

  const handleTagToggle = (tagId: string) => {
    const exists = editingNote.tags.includes(tagId);
    const newTags = exists
      ? editingNote.tags.filter((id) => id !== tagId)
      : [...editingNote.tags, tagId];
    saveNote({ ...editingNote, tags: newTags, updated_at: Date.now() });
  };

  const handleInsert = (before: string, after: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = editingNote.content.slice(start, end);
    const newContent =
      editingNote.content.slice(0, start) +
      before + selected + after +
      editingNote.content.slice(end);
    const cursorPos = start + before.length + selected.length + after.length;
    handleChange(newContent);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(cursorPos, cursorPos);
    });
  };

  const noteTags = tags.filter((t) => editingNote.tags.includes(t.id));

  return (
    <Paper p="sm" withBorder style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Group gap={4} mb="xs">
        <ExportMenu note={editingNote} />
        {noteTags.map((tag) => (
          <TagChip key={tag.id} tag={tag} onRemove={() => handleTagToggle(tag.id)} />
        ))}
        <Button variant="subtle" size="xs" onClick={() => setShowTagPicker(!showTagPicker)}>
          {showTagPicker ? t("common.done") : t("tags.addTags")}
        </Button>
      </Group>
      {showTagPicker && <TagPicker onToggle={handleTagToggle} />}
      <EditorToolbar mode={editorMode} onModeChange={setEditorMode} onInsert={handleInsert} />
      <div className="note-editor-body" style={{ flex: 1, display: 'flex', gap: 4, marginTop: 4 }}>
        {editorMode !== "preview" && (
          <Textarea
            ref={textareaRef}
            value={editingNote.content}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={t("notes.startTyping")}
            autosize
            minRows={8}
            style={{ flex: editorMode === "split" ? 1 : 'none', width: editorMode === "split" ? '50%' : '100%' }}
            styles={{ input: { height: '100%', minHeight: 200 } }}
          />
        )}
        {editorMode !== "edit" && (
          <div style={{ flex: 1, overflow: 'auto', padding: 8 }}>
            <MarkdownPreview content={editingNote.content} />
          </div>
        )}
      </div>
    </Paper>
  );
}