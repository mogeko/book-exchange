import booksHandlers from "@/lib/mocks/api/books";
import usersHandlers from "@/lib/mocks/api/users";
import tagsHandlers from "@/lib/mocks/api/tags";
import messageHandlers from "@/lib/mocks/api/msg";
import randomHandlers from "@/lib/mocks/api/random";

const handlers = [
  ...booksHandlers,
  ...usersHandlers,
  ...tagsHandlers,
  ...messageHandlers,
  ...randomHandlers,
];

export default handlers;
