import type { EditorMode } from "../../types";
import { ActionIcon, Tooltip } from "@mantine/core";
import { Bold, Italic, Heading, Code, List, Eye, Edit3 } from "lucide-react";

interface Props {
  mode: EditorMode;
  onModeChange: (mode: EditorMode) => void;
  onInsert: (before: string, after: string) => void;
}

export default function EditorToolbar({ mode, onModeChange, onInsert }: Props) {
  return (
    <div className="editor-toolbar">
      <div className="editor-toolbar-actions">
        <Tooltip label="Bold">
          <ActionIcon variant="subtle" size="sm" onClick={() => onInsert("**", "**")}>
            <Bold size={14} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Italic">
          <ActionIcon variant="subtle" size="sm" onClick={() => onInsert("*", "*")}>
            <Italic size={14} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Heading">
          <ActionIcon variant="subtle" size="sm" onClick={() => onInsert("## ", "")}>
            <Heading size={14} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="List">
          <ActionIcon variant="subtle" size="sm" onClick={() => onInsert("- ", "")}>
            <List size={14} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Code block">
          <ActionIcon variant="subtle" size="sm" onClick={() => onInsert("```\n", "\n```")}>
            <Code size={14} />
          </ActionIcon>
        </Tooltip>
      </div>
      <div className="editor-toolbar-modes">
        <Tooltip label="Edit">
          <ActionIcon
            variant={mode === "edit" ? "filled" : "subtle"}
            size="sm"
            onClick={() => onModeChange("edit")}
          >
            <Edit3 size={14} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Preview">
          <ActionIcon
            variant={mode === "preview" ? "filled" : "subtle"}
            size="sm"
            onClick={() => onModeChange("preview")}
          >
            <Eye size={14} />
          </ActionIcon>
        </Tooltip>
      </div>
    </div>
  );
}