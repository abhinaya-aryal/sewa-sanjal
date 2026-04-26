import { twMerge } from "tailwind-merge";
import Render from "./Render";
import { useFormContext, get } from "react-hook-form";
import { InputHTMLAttributes, ReactNode, useRef } from "react";
import { LucideIcon } from "lucide-react";

type FormInputProps = {
  label?: string;
  required?: boolean;
  name: string;
  className?: { container?: string; label?: string; input?: string };
  icon?: ReactNode | LucideIcon;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({
  label = "",
  required = false,
  name,
  className,
  icon,
  ...rest
}: FormInputProps) => {
  const formMethods = useFormContext();
  const error = get(formMethods.formState.errors, name);

  const hasIcon = Boolean(icon);

  return (
    <div className={twMerge("", className?.container)}>
      <Render when={Boolean(label)}>
        <label
          htmlFor={name}
          className={twMerge(
            "block text-sm font-medium text-gray-700 mb-1",
            className?.label,
          )}
        >
          {label}
          <Render when={required}>
            <span className="text-red-600 font-semibold">&nbsp;*</span>
          </Render>
        </label>
      </Render>

      <div className="mt-1 relative rounded-md shadow-sm">
        <Render when={hasIcon}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon as ReactNode}
          </div>
        </Render>

        <input
          id={name}
          required={required}
          className={twMerge(
            "focus:ring-primary-500 block w-full pl-10 pr-2 sm:text-sm border border-gray-300 rounded-md py-2",
            hasIcon ? "pl-10" : "pl-2",
            className?.input,
          )}
          {...formMethods.register(name)}
          {...rest}
        />
      </div>

      <p
        className={twMerge(
          "mt-1 text-sm text-red-600 min-h-5 transition-opacity duration-200",
          error ? "opacity-100" : "opacity-0",
        )}
      >
        {error?.message as string}
      </p>
    </div>
  );
};

type ProfileImageInputProps = Pick<
  FormInputProps,
  "name" | "label" | "required"
> & {
  className?: { container?: string; label?: string; image?: string };
};

export const ProfileImageInput = ({
  className,
  name,
  label,
  required = false,
}: ProfileImageInputProps) => {
  const formMethods = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const error = get(formMethods.formState.errors, name);
  const imageUrl = "https://placehold.co/400";

  return (
    <div className={twMerge("", className?.container)}>
      <Render when={Boolean(label)}>
        <label
          htmlFor={name}
          className={twMerge(
            "block text-sm font-medium text-gray-700 mb-1",
            className?.label,
          )}
        >
          {label}
          <Render when={required}>
            <span className="text-red-600 font-semibold">&nbsp;*</span>
          </Render>
        </label>
      </Render>

      <input
        {...formMethods.register(name)}
        ref={inputRef}
        className="w-full hidden"
        type="file"
      />

      <div>
        <img
          src={imageUrl}
          className={twMerge(
            "w-28 rounded-full border-2 border-primary-500 bg-gray-200 shadow-sm",
            className?.image,
          )}
        />
      </div>

      <p
        className={twMerge(
          "mt-1 text-sm text-red-600 min-h-5 transition-opacity duration-200",
          error ? "opacity-100" : "opacity-0",
        )}
      >
        {error?.message as string}
      </p>
    </div>
  );
};
