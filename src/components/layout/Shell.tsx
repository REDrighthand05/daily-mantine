import TitleBar from "./TitleBar";
import NoteList from "../notes/NoteList";
import NoteEditor from "../notes/NoteEditor";
import NoteSearch from "../notes/NoteSearch";
const SettingsPage = React.lazy(() => import("../settings/SettingsPage"));
import ClipboardList from "../clipboard/ClipboardList";
import React from "react";
import { useTranslation } from "react-i18next";
const SearchOverlay = React.lazy(() => import("../search/SearchOverlay"));
import { useAppStore } from "../../stores/appStore";
import { useUIStore } from "../../stores/useUIStore";
import { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import { Button, Paper } from "@mantine/core";
import { FileText, Clipboard, Settings } from "lucide-react";

export default function Shell() {
  const { t } = useTranslation();
  const { loadAll } = useAppStore();
  const { activeTab, setActiveTab } = useUIStore();

  useEffect(() => {
    loadAll();
    const unlisten = listen<string>("navigate", (event) => {
      if (event.payload === "settings") setActiveTab("settings");
    });
    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

    useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const uiState = useUIStore.getState();
      if (uiState.globalSearchOpen) return;
      if (e.key === "/" || ((e.ctrlKey || e.metaKey) && e.key === "f")) {
        e.preventDefault();
        uiState.openGlobalSearch();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="app-container">
      <React.Suspense fallback={null}><SearchOverlay /></React.Suspense>
      <TitleBar />
      {activeTab === "notes" && (
        <div className="notes-panel">
          <NoteSearch />
          <div className="notes-body">
            <NoteList />
            <NoteEditor />
          </div>
        </div>
      )}
      {activeTab === "clipboard" && <ClipboardList />}
      {activeTab === "settings" && <React.Suspense fallback={<Paper p="xl" ta="center">Loading...</Paper>}><SettingsPage /></React.Suspense>}
      <Paper
        withBorder
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
          padding: 4,
          borderTop: '1px solid var(--mantine-color-dark-4)',
        }}
      >
        <Button
          variant={activeTab === "notes" ? "light" : "subtle"}
          size="sm"
          onClick={() => setActiveTab("notes")}
          leftSection={<FileText size={14} />}
        >
          <span className="tab-label">{t("tabs.notes")}</span>
        </Button>
        <Button
          variant={activeTab === "clipboard" ? "light" : "subtle"}
          size="sm"
          onClick={() => setActiveTab("clipboard")}
          leftSection={<Clipboard size={14} />}
        >
          <span className="tab-label">{t("tabs.clipboard")}</span>
        </Button>
        <Button
          variant={activeTab === "settings" ? "light" : "subtle"}
          size="sm"
          onClick={() => setActiveTab("settings")}
          leftSection={<Settings size={14} />}
        >
          <span className="tab-label">{t("tabs.settings")}</span>
        </Button>
      </Paper>
    </div>
  );
}