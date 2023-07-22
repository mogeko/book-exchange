import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HomePage: React.FC = () => {
  return (
    <Tabs defaultValue="for-you" className="h-full space-y-6">
      <TabsList>
        <TabsTrigger value="for-you" className="relative">
          For you
        </TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>
      <TabsContent className="border-none p-0 outline-none" value="for-you">
        <ForYou />
      </TabsContent>
      <TabsContent
        className="h-full flex-col border-none p-0 data-[state=active]:flex"
        value="following"
      >
        <Following />
      </TabsContent>
    </Tabs>
  );
};

const ForYou: React.FC = () => {
  return <div>For you</div>;
};

const Following: React.FC = () => {
  return <div>Following</div>;
};

export default HomePage;
