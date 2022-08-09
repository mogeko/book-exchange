import useQuery from "@/lib/hooks/useQuery";

function useTags() {
  return useQuery<TagsType>("/api/tags");
}

export interface TagsType {
  [tagsGroup: string]: string[];
}

export default useTags;
