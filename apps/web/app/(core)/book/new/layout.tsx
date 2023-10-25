import { BackButton } from "@/app/(core)/book/new/_components/go-back";

const CreateNewBookLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="flex flex-col items-stretch justify-start">
      <BackButton className="mb-8 flex flex-row items-center justify-start" />
      <div className="ml-8 flex-1">{children}</div>
    </div>
  );
};

export default CreateNewBookLayout;
