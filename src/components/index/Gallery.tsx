import styled from 'styled-components';
import {Suspense, useEffect, useState} from "react";
import createLazyComponent from "../../utils/createLazyComponent";
const ImageModal = createLazyComponent(() => import('./ImageModal'));

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    ImageModal.preload();
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = './0.jpg';
  }, []);

  return (
    <div>
      <AlbumButton onClick={() => setIsModalOpen(true)}>My album</AlbumButton>
      <Suspense fallback={null}>
      { isModalOpen && <ImageModal onClose={() => setIsModalOpen(false)} />}
      </Suspense>
    </div>
  )
}

const AlbumButton = styled.button`
  width: 200px;
  background-color: #4CAF50;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3C9A4B;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
  }
`;

export default Gallery;
