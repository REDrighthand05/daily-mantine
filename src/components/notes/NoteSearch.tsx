import { useTranslation } from "react-i18next";
import { useUIStore } from "../../stores/useUIStore";
import { TextInput, ActionIcon } from "@mantine/core";
import { Search, X } from "lucide-react";

export default function NoteSearch() {
  const { t } = useTranslation();
  const { searchQuery, setSearchQuery } = useUIStore();

  return (
    <TextInput
      placeholder={t("notes.search")}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      leftSection={<Search size={14} />}
      rightSection={searchQuery ? (
        <ActionIcon variant="subtle" size="xs" onClick={() => setSearchQuery("")}>
          <X size={14} />
        </ActionIcon>
      ) : null}
      size="sm"
    />
  );
}