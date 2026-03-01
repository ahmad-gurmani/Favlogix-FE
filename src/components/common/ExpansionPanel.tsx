import React, { useState, type ReactNode } from "react";
import { Icon } from "@iconify/react";

type IconType = "chevron" | "plus";

interface ExpansionPanelProps {
  title: ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
  onChange?: (expanded: boolean) => void;
  className?: string;
  iconType?: IconType;
  iconSize?: number;
}

const ExpansionPanel: React.FC<ExpansionPanelProps> = ({
  title,
  children,
  defaultExpanded = false,
  onChange,
  className = "",
  iconType = "chevron",
  iconSize = 14,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);

  const toggle = (): void => {
    setIsExpanded((prev) => {
      const next = !prev;
      onChange?.(next);
      return next;
    });
  };

  const icon =
    iconType === "plus"
      ? isExpanded
        ? "heroicons:minus"
        : "heroicons:plus"
      : "heroicons:chevron-down";

  return (
    <div className={`${className}`}>
      <button
        type="button"
        aria-expanded={isExpanded}
        className="flex w-full items-center justify-between px-2.5 py-2"
        onClick={toggle}
      >
        <span className="text-[11px] font-medium text-gray-900">{title}</span>
        <Icon
          icon={icon}
          width={iconSize}
          height={iconSize}
          className={`transition-transform duration-300 ${
            iconType === "chevron" && isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default ExpansionPanel;
