import { cn } from "@/utils/cn";

const variants = {
  primary:
    "bg-primary text-white rounded-3xl px-5 py-2 lg:px-9 lg:py-3 cursor-pointer hover:bg-primary/80",
  secondary:
    "border border-border rounded-3xl px-5 py-2 lg:px-9 lg:py-3 cursor-pointer hover:border-border/50",
  goback: "",
};

type ButtonProps = {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  variant = "primary",
  children,
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  return (
    <button type={type} className={cn(variants[variant], className)} onClick={onClick}>
      {children}
    </button>
  );
}
