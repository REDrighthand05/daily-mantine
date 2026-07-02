import type { Tag } from "../../types";
import { Badge, ActionIcon } from "@mantine/core";
import { X } from "lucide-react";

interface Props {
  tag: Tag;
  onRemove?: () => void;
  onClick?: () => void;
  size?: "sm" | "md";
}

export default function TagChip({ tag, onRemove, onClick, size = "md" }: Props) {
  return (
    <Badge
      variant="outline"
      size={size === "sm" ? "sm" : "lg"}
      style={{ borderColor: tag.color || "#888", color: tag.color || "#888", cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
      leftSection={<span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: tag.color || "#888", display: 'inline-block' }} />}
      rightSection={onRemove ? (
        <ActionIcon variant="subtle" size="xs" onClick={(e) => { e.stopPropagation(); onRemove(); }} title="Remove tag">
          <X size={10} />
        </ActionIcon>
      ) : undefined}
    >
      {tag.name}
    </Badge>
  );
}