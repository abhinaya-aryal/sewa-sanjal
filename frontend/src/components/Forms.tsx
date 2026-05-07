import { twMerge } from "tailwind-merge";
import Render from "./Render";
import { useFormContext, get, Controller } from "react-hook-form";
import {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { LucideIcon } from "lucide-react";
import Select, {
  GroupBase,
  Props as ReactSelectProps,
  StylesConfig,
} from "react-select";
import AsyncSelect from "react-select/async";
import CreatableSelect from "react-select/creatable";
import AsyncCreatableSelect from "react-select/async-creatable";

type FormInputProps = {
  label?: string;
  required?: boolean;
  name: string;
  className?: { container?: string; label?: string; input?: string };
  icon?: ReactNode | LucideIcon;
} & InputHTMLAttributes<HTMLInputElement>;

export const NormalInput = ({
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
            "focus:ring-primary-500 block w-full pr-2 sm:text-sm border border-gray-300 rounded-md py-2",
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
  accepts?: string[];
  defaultImage?: string;
};

export const ProfileImageInput = ({
  className,
  name,
  label,
  required = false,
  accepts = ["image/*"],
  defaultImage = "",
}: ProfileImageInputProps) => {
  const formMethods = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const error = get(formMethods.formState.errors, name);

  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  const handleChange = (file?: File) => {
    if (!file) return;

    formMethods.setValue(name, file, { shouldValidate: true });

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

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
        className="w-full hidden"
        type="file"
        accept={accepts.join(",")}
        {...formMethods.register(name)}
        ref={inputRef}
        onChange={(e) => handleChange(e.target.files?.[0])}
      />

      <img
        onClick={() => inputRef.current?.click()}
        src={preview || defaultImage}
        alt={name}
        className={twMerge(
          "w-24 aspect-square object-cover object-top rounded-full border-2 border-primary-500 bg-gray-200 shadow-sm cursor-pointer",
          className?.image,
        )}
      />

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

type TextareaInputProps = {
  label?: string;
  required?: boolean;
  name: string;
  className?: { container?: string; label?: string; input?: string };
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextareaInput = ({
  label = "",
  required = false,
  name,
  className,
  ...rest
}: TextareaInputProps) => {
  const formMethods = useFormContext();
  const error = get(formMethods.formState.errors, name);

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

      <textarea
        id={name}
        required={required}
        className={twMerge(
          "focus:ring-primary-500 block w-full p-2 sm:text-sm border border-gray-300 rounded-md shadow-sm",
          className?.input,
        )}
        {...formMethods.register(name)}
        {...rest}
      />

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

type SelectOption = {
  label: string;
  value: string | number;
  [key: string]: any;
};

type SelectInputProps = Pick<FormInputProps, "name" | "label" | "required"> & {
  options?: SelectOption[];
  loadOptions?: (inputValue: string) => Promise<SelectOption[]>;

  isMulti?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isCreatable?: boolean;
  isAsync?: boolean;

  placeholder?: string;
  noOptionsMessage?: string;
  closeMenuOnSelect?: boolean;
  menuPortalTarget?: HTMLElement | null;

  className?: {
    container?: string;
    label?: string;
  };

  selectProps?: Partial<
    ReactSelectProps<SelectOption, boolean, GroupBase<SelectOption>>
  >;
};

export const SelectInput = ({
  name,
  label = "",
  required = false,

  options = [],
  loadOptions,

  isMulti = false,
  isSearchable = true,
  isClearable = true,
  isDisabled = false,
  isLoading = false,
  isCreatable = false,
  isAsync = false,

  placeholder = "Select...",
  noOptionsMessage = "No options found",
  closeMenuOnSelect,

  menuPortalTarget = typeof document !== "undefined" ? document.body : null,

  className,
  selectProps,
}: SelectInputProps) => {
  const formMethods = useFormContext();
  const error = get(formMethods.formState.errors, name);

  const SelectComponent: React.ComponentType<any> = (() => {
    if (isAsync && isCreatable) {
      return AsyncCreatableSelect;
    }

    if (isAsync) {
      return AsyncSelect;
    }

    if (isCreatable) {
      return CreatableSelect;
    }

    return Select;
  })();

  const customStyles: StylesConfig<SelectOption, boolean> = {
    control: (base, state) => ({
      ...base,
      minHeight: "42px",
      borderColor: error
        ? "#dc2626"
        : state.isFocused
          ? "#3b82f6"
          : base.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
      "&:hover": {
        borderColor: error ? "#dc2626" : "#3b82f6",
      },
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),

    multiValue: (base) => ({
      ...base,
      borderRadius: "6px",
    }),

    option: (base, state) => ({
      ...base,
      cursor: "pointer",
      backgroundColor: state.isFocused
        ? "#f3f4f6"
        : state.isSelected
          ? "#2563eb"
          : base.backgroundColor,
    }),
  };

  return (
    <div>
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

        <Controller
          control={formMethods.control}
          name={name}
          render={({ field }) => (
            <SelectComponent
              {...field}
              inputId={name}
              options={options}
              {...(isAsync && { loadOptions })}
              isMulti={isMulti}
              isSearchable={isSearchable}
              isClearable={isClearable}
              isDisabled={isDisabled}
              isLoading={isLoading}
              placeholder={placeholder}
              closeMenuOnSelect={closeMenuOnSelect ?? !isMulti}
              noOptionsMessage={() => noOptionsMessage}
              menuPortalTarget={menuPortalTarget}
              styles={customStyles}
              value={
                isMulti
                  ? options.filter((o) => field.value?.includes(o.value))
                  : (options.find((o) => o.value === field.value) ?? null)
              }
              onChange={(selected: any) => {
                if (isMulti) {
                  field.onChange(
                    selected?.map((item: SelectOption) => item.value) ?? [],
                  );
                } else {
                  field.onChange(selected?.value ?? null);
                }
              }}
              {...selectProps}
            />
          )}
        />

        <p
          className={twMerge(
            "mt-1 text-sm text-red-600 min-h-5 transition-opacity duration-200",
            error ? "opacity-100" : "opacity-0",
          )}
        >
          {error?.message as string}
        </p>
      </div>
    </div>
  );
};
