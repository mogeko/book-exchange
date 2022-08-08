import booksHandlers from "@/lib/mocks/api/books";
import usersHandlers from "@/lib/mocks/api/users";
import tagsHandlers from "@/lib/mocks/api/tags";
import messageHandlers from "@/lib/mocks/api/msg";
import randomHandlers from "@/lib/mocks/api/random";
import CommentsHandlers from "@/lib/mocks/api/comments";
import authHandlers from "./api/auth";

const handlers = [
  ...booksHandlers,
  ...usersHandlers,
  ...tagsHandlers,
  ...messageHandlers,
  ...randomHandlers,
  ...CommentsHandlers,
  ...authHandlers,
];

export default handlers;
