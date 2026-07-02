import { useTranslation } from "react-i18next";
import { useAppStore } from "../../stores/appStore";
import { Button, Group, Text, Paper, ActionIcon, Tooltip } from "@mantine/core";
import { RotateCcw, Trash2, AlertTriangle } from "lucide-react";

export default function TrashBin() {
  const { t } = useTranslation();
  const { notes, restoreNote, deleteNote, purgeTrash } = useAppStore();

  const deleted = notes.filter((n) => n.deleted_at !== null)
    .sort((a, b) => (b.deleted_at || 0) - (a.deleted_at || 0));

  const handlePurge = () => {
    if (confirm(t("notes.purgeConfirm"))) {
      purgeTrash();
    }
  };

  if (deleted.length === 0) {
    return (
      <Text c="dimmed" size="sm" ta="center" py="xl">
        {t("notes.trashEmpty")}
      </Text>
    );
  }

  return (
    <div>
      <Group justify="space-between" mb="xs">
        <Text size="sm" c="dimmed">{t("notes.deletedCount", { count: deleted.length })}</Text>
        <Button variant="subtle" size="xs" color="red" onClick={handlePurge} title={t("notes.purgeAll")} leftSection={<AlertTriangle size={12} />}>
          Purge all
        </Button>
      </Group>
      <div>
        {deleted.map((note) => (
          <Paper key={note.id} p="xs" withBorder mb={4}>
            <Group justify="space-between">
              <Text size="sm" truncate="end" style={{ flex: 1 }}>
                {note.content.slice(0, 50) || t("notes.empty")}
              </Text>
              <Group gap={2}>
                <Tooltip label={t("notes.restore")}>
                  <ActionIcon variant="subtle" size="sm" onClick={() => restoreNote(note.id)}>
                    <RotateCcw size={12} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label={t("notes.deletePermanent")}>
                  <ActionIcon variant="subtle" size="sm" color="red" onClick={() => deleteNote(note.id)}>
                    <Trash2 size={12} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
          </Paper>
        ))}
      </div>
    </div>
  );
}