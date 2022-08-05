function handleQuery<T extends ParamProps>(url: URL, params: T) {
  if (Object.keys(params).length === 0) return url;
  const queryParams = Object.entries(params)
    .filter(([_, value]) => value)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value
          .filter(Boolean)
          .map((v) => `${key}=${v}`)
          .join("&");
      }

      return `${key}=${value}`;
    })
    .join("&");

  return [url, queryParams].join("?");
}

interface ParamProps {
  [key: string]: any;
}

export type URL = `/api/${string}`;
export type Query = [URL | undefined, ParamProps];

export default handleQuery;
