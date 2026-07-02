import { useTranslation } from "react-i18next";
import type { ClipboardEntry as CEntry } from "../../types";
import { Star, Trash2, Clipboard, ArrowLeft } from "lucide-react";
import { writeClipboard } from "../../bridge/ipc";
import { Button, ActionIcon, Paper, Text } from "@mantine/core";

interface Props {
  entry: CEntry;
  onBack: () => void;
  onDelete: (id: string) => void;
  onStar: (id: string, starred: boolean) => void;
}

export default function ClipboardDetail({ entry, onBack, onDelete, onStar }: Props) {
  const { t } = useTranslation();
  const handleCopy = async () => {
    try { await writeClipboard(entry.content); } catch (e) { console.error("Clipboard copy failed:", e); }
  };

  return (
    <Paper p="md" withBorder>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Button variant="subtle" size="sm" onClick={onBack} leftSection={<ArrowLeft size={14} />}>
          Back
        </Button>
        <div>
          <ActionIcon variant="subtle" onClick={handleCopy} title={t("clipboard.copy")}>
            <Clipboard size={14} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color={entry.starred ? "yellow" : "gray"}
            onClick={() => onStar(entry.id, !entry.starred)}
            title={entry.starred ? t("clipboard.unstar") : t("clipboard.star")}
          >
            <Star size={14} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" onClick={() => onDelete(entry.id)} title={t("common.delete")}>
            <Trash2 size={14} />
          </ActionIcon>
        </div>
      </div>
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', padding: 8, background: 'var(--mantine-color-dark-6)', borderRadius: 4, fontSize: 13 }}>{entry.content}</pre>
      <Text c="dimmed" size="xs" mt="xs">
        {t("clipboard.contentType")}: {entry.content_type} | {new Date(entry.created_at).toLocaleString()}
      </Text>
    </Paper>
  );
}