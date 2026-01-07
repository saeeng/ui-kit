import * as React from "react";
import {cn} from "../../lib/utils";
import {Button} from "./button";

export interface InputProps extends React.ComponentProps<"input"> {
  clearable?: boolean;
  onSearch?: (value: string) => void;
  addonBefore?: React.ReactNode;
  onClear?: () => void;
  loading?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      clearable = false,
      value,
      onChange,
      onSearch,
      addonBefore,
      loading = false,
      onClear,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isClearable, setIsClearable] = React.useState(false);

    const handleClear = React.useCallback(() => {
      const input = containerRef.current?.querySelector("input");
      if (input) input.value = "";

      // 기존 로직 유지(권장하진 않지만, 지금은 interop 이슈 해결이 우선)
      if (onChange) {
        const event = {
          target: {value: ""},
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
      onClear?.();
    }, [onChange, onClear]);

    return (
      <div
        ref={containerRef}
        className={cn("group relative flex w-full items-center", className)}
      >
        {addonBefore && (
          <div
            className={cn(
              "absolute top-0 left-0 flex h-full min-w-8 items-center justify-center rounded rounded-r-none border bg-gray-100 px-2 text-sm text-gray-500",
              "group-focus-within:border-ring group-focus-within:border-r-border"
            )}
          >
            {addonBefore}
          </div>
        )}

        <input
          ref={ref}
          data-slot="input"
          type={type === "search" ? "text" : type}
          value={value}
          onChange={(e) => {
            setIsClearable(clearable && e.target.value !== "");
            onChange?.(e);
          }}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-8 w-full min-w-0 rounded border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-xs",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            clearable && "pr-8",
            addonBefore && "pl-10",
            type === "number" &&
              "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          )}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const input = containerRef.current?.querySelector("input");
              if (onSearch && input) onSearch(input.value);
            }
          }}
          {...props}
        />

        {isClearable && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              "absolute text-gray-400 hover:text-gray-600 focus:outline-none",
              type === "search" ? "right-9" : "right-3"
            )}
          />
        )}

        {type === "search" && (
          <Button
            type="button"
            variant="text"
            className="absolute right-0.5 h-full rounded-none border-l text-gray-400 hover:text-gray-600 focus:outline-none"
            size="icon"
            onClick={() => {
              const input = containerRef.current?.querySelector("input");
              if (onSearch && input) onSearch(input.value);
            }}
          />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export {Input};
