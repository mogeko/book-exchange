import useSWRMutation from "swr/mutation";

import { useBooksContext } from "@/app/(core)/(bookshelf)/made4u/_components/books-context";
import {
  getReferral,
  type Options,
  type Payload,
} from "@/app/(core)/(bookshelf)/made4u/made4u-actions";

export function useReferral(payload: Payload, options: Options) {
  const { books } = useBooksContext();
  return useSWRMutation(payload, (x) => getReferral(x, options), {
    optimisticData: books,
  });
}
