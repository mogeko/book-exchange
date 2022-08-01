import useMessage, { type MessageType } from "@/lib/hooks/useMessage";
import { createContext } from "react";

export const MessageContext = createContext<MessageType>([]);

const MessageProvider: React.FC<MsgProviderProps> = (props) => {
  const { data } = useMessage();

  return <MessageContext.Provider value={data ?? []} {...props} />;
};

type MsgProviderProps = Omit<React.ProviderProps<{}>, "value">;

export default MessageProvider;
