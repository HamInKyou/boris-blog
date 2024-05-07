import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Templates from '../common/Templates';
import { PostDto } from '../../dto/PostDto';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import {getParametersForUnsplash} from "../../utils/getParametersForUnsplash";

const Detail = () => {
  const { id } = useParams()
  const [post, setPost] = useState<PostDto | null>(null);

  const fetchPost = useCallback(async (id?: string) => {
    if(!id) return;
    const res = await fetch('http://localhost:3001/posts/' + id);
    const data = await res.json() as PostDto;
    setPost(data);
  }, [])

  useEffect(() => {
    fetchPost(id)
  }, [fetchPost, id])

  return (
    <Templates>
      <PostTitle>
        {post?.title}
      </PostTitle>

        {/* 
        * 과제 4.
        * [코어 웹 바이탈 개선 - CLS(Cumulative Layout Shift)]
        * 이미지 비율과 크기를 보정해 Layout Shift 현상을 개선해주세요.
        */}
      <picture>
        <source srcSet={`${post?.image}${getParametersForUnsplash({width: 512, height: 512, quality: 80, format: 'webp'})}`} type='image/webp' />
        <source srcSet={`${post?.image}${getParametersForUnsplash({width: 512, height: 512, quality: 80, format: 'jpg'})}`} type='image/jpeg' />
        <PostImage src={post?.image} alt='thumnail'/>
      </picture>


      <PostContent>
        { post ? <ReactMarkdown children={post.content} /> : <>loading...</> }
      </PostContent>
    </Templates>
  )
}

const PostTitle = styled.h2`
  font-weight: 500;
  font-size: 2.5em;
  margin-top: 24px;
`

const PostImage = styled.img`
  width: 256px;
  height: 256px;
  margin-top: 12px;
`

const PostContent = styled.article`
  margin-top: 12px;
  line-height: 2;
`

export default Detail
