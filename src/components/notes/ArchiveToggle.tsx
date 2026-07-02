import { useTranslation } from "react-i18next";
import { useUIStore } from "../../stores/useUIStore";
import { Button, Group } from "@mantine/core";
import { Archive, Trash2, FileText } from "lucide-react";

export default function ArchiveToggle() {
  const { t } = useTranslation();
  const { showArchived, showDeleted, setShowArchived, setShowDeleted } = useUIStore();

  const mode = showDeleted ? "trash" : showArchived ? "archive" : "active";

  return (
    <Group gap={4}>
      <Button
        variant={mode === "active" ? "light" : "subtle"}
        size="sm"
        onClick={() => { setShowDeleted(false); setShowArchived(false); }}
        title={t("notes.active")}
        leftSection={<FileText size={12} />}
      >
        {t("notes.active")}
      </Button>
      <Button
        variant={mode === "archive" ? "light" : "subtle"}
        size="sm"
        onClick={() => setShowArchived(true)}
        title={t("notes.archived")}
        leftSection={<Archive size={12} />}
      >
        {t("notes.archived")}
      </Button>
      <Button
        variant={mode === "trash" ? "light" : "subtle"}
        size="sm"
        onClick={() => setShowDeleted(true)}
        title={t("notes.trash")}
        leftSection={<Trash2 size={12} />}
      >
        {t("notes.trash")}
      </Button>
    </Group>
  );
}