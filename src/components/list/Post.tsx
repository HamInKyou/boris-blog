import { Link } from 'react-router-dom'
import { PostDto } from '../../dto/PostDto';
import styled from 'styled-components';
import {getParametersForUnsplash} from "../../utils/getParametersForUnsplash";
import {useEffect, useRef} from "react";

interface PostProps {
  post: PostDto;
}

const Post = ({ post }: PostProps) => {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry  => {
        if (entry.isIntersecting) {
          const imgElement = entry.target as HTMLImageElement;

          if(!imgElement.dataset.src) return;
          imgElement.src = imgElement.dataset.src;

          observer.unobserve(entry.target);
        }
      });
    }

    const options = {}
    const observer = new IntersectionObserver(callback, options);
    if(ref.current) observer.observe(ref.current);

    return (() => {
      observer.disconnect();
    })
  }, [])

  const substringWithZeroPad = (value: string | number, len: number) => {
    const str = '0000000000' + value.toString();
    return str.substring(str.length - len);
  }

  const getDateTime = () => {
    const createdTime = new Date(post.createdTime);
    return `${createdTime.getFullYear()}.${substringWithZeroPad(createdTime.getMonth() + 1, 2)}.${substringWithZeroPad(createdTime.getDate(), 2)}`
  }

  const removeSpecialCharacter = (str: string) => {
    const pattern = /[#_*~&;!\[\]`>\n=-]/g;
    return str.substring(0, 300).replace(pattern, '');
  }

  return (
    <PostItem>
      <Link to={`/detail/${post.id}`}>
        <ItemArea>
          <div>
            <ItemImg ref={ref} data-src={`${post.image}${getParametersForUnsplash({width: 256, height: 256, quality: 80, format: 'webp'})}`} alt={'img'}/>
          </div>
          <ContentArea>
            <h2>{post.title}</h2>
            <ItemContent>
              {removeSpecialCharacter(post.content)}
            </ItemContent>
            <p>{getDateTime()}</p>
          </ContentArea>
        </ItemArea>
      </Link>
    </PostItem>
  )
}

const PostItem = styled.li`
  width: 100%;

  a {
    text-decoration: none; 
    color: initial;
  }
`

const ItemArea = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  border: 1px solid #eee;
  padding: 12px;
`

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`

const ItemImg = styled.img`
  width: 128px;
  height: 128px;
  object-fit: cover;
  object-position: center;
`

const ItemContent = styled.p`
  overflow: hidden;
  width: 590px;
  white-space: normal;
  display:-webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`

export default Post;