import type { CommentsType } from "@/lib/hooks/useComments";
import type { EditorFormInput } from "@/components/editor/editor";
import type { JSONContent } from "@tiptap/react";
import { oneOf, randomNum as rNum, randomDateRecent } from "@/lib/mocks/utils";
import { faker } from "@faker-js/faker";
import { rest } from "msw";

const CommentsHandlers = [
  rest.get("/api/comments", (req, res, ctx) => {
    const limit = req.url.searchParams.get("limit");
    const uid = req.url.searchParams.get("uid");
    const bkid = req.url.searchParams.get("bkid");
    const cmid = `cm${rNum({ min: 1000000000, max: 100000000000 })}`;
    const subCommentLength = rNum({ min: 0, max: 20 });
    const genComment = (heading: string, text: string): JSONContent => ({
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: heading }],
        },
        { type: "paragraph", content: [{ type: "text", text: text }] },
      ],
    });
    const genSubComment = (text: string): JSONContent => ({
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: text }] }],
    });

    return res(
      ctx.json<CommentsType>(
        Array.from({ length: Number(limit ?? 20) }, () => ({
          id: cmid as `cm${number}`,
          author_meta: {
            id: (uid ?? `${rNum({ min: 10000, max: 100000 })}`) as `${number}`,
            username: faker.internet.userName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
          },
          meta: {
            short_review: faker.lorem.lines(1),
            rates: rNum(100),
            likes: rNum(1000),
            dislike: rNum(1000),
            created_at: randomDateRecent(),
            location: faker.address.country(),
          },
          responds: Array.from({ length: subCommentLength }, (_, i) => ({
            id: `${cmid}-${i + 1}` as `cm${number}-${number}`,
            author_meta: {
              id: `${rNum({ min: 10000, max: 100000 })}`,
              username: faker.internet.userName(),
              email: faker.internet.email(),
              avatar: faker.image.avatar(),
            },
            meta: {
              likes: rNum(1000),
              dislike: rNum(1000),
              created_at: randomDateRecent(),
              location: faker.address.country(),
            },
            belongs_to: oneOf([
              `${cmid}`,
              `${cmid}-${rNum({ min: 0, max: subCommentLength })}`,
            ]) as `cm${number}-${number}`,
            msg: genSubComment(faker.lorem.paragraphs(1)),
            is_folded: faker.datatype.boolean(),
          })),
          belongs_to: (bkid ??
            `bk${rNum({ min: 10000, max: 100000 })}`) as `bk${number}`,
          msg: genComment(faker.lorem.lines(1), faker.lorem.paragraphs(3)),
          is_folded: faker.datatype.boolean(),
        }))
      )
    );
  }),
  rest.post("/api/comments/submit", async (req, res, ctx) => {
    const { content } = await req.json<EditorFormInput>();

    return res(ctx.json({}));
  }),
];

export default CommentsHandlers;
