import { useTranslation } from "react-i18next";
import { useUIStore } from "../../stores/useUIStore";
import { Button, Group } from "@mantine/core";
import { Settings, StickyNote } from "lucide-react";
import type { Tab } from "../../types";

export default function TitleBar() {
  const { t } = useTranslation();
  const { activeTab, setActiveTab } = useUIStore();

  const tabs: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: "notes", icon: <StickyNote size={16} />, label: t("tabs.notes") },
    { id: "settings", icon: <Settings size={16} />, label: t("tabs.settings") },
  ];

  return (
    <div
      data-tauri-drag-region
      className="title-bar"
    >
      <Group gap={4} className="title-bar-tabs">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "light" : "subtle"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            title={tab.label}
            leftSection={tab.icon}
          >
            {tab.label}
          </Button>
        ))}
      </Group>
    </div>
  );
}