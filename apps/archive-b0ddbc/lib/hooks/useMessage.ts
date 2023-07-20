import useQuery, { type Opts } from "@/lib/hooks/useQuery";

function useMessage(opts?: OptsType) {
  const requiredOpts = {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  };

  return useQuery<MessageType>("/api/msg", { ...opts, ...requiredOpts });
}

export type MessageType = Partial<{
  id: `msg${number}`;
  key: `${string}_${string}`;
}>[];

type OptsType = Omit<
  Opts<MessageType>,
  "revalidateIfStale" | "revalidateOnFocus" | "revalidateOnReconnect"
>;

export default useMessage;
