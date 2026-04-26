import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
  variant?: "primary" | "neutral" | "danger";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none cursor-pointer border disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-primary-600 text-white border-transparent hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
  neutral: "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200",
  danger: "bg-red-600 text-white border-transparent hover:bg-red-700",
};

export const Button = ({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button {...props} className={twMerge(base, variants[variant], className)}>
      {children}
    </button>
  );
};
