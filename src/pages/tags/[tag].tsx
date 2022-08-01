import TagsCotroller from "@/layouts/tagsCotroller";
import { DefaultLayout } from "@/layouts/layout";
import BookList from "@/components/books/bookList";
import Box from "@/layouts/boxes";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Tags: NextPage = () => {
  return (
    <DefaultLayout>
      <div className="flex w-full gap-6 flex-col c-lg:flex-row">
        <div className="flex basis-5/7 gap-14 max-w-[41rem] flex-col">
          <TagView />
        </div>
        <div className="flex basis-2/7">
          <TagsCotroller />
        </div>
      </div>
    </DefaultLayout>
  );
};

const TagView: React.FC = () => {
  const router = useRouter();
  const { tag } = router.query;

  return (
    <Box>
      <Box.Header>Tag: {tag}</Box.Header>
      {tag && <BookList limit={10} tags_include={tag} />}
    </Box>
  );
};

export default Tags;
