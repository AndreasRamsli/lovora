import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const variantClasses = {
  default:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 light:bg-slate-900 light:text-slate-50 light:hover:bg-slate-800",
  secondary:
    "bg-theme-bg-secondary text-white hover:bg-theme-bg-secondary/80 light:bg-slate-100 light:text-slate-900 light:hover:bg-slate-200",
  outline:
    "border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-100 light:border-slate-300 light:text-slate-900 light:hover:bg-slate-100",
  ghost:
    "hover:bg-slate-800 text-slate-100 light:hover:bg-slate-100 light:text-slate-900",
  link: "text-slate-100 underline-offset-4 hover:underline light:text-slate-900",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
  unstyled: "",
};

const sizeClasses = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
  unstyled: "",
};

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant] ?? variantClasses.default,
          sizeClasses[size] ?? sizeClasses.default,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
