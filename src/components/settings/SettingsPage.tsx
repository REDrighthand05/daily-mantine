import { useAppStore } from "../../stores/appStore";
import type { AppSettings } from "../../types";
import { Button, Checkbox, Group, Paper, Slider, Stack, Text, TextInput, Title } from "@mantine/core";
import { Palette, AlignLeft, AlignRight } from "lucide-react";
import ThemePicker from "../theme/ThemePicker";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LanguagePicker from "./LanguagePicker";
import { exportBackup, importBackup, factoryReset, getSystemInfo, createIssueReport } from "../../bridge/ipc";
import type { SystemInfo } from "../../types";
import CollapsibleSection from "../layout/CollapsibleSection";

export default function SettingsPage() {
  const { t } = useTranslation();
  const [sysInfo, setSysInfo] = useState<SystemInfo | null>(null);
  const { settings, updateSettings, loadAll } = useAppStore();

  useEffect(() => { getSystemInfo().then(setSysInfo).catch(() => {}); }, []);

  const handleExport = async () => {
    const { save } = await import("@tauri-apps/plugin-dialog");
    const p = await save({ filters: [{ name: "Backup", extensions: ["zip"] }], defaultPath: "daily-backup.zip" });
    if (p) await exportBackup(p);
  };
  const handleImport = async () => {
    const { open } = await import("@tauri-apps/plugin-dialog");
    const p = await open({ filters: [{ name: "Backup", extensions: ["zip"] }] });
    if (p) { await importBackup(p); await loadAll(); }
  };
  const handleReportIssue = async () => {
    const d = prompt("Describe the issue:");
    if (d && sysInfo) {
      const p = await createIssueReport(sysInfo, d);
      alert("Report saved to:\n" + p);
    }
  };

  const handleReset = async () => {
    if (confirm("Delete all data?")) { await factoryReset(); await loadAll(); }
  };

  const positions: { value: AppSettings["panel_position"]; icon: React.ReactNode; label: string }[] = [
    { value: "left", icon: <AlignLeft size={18} />, label: t("settings.left") },
    { value: "right", icon: <AlignRight size={18} />, label: t("settings.right") },
    { value: "float", icon: <Palette size={18} />, label: t("settings.float") },
  ];

  return (
    <Paper p="md" withBorder style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title order={3} mb="md">Settings</Title>

      <CollapsibleSection title={t("settings.appearance")}>
        <Text size="sm" fw={500} mt="xs">{t("settings.accentColor")}</Text>
        <ThemePicker
          accentColor={settings.accent_color}
          onChange={(color) => updateSettings({ accent_color: color })}
        />

        <Checkbox
          mt="sm"
          label={t("settings.animations")}
          checked={settings.animations_enabled}
          onChange={(e) => updateSettings({ animations_enabled: e.currentTarget.checked })}
        />
        <Text size="sm" fw={500} mt="sm">{t("settings.language")}</Text>
        <LanguagePicker />
      </CollapsibleSection>

      <CollapsibleSection title={t("settings.panel")}>
        <Text size="sm" fw={500} mt="xs">{t("settings.position")}</Text>
        <Group gap={4} mt="xs">
          {positions.map((p) => (
            <Button
              key={p.value}
              variant={settings.panel_position === p.value ? "light" : "subtle"}
              size="sm"
              onClick={() => updateSettings({ panel_position: p.value })}
              leftSection={p.icon}
            >
              {p.label}
            </Button>
          ))}
        </Group>
        <div style={{ marginTop: 12 }}>
          <Text size="sm" fw={500}>{t("settings.opacity")}</Text>
          <Group gap="sm">
            <Slider
              min={30}
              max={100}
              value={Math.round(settings.opacity * 100)}
              onChange={(v) => updateSettings({ opacity: v / 100 })}
              style={{ flex: 1 }}
            />
            <Text size="sm">{Math.round(settings.opacity * 100)}%</Text>
          </Group>
        </div>
      </CollapsibleSection>

      <div style={{ marginTop: 12 }}>
        <Text size="sm" fw={500}>{t("settings.autostart")}</Text>
        <Checkbox
          label={t("settings.startWithWindows")}
          checked={settings.autostart}
          onChange={(e) => updateSettings({ autostart: e.currentTarget.checked })}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <Text size="sm" fw={500}>{t("settings.shortcut")}</Text>
        <TextInput
          value={settings.shortcut_toggle}
          readOnly
          placeholder="Alt+Space"
          size="sm"
          mt={4}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <Text size="sm" fw={500}>Diagnostics</Text>
        <Stack gap={4} mt={4}>
          <Text size="xs" c="dimmed">OS: {sysInfo?.os} ({sysInfo?.arch})</Text>
          <Text size="xs" c="dimmed">App: v{sysInfo?.app_version}</Text>
          <Button variant="subtle" size="xs" onClick={handleReportIssue}>Report Issue</Button>
        </Stack>
      </div>

      <div style={{ marginTop: 12 }}>
        <Text size="sm" fw={500}>Data</Text>
        <Group gap={4} mt={4}>
          <Button variant="subtle" size="xs" onClick={handleExport}>Export Backup</Button>
          <Button variant="subtle" size="xs" onClick={handleImport}>Import Backup</Button>
          <Button variant="subtle" size="xs" color="red" onClick={handleReset}>Factory Reset</Button>
        </Group>
      </div>
    </Paper>
  );
}