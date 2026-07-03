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
## [1.1.1] - 2026-07-04

### Fixed

- **Acrylic 毛玻璃彻底修复** — 删除 Rust 后端 set_background_color() 调用，该调用在 WebView 软件层写入实色覆盖，完全遮蔽了 OS 层 DWM Acrylic 效果。现在由 	auri.conf.json 的 windowEffects: ["acrylic"] 直接控制，CSS --window-alpha 变量控制透明度

### Added

- **CSS 安全色层** — #root::before 伪元素叠加 gba(0,0,0,0.25) 安全层，确保任何桌面壁纸上文字对比度 ≥ 4.5:1
- **Surface elevation 层级** — 新增 .surface-elevated 和 .surface-dialog 类，编辑器/弹窗使用更高不透明度保障可读性

### Changed

- window.rs: 无用的 	heme 参数已标记为 _theme，消除 Rust 编译 warning
- global.css: 增加 Acrylic 双层背景策略的注释说明