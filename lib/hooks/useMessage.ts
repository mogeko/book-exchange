import useQuery, { type Opts } from "./useQuery";

function useMessage(opts?: Opts<MessageType>) {
  return useQuery<MessageType>("/api/msg", {}, opts);
}

export type MessageType = Partial<{
  id: `msg${number}`;
  key: `${string}_${string}`;
}>[];

export default useMessage;
