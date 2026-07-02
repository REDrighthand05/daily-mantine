import { useEffect, useState, useRef } from "react";
import { useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../../stores/appStore";
import { useUIStore } from "../../stores/useUIStore";
import type { ClipboardEntry as CEntry } from "../../types";
import ClipboardEntryComponent from "./ClipboardEntry";
import ClipboardSearch from "./ClipboardSearch";
import ClipboardDetail from "./ClipboardDetail";
import { Button, Group, Text, Paper } from "@mantine/core";
import { Trash2 } from "lucide-react";
import { clipboardPoll } from "../../bridge/ipc";

export default function ClipboardList() {
  const { t } = useTranslation();
  const {
    clipboardEntries,
    loadClipboardEntries, addClipboardEntry,
    deleteClipboardEntry, clearClipboardHistory, starClipboardEntry,
  } = useAppStore();
  const { clipboardSearchQuery } = useUIStore();
  const [detailEntry, setDetailEntry] = useState<CEntry | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    loadClipboardEntries();
    pollRef.current = setInterval(async () => {
      try {
        const entry = await clipboardPoll();
        if (entry) addClipboardEntry(entry);
      } catch {}
    }, 2000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  if (detailEntry) {
    return (
      <ClipboardDetail
        entry={detailEntry}
        onBack={() => setDetailEntry(null)}
        onDelete={async (id) => { await deleteClipboardEntry(id); setDetailEntry(null); }}
        onStar={(id, s) => starClipboardEntry(id, s)}
      />
    );
  }

  const parentRef = useRef<HTMLDivElement>(null);
  const filtered = useMemo(() => clipboardSearchQuery
    ? clipboardEntries.filter((e) =>
        e.content.toLowerCase().includes(clipboardSearchQuery.toLowerCase())
      )
    : clipboardEntries, [clipboardEntries, clipboardSearchQuery]);

  const virtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 5,
  });

  return (
    <Paper p="sm" withBorder style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Group justify="space-between" mb="xs">
        <Text size="sm" c="dimmed">{filtered.length}</Text>
        <Button
          variant="subtle"
          size="xs"
          color="red"
          onClick={() => { if (confirm(t("clipboard.clearConfirm"))) clearClipboardHistory(); }}
          title="Clear history"
          leftSection={<Trash2 size={12} />}
        >
          Clear
        </Button>
      </Group>
      <ClipboardSearch />
      <div className="clipboard-list" ref={parentRef} style={{ flex: 1, overflow: 'auto', marginTop: 4 }}>
        <div style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
          {virtualizer.getVirtualItems().map((vItem) => {
            const entry = filtered[vItem.index];
            return (
              <div key={entry.id} style={{
                position: 'absolute', top: 0, left: 0, width: '100%',
                height: `${vItem.size}px`,
                transform: `translateY(${vItem.start}px)`,
                padding: '2px 0'
              }}>
                <ClipboardEntryComponent
                  entry={entry}
                  onDelete={deleteClipboardEntry}
                  onStar={starClipboardEntry}
                  onClick={setDetailEntry}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Paper>
  );
}