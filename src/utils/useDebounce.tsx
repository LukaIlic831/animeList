import React from "react";

export default function useDebounce(value: string, delay: number) {
  const [searchValue, setSearchValue] = React.useState<string>("");

  React.useEffect(() => {
    const timeout:NodeJS.Timeout = setTimeout(() => {
      setSearchValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return searchValue;
}
