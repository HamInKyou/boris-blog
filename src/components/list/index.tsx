import {useEffect} from 'react';
import Templates from '../common/Templates';
import styled from 'styled-components';
import Post from './Post';
import PostPlaceholder from './PostPlaceholder';
import {useInView} from "react-intersection-observer";
import {useGetPostsInfinitely} from "../hooks/useGetPostsInfinitely";

const List = () => {
  const { ref, inView } = useInView();
  const {posts, fetchNextPosts, isFetchingNextPosts} = useGetPostsInfinitely();

  useEffect(() => {
    if (inView) fetchNextPosts();
  }, [inView]);

  const getPostEls = () => {
    if(posts.length <= 0) return new Array(10).fill(null).map(_ => <PostPlaceholder/>);
    return posts.map((post) => <Post key={post.id} post={post}/>);
  }

  return (
    <Templates>
      <PostList>
        {getPostEls()}
        {isFetchingNextPosts ? new Array(10).fill(null).map(_ => <PostPlaceholder/>) :<div ref={ref} />}
      </PostList>
    </Templates>
  )
}

const PostList = styled.ul `
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export default List;
