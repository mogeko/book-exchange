import {
  getReferral,
  type Options,
  type Payload,
} from "@/actions/made-fot-you";
import useSWRMutation from "swr/mutation";

import { useBooksContext } from "@/app/(authorized)/made4u/_components/books-context";

export function useReferral(payload: Payload, options: Options) {
  const { books } = useBooksContext();
  return useSWRMutation(payload, (x) => getReferral(x, options), {
    optimisticData: books,
  });
}
