import handleQuery from "@/lib/utils/handleQuery";
import useSWR, { type SWRConfiguration } from "swr";
import useSWRInfinite, { type SWRInfiniteConfiguration } from "swr/infinite";

function useQuery<T, E = any>(
  url: `/api/${string}` | null,
  param = {},
  opts: SWRConfiguration<T, E> = {}
) {
  const query = url ? handleQuery(url, param) : null;
  const { data, ...otherRes } = useSWR<T, E>(query, opts);

  return {
    data: data,
    isLoading: !data,
    ...otherRes,
  };
}

export function useQueryInfinite<T, E = any>(
  getKey: (index: number, previous: T | null) => string | null,
  opts: SWRInfiniteConfiguration<T, E> = {}
) {
  const { data, ...otherRes } = useSWRInfinite<T, E>(getKey, opts);

  return {
    data: data,
    isLoading: !data,
    ...otherRes,
  };
}

export type Opts<T = any, E = any> = SWRConfiguration<T, E>;
export type OptsInfinite<T = any, E = any> = SWRInfiniteConfiguration<T, E>;

export default useQuery;
