import { useEffect, useMemo } from "react";
import { useQueryParams } from "./useQueryParams";
import debounce from "lodash.debounce";

export const useDebouncedParam = (
  key: string = "search",
  delay: number = 500,
) => {
  const { setParams } = useQueryParams();

  const debounced = useMemo(() => {
    return debounce((value: string) => {
      setParams({ [key]: value });
    }, delay);
  }, [, key, delay, setParams]);

  useEffect(() => {
    return () => debounced.cancel();
  }, [debounced]);

  return debounced;
};
