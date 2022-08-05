import handleQuery, { type Query, type URL } from "@/lib/utils/handleQuery";
import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";
import useSWRInfinite, { type SWRInfiniteConfiguration } from "swr/infinite";

function useQuery<T, E = any>(query?: Query): Res<T, E>;
function useQuery<T, E = any>(query?: URL): Res<T, E>;
function useQuery<T, E = any>(query?: Query, opts?: Opts<T, E>): Res<T, E>;
function useQuery<T, E = any>(query?: URL, opts?: Opts<T, E>): Res<T, E>;
function useQuery<T, E = any>(query?: Query | URL, opts?: Opts<T, E>) {
  const [url, params] = Array.isArray(query) ? query : [query, {}];
  const key = url ? handleQuery(url, params) : undefined;
  const { data, ...otherRes } = useSWR<T, E>(key, opts);

  return {
    data: data,
    isLoading: !data,
    ...otherRes,
  };
}

export function useQueryInfinite<T, E = any>(
  getKey: (index: number, previous: T | null) => string | null,
  opts?: SWRInfiniteConfiguration<T, E>
) {
  const { data, ...otherRes } = useSWRInfinite<T, E>(getKey, opts);

  return {
    data: data,
    isLoading: !data,
    ...otherRes,
  };
}

type Res<T, E> = { isLoading: boolean } & SWRResponse<T, E>;
export type Opts<T = any, E = any> = SWRConfiguration<T, E>;
export type OptsInfinite<T = any, E = any> = SWRInfiniteConfiguration<T, E>;

export default useQuery;
