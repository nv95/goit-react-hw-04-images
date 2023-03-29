import { useEffect } from 'react';
import { Overlay, ModalDiv } from './Modal.styled';

export const Modal = ({ openedImage, onClick }) => {
  useEffect(() => {
    window.addEventListener('keydown', onClick);
    return () => {
      window.removeEventListener('keydown', onClick);
    };
  }, [onClick]);

  const { src, tags } = openedImage;

  return (
    <Overlay onClick={onClick}>
      <ModalDiv>
        <img src={src} alt={tags} />
      </ModalDiv>
    </Overlay>
  );
};
