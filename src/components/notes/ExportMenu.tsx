import type { Note } from "../../types";
import type { ExportFormat } from "../../types";
import { writeFile } from "../../bridge/ipc";
import { Menu, ActionIcon } from "@mantine/core";
import { Download } from "lucide-react";
import { save } from "@tauri-apps/plugin-dialog";

interface Props {
  note: Note;
}

export default function ExportMenu({ note }: Props) {
  const handleExport = async (format: ExportFormat) => {
    const ext = format === "markdown" ? "md" : "txt";
    const defaultName = note.content.slice(0, 30).replace(/\s+/g, "_") || "note";
    try {
      const path = await save({
        filters: [{ name: format === "markdown" ? "Markdown" : "Text", extensions: [ext] }],
        defaultPath: `${defaultName}.${ext}`,
      });
      if (path) {
        await writeFile(path, note.content);
      }
    } catch (e) {
      console.error("Export failed", e);
    }
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="subtle" size="sm" title="Export note">
          <Download size={14} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => handleExport("markdown")}>Export as Markdown</Menu.Item>
        <Menu.Item onClick={() => handleExport("text")}>Export as Text</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}