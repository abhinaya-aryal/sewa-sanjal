import { useSearchParams } from "react-router-dom";

type Primitive = string | number | boolean | undefined | null;
type Params = Record<string, Primitive>;

export function useQueryParams<T extends Params>() {
  const [searchParams, setSearchParams] = useSearchParams();

  const get = (): Partial<T> => {
    const obj: Record<string, any> = {};

    for (const [key, value] of searchParams.entries()) {
      if (value === "true") obj[key] = true;
      else if (value === "false") obj[key] = false;
      else if (!isNaN(Number(value))) obj[key] = Number(value);
      else obj[key] = value;
    }

    return obj as Partial<T>;
  };

  const set = (params: Partial<T>, options?: { replace?: boolean }) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    setSearchParams(newParams, options);
  };

  const clear = () => {
    setSearchParams({});
  };

  return {
    params: get(),
    setParams: set,
    clearParams: clear,
  };
}
