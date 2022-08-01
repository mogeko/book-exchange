import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Alert from "@/components/base/alert";
import useQuery from "@/lib/hooks/useQuery";
import { useState } from "react";

function withReadMore(Component: React.FC<ComponentProps>, szie: Size = "sm") {
  const WripComponent: React.FC<WripComponentProps> = ({ url, foldedData }) => {
    const [isOpen, setIsOpen] = useState(false);

    const ReadMore = () => {
      const { data, isError, isLoading } = useQuery<QueryRes>(url);

      if (isError) return <Alert.Error message="Network Error!" />;
      return isLoading ? (
        <div className="flex flex-col items-start">
          <Component>{foldedData?.text}</Component>
          <button className={`btn btn-${szie} btn-link loading`}>
            Loading...
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-start">
          <Component>{data?.text}</Component>
          <button onClick={handleSwitch} className={`btn btn-${szie} btn-link`}>
            <FaAngleUp className="w-5 h-5" /> Read less
          </button>
        </div>
      );
    };
    const ReadLess = () => (
      <div className="flex flex-col items-start">
        <Component>{foldedData?.text}</Component>
        {foldedData?.is_folded && (
          <button onClick={handleSwitch} className={`btn btn-${szie} btn-link`}>
            <FaAngleDown className="w-5 h-5" /> Read more
          </button>
        )}
      </div>
    );
    const handleSwitch = () => setIsOpen(!isOpen);

    return isOpen ? <ReadMore /> : <ReadLess />;
  };

  return WripComponent;
}

type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface WripComponentProps {
  foldedData?: {
    text: string;
    is_folded: boolean;
  };
  url: `/api/${string}`;
}

interface ComponentProps {
  children: React.ReactNode;
}

interface QueryRes {
  [key: `${string}id`]: string;
  text: string;
}

export default withReadMore;
