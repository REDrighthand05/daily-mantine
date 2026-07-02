import { useState } from "react";
import TagChip from "./TagChip";
import { useAppStore } from "../../stores/appStore";
import type { Tag } from "../../types";
import { ActionIcon, Group, TextInput } from "@mantine/core";
import { Plus } from "lucide-react";

interface Props {
  onToggle: (tagId: string) => void;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function TagPicker({ onToggle }: Props) {
  const { tags, saveTag } = useAppStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");

  const handleAdd = async () => {
    const name = newName.trim();
    if (!name) return;
    const tag: Tag = { id: generateId(), name, color: undefined };
    await saveTag(tag);
    setNewName("");
    setShowAdd(false);
  };

  return (
    <div>
      <Group gap={4}>
        {tags.map((tag) => (
          <TagChip
            key={tag.id}
            tag={tag}
            onClick={() => onToggle(tag.id)}
            size="sm"
          />
        ))}
        <ActionIcon variant="subtle" size="sm" onClick={() => setShowAdd(!showAdd)} title="New tag">
          <Plus size={12} />
        </ActionIcon>
      </Group>
      {showAdd && (
        <TextInput
          autoFocus
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
          placeholder="Tag name..."
          size="xs"
          mt={4}
        />
      )}
    </div>
  );
}