import { SelectOption } from "@components/Forms";

type ConvertOptionsConfig<T> = {
  label: keyof T;
  value: keyof T;
  others?: (keyof T)[];
};

export const convertToDropdownOptions = <T extends Record<string, any>>(
  options: T[],
  { label, value, others = [] }: ConvertOptionsConfig<T>,
): SelectOption[] => {
  if (!options) return [];
  return options.map((item) => {
    const extraFields = others.reduce(
      (acc, key) => {
        acc[String(key)] = item[key];
        return acc;
      },
      {} as Record<string, any>,
    );

    return {
      label: String(item[label]),
      value: item[value],
      ...extraFields,
    };
  });
};
