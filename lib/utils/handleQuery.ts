import { isEmpty, reject, either, isNil, toPairs } from "ramda";
import { chain, ifElse, is, pipe, map, join } from "ramda";

function handleQuery<T extends ParamProps>(url: URL, params: T) {
  if (isEmpty(params)) return url;
  const queryParams = pipe(
    reject(either(isNil, isEmpty)),
    toPairs,
    chain(([key, value]) =>
      ifElse(
        is(Array),
        pipe(
          reject<any>(isNil),
          map((v) => [key, v])
        ),
        (v) => [[key, v]]
      )(value)
    ),
    map(join("=")),
    join("&")
  );

  return join("?")([url, queryParams(params)]);
}

interface ParamProps {
  [key: string]: any;
}

export type URL = `/api/${string}`;
export type Query = [URL | undefined, ParamProps];

export default handleQuery;
