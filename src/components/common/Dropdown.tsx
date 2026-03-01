import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  options: string[];
  defaultSelected?: string;
  onChange?: (val: string) => void;
  align?: 'left' | 'right';
}

const Dropdown: React.FC<DropdownProps> = ({ options, defaultSelected, onChange, align = "right" }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(defaultSelected || options[0] || "");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (): void => {
    setOpen((prev) => !prev);
  };

  return (
    <div ref={ref} className="relative inline-block text-left">
      {/* Trigger */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center gap-1 px-3 py-1 text-[10px] font-semibold text-black rounded-md hover:bg-gray-100"
      >
        {selected}
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          role="menu"
          className={`w-fit absolute mt-2 rounded-md border border-gray-200 bg-white shadow-sm z-50 ${align === 'left' ? 'left-0' : 'right-0'}`}
        >
          <ul className="py-1 text-sm text-gray-700" role="menu">
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                  if (onChange) onChange(opt);
                }}
                className="cursor-pointer px-4 py-1 hover:bg-gray-100 text-nowrap text-[11px]"
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
