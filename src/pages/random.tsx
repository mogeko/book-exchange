import useQuery from "@/lib/hooks/useQuery";
import { useRouter } from "next/router";
import Head from "next/head";
import type { NextPage } from "next";
import { useSWRConfig } from "swr";
import { useEffect } from "react";

const RandomPage: NextPage = () => {
  const { data, error, isLoading } = useQuery<ResType>("/api/random", {});
  const { cache } = useSWRConfig();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      cache.delete("/api/random");
      router.push(data.url);
    }
  }, [router, data, cache]);

  if (error)
    return (
      <div>
        <Head>
          <title>Random Page</title>
        </Head>
        Oooops! Jumping failed!
      </div>
    );
  return (
    <div>
      <Head>
        <title>Random Page</title>
      </Head>
      We will jump to {isLoading ? <span>...</span> : <span>{data?.url}</span>}
    </div>
  );
};

interface ResType {
  id: `bk${number}`;
  url: `/books/bk${number}`;
}

export default RandomPage;
