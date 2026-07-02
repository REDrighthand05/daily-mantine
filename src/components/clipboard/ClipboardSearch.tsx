import { useTranslation } from "react-i18next";
import { useUIStore } from "../../stores/useUIStore";
import { TextInput, ActionIcon } from "@mantine/core";
import { Search, X } from "lucide-react";

export default function ClipboardSearch() {
  const { t } = useTranslation();
  const { clipboardSearchQuery, setClipboardSearchQuery } = useUIStore();

  return (
    <TextInput
      value={clipboardSearchQuery}
      onChange={(e) => setClipboardSearchQuery(e.target.value)}
      placeholder={t("clipboard.search")}
      leftSection={<Search size={14} />}
      rightSection={clipboardSearchQuery ? (
        <ActionIcon variant="subtle" size="xs" onClick={() => setClipboardSearchQuery("")}>
          <X size={12} />
        </ActionIcon>
      ) : null}
      size="sm"
    />
  );
}