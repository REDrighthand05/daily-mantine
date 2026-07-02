import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { Palette } from "lucide-react";

interface Props {
  accentColor: string;
  onChange: (color: string) => void;
}

const PRESETS = ["#4F8CFF", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444", "#14B8A6"];

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xFF) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xFF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xFF) + amount));
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
}

export default function ThemePicker({ accentColor, onChange }: Props) {
  const handleChange = (color: string) => {
    document.documentElement.style.setProperty("--accent", color);
    document.documentElement.style.setProperty("--accent-hover", adjustColor(color, -20));
    onChange(color);
  };

  return (
    <Group gap={4}>
      {PRESETS.map((color) => (
        <Tooltip key={color} label={color}>
          <ActionIcon
            variant={accentColor === color ? "filled" : "subtle"}
            style={{ backgroundColor: color, width: 28, height: 28, borderRadius: '50%' }}
            onClick={() => handleChange(color)}
            title={color}
          />
        </Tooltip>
      ))}
      <Tooltip label="Custom">
        <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
          <Palette size={14} />
          <input
            type="color"
            value={accentColor}
            onChange={(e) => handleChange(e.target.value)}
            style={{ width: 0, height: 0, border: 'none', padding: 0, opacity: 0, position: 'absolute' }}
          />
        </label>
      </Tooltip>
    </Group>
  );
}