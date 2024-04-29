import styled from "styled-components";

const Profile = () => {

  return (
    <ProfileArea>
      <picture>
        <source srcSet={'/boris01.webp'} type={'image/webp'}/>
        <ProfileImg src={'/boris01.jpg'}/>
      </picture>
      {/* 
        * TODO 6.
        * [로딩 최적화 - 폰트 최적화] 
        * 사이즈가 큰 일반적인 폰트 포멧을 사용하고 있습니다.
        * 사용하는 글자가 한정적입니다.
        */}
      <ProfileTitle>Hi! I'm Boris the Cat😻</ProfileTitle>
    </ProfileArea>
  )
}

const ProfileTitle = styled.h3`
    font-family: 'PermanentMarker';
`

const ProfileArea = styled.div`
    display: flex;
    flex-direction: column;
  align-items: center;
  gap: 12px;
`

const ProfileImg = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  box-shadow: 2px 1px 5px #00000090;
`

export default Profile;