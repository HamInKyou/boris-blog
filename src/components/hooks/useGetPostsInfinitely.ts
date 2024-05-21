import {useCallback, useMemo} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getPostRs} from "../../rs/getPostRs";
import {PostDto} from "../../dto/PostDto";

export const useGetPostsInfinitely = () => {
  const fetchPosts = useCallback( async ({ pageParam }:{pageParam:number}) => {
    const res = await fetch('http://localhost:3001/posts?_page=' + pageParam);
    return res.json()
  }, []);

  const {data, fetchNextPage: fetchNextPosts, isFetchingNextPage: isFetchingNextPosts} = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage: getPostRs, allPages) => {
      return lastPage.next;
    },
  })

  const posts = useMemo(() => {
    if(!data) return [];
    return data.pages.reduce((acc, page) => {
      return [...acc, ...page.data]
    }, []) as PostDto[]
  }, [data])

  return {posts, fetchNextPosts ,isFetchingNextPosts}
}