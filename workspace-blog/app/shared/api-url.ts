type SearchParams = Record<string, string | number | boolean | undefined>;

export function apiUrl(path: string, searchParams?: SearchParams): string {
  const _searchParams: Record<string, string> = {};

  Object.entries(searchParams || {}).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }
    if (typeof value === "string") {
      _searchParams[key] = value;
    } else {
      _searchParams[key] = String(value);
    }
  });

  const p = Object.keys(_searchParams).length
    ? `?${new URLSearchParams(_searchParams).toString()}`
    : "";

  return `http://localhost:7000${path}${p}`;
}
