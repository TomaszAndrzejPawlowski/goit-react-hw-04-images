import { useImagesContext } from 'components/ImagesContext/ImagesContext';
import css from './Modal.module.css';

export const Modal = () => {
  const { selectedImage, tags } = useImagesContext();
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={selectedImage} alt={tags} />
      </div>
    </div>
  );
};
