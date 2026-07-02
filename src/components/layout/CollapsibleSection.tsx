import { useState, type ReactNode } from "react";
import { Button } from "@mantine/core";
import { ChevronDown } from "lucide-react";

interface Props {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function CollapsibleSection({ title, defaultOpen = true, children }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="collapsible-section">
      <Button
        variant="subtle"
        size="sm"
        onClick={() => setOpen(!open)}
        rightSection={<ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />}
        fullWidth
        style={{ justifyContent: 'space-between' }}
      >
        {title}
      </Button>
      <div className={`collapsible-content ${open ? "open" : ""}`}>
        {children}
      </div>
    </div>
  );
}