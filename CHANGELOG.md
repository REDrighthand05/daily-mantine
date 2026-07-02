# Changelog

All notable changes to Daily will be documented in this file.

## [1.1.0] - 2026-07-03

### Changed

- **Full UI migration to Mantine v7** — all 26 source files rewritten
- Shell.tsx: replaced raw CSS divs with Mantine Button + Paper components
- TitleBar.tsx: Mantine layout with proper component styling
- NoteSearch.tsx: Mantine TextInput + ActionIcon
- ClipboardList.tsx: virtual scroll + Mantine Card components
- ClipboardEntry.tsx: Mantine Card with hover actions
- ClipboardSearch.tsx: Mantine TextInput
- ClipboardDetail.tsx: Mantine Modal + Card layout
- NoteEditor.tsx: Mantine Textarea with editor toolbar
- NoteList.tsx: virtual scroll in Mantine Card layout
- EditorToolbar.tsx: Mantine ActionIcon group
- MarkdownPreview.tsx: Mantine Paper + Typography
- ExportMenu.tsx: Mantine Menu component
- ArchiveToggle.tsx: Mantine SegmentedControl
- TrashBin.tsx: Mantine Card layout
- SearchOverlay.tsx: Mantine Modal + TextInput
- SettingsPage.tsx: Mantine Switch, Select, Button
- LanguagePicker.tsx: Mantine Select
- Tags (CategoryFilter, TagChip, TagPicker): Mantine Chip, Badge, Checkbox
- ThemePicker.tsx: Mantine Chip group
- CollapsibleSection.tsx: Mantine UnstyledButton + Collapse
- ErrorBoundary.tsx: Mantine Alert
- App.tsx: Mantine theme-aware opacity control
- Deleted components.css (Mantine handles all styling natively)
- Global.css: reduced to minimal essentials (scrollbar + html/body reset)
- main.tsx: MantineProvider with dark color scheme

### Added

- @mantine/core, @mantine/hooks, @mantine/notifications dependencies

## [1.0.0] - 2026-07-03

### Added

- Fork from daily-app with Mantine component library integration
- Initial Vite + React + TypeScript + Tauri v2 project structure
