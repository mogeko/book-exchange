import TagsCotroller from "@/layouts/tagsCotroller";
import BookGrid from "@/components/books/bookGrid";
import Box from "@/layouts/boxes";
import { DefaultLayout } from "@/layouts/layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <div className="flex w-full gap-6 flex-col c-lg:flex-row">
        <div className="flex basis-5/7 gap-14 max-w-[41rem] flex-col">
          <Popular />
          <UnpopularMasterpiece />
        </div>
        <div className="flex basis-2/7">
          <TagsCotroller />
        </div>
      </div>
    </DefaultLayout>
  );
};

export const Popular: React.FC = () => {
  return (
    <Box>
      <Box.Header>Recently Popular</Box.Header>
      <BookGrid maxPages={5} limit={10} />
    </Box>
  );
};

export const UnpopularMasterpiece: React.FC = () => {
  return (
    <Box>
      <Box.Header>Unpopular but Highly Rated</Box.Header>
      <BookGrid limit={5} />
    </Box>
  );
};

export default Home;
