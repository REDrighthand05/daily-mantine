import { useTranslation } from "react-i18next";
import { useAppStore } from "../../stores/appStore";
import { Button, Group } from "@mantine/core";

const LANGUAGES = [
  { code: "en-US", label: "English" },
  { code: "zh-CN", label: "\u4e2d\u6587" },
];

export default function LanguagePicker() {
  const { i18n } = useTranslation();
  const { settings, updateSettings } = useAppStore();

  const handleChange = async (code: string) => {
    await i18n.changeLanguage(code);
    updateSettings({ language: code });
  };

  return (
    <Group gap={4}>
      {LANGUAGES.map((lang) => (
        <Button
          key={lang.code}
          variant={settings.language === lang.code ? "light" : "subtle"}
          size="sm"
          onClick={() => handleChange(lang.code)}
        >
          {lang.label}
        </Button>
      ))}
    </Group>
  );
}