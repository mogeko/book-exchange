function handleQuery<T extends ParamProps>(url: `/${string}`, params: T) {
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

type Primitive = string | number | boolean | null | undefined;

export interface ParamProps {
  [key: string]: Primitive | Primitive[];
}

export default handleQuery;
