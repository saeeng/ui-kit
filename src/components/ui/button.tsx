// import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";
import * as React from "react";

import {cn} from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "shadow-xs",
        secondary:
          "border border-solid bg-white border-gray-300 hover:bg-gray-200",
        outline: "border shadow-xs",
        ghost: "",
        link: "underline-offset-4 underline hover:underline",
        text: "",
      },
      size: {
        default: "h-8 px-4 py-2 has-[>svg]:px-3",
        sm: "h-7 rounded gap-1.5 px-3 has-[>svg]:px-2.5 text-sm",
        xs: "h-6 rounded gap-1.5 px-2 has-[>svg]:px-1.5 text-xs",
        lg: "h-10 rounded px-6 has-[>svg]:px-4 text-lg",
        icon: "size-7 [&>svg]:size-3.5",
      },
      color: {
        primary: "",
        secondary: "",
        destructive: "",
        warning: "",
        success: "",
      },
    },
    compoundVariants: [
      // Default variant colors
      {
        variant: "default",
        color: "primary",
        class: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      {
        variant: "default",
        color: "secondary",
        class: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      },
      {
        variant: "default",
        color: "destructive",
        class:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      {
        variant: "default",
        color: "warning",
        class: "bg-warning text-warning-foreground hover:bg-warning/90",
      },
      {
        variant: "default",
        color: "success",
        class: "bg-success text-success-foreground hover:bg-success/90",
      },

      // Outline variant colors
      {
        variant: "outline",
        color: "primary",
        class:
          "bg-background text-primary border-primary hover:bg-primary/10 hover:text-primary dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      },
      {
        variant: "outline",
        color: "secondary",
        class:
          "bg-background text-secondary-foreground hover:border-primary hover:text-primary",
      },
      {
        variant: "outline",
        color: "destructive",
        class:
          "bg-background text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive",
      },
      {
        variant: "outline",
        color: "warning",
        class:
          "bg-background text-warning border-warning hover:bg-warning/10 hover:text-warning",
      },
      {
        variant: "outline",
        color: "success",
        class:
          "bg-background text-success border-success hover:bg-success/10 hover:text-success",
      },

      // Ghost variant colors
      {
        variant: "ghost",
        color: "primary",
        class: "text-primary hover:bg-primary/10 hover:text-primary",
      },
      {
        variant: "ghost",
        color: "secondary",
        class:
          "text-secondary-foreground hover:bg-secondary-foreground/10 hover:text-secondary-foreground",
      },
      {
        variant: "ghost",
        color: "destructive",
        class:
          "text-destructive hover:bg-destructive/10 hover:text-destructive",
      },
      {
        variant: "ghost",
        color: "warning",
        class: "text-warning hover:bg-warning/10 hover:text-warning",
      },
      {
        variant: "ghost",
        color: "success",
        class: "text-success hover:bg-success/10 hover:text-success",
      },

      // Link variant colors
      {
        variant: "link",
        color: "primary",
        class: "text-primary hover:text-primary/80",
      },
      {
        variant: "link",
        color: "secondary",
        class: "text-secondary-foreground hover:text-secondary-foreground/80",
      },
      {
        variant: "link",
        color: "destructive",
        class: "text-destructive hover:text-destructive/80",
      },
      {
        variant: "link",
        color: "warning",
        class: "text-warning hover:text-warning/80",
      },
      {
        variant: "link",
        color: "success",
        class: "text-success hover:text-success/80",
      },

      // Text variant colors
      {
        variant: "text",
        color: "primary",
        class: "text-primary hover:text-primary/80",
      },
      {
        variant: "text",
        color: "secondary",
        class: "text-secondary-foreground hover:text-secondary-foreground/80",
      },
      {
        variant: "text",
        color: "destructive",
        class: "text-destructive hover:text-destructive/80",
      },
      {
        variant: "text",
        color: "warning",
        class: "text-warning hover:text-warning/80",
      },
      {
        variant: "text",
        color: "success",
        class: "text-success hover:text-success/80",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      color: "primary",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    Omit<VariantProps<typeof buttonVariants>, "color"> {
  asChild?: boolean;
  color?:
    | "primary"
    | "secondary"
    | "destructive"
    | "warning"
    | "success"
    | (string & {});
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, asChild = false, color, ...props}, ref) => {
    const Comp = "button";

    // const refTemp = React.useRef<HTMLButtonElement>(null);
    const [refTemp, setRefTemp] = React.useState<HTMLButtonElement | null>(
      null
    );
    // 정의된 색상인지 확인
    const predefinedColors = [
      "primary",
      "secondary",
      "destructive",
      "warning",
      "success",
    ];
    const isPredefinedColor = predefinedColors.includes(color as string);

    // 커스텀 색상일 때 동적 스타일 생성
    const getCustomColorStyles = (customColor: string, variant: string) => {
      const colorVar = `${customColor}`;
      const colorVarForeground = `${customColor}/80`;

      switch (variant) {
        case "default":
          return {
            backgroundColor: colorVar,
            color: colorVarForeground,
          };
        case "outline":
          return {
            color: colorVar,
            borderColor: colorVar,
          };
        case "ghost":
        case "link":
        case "text":
          return {
            color: colorVar,
          };
        default:
          return {};
      }
    };

    const customStyles =
      !isPredefinedColor && color
        ? getCustomColorStyles(color, variant || "default")
        : {};

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(
          buttonVariants({
            variant,
            size,
            color: isPredefinedColor ? (color as any) : undefined,
            className,
          })
        )}
        style={{
          ...customStyles,
          ...props.style,
        }}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export {Button, buttonVariants};
