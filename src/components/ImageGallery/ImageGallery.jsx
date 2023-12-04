import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { Modal } from '../Modal/Modal';
import { useImagesContext } from 'components/ImagesContext/ImagesContext';

export const ImageGallery = () => {
  const { images, modalVisible } = useImagesContext();

  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          imgUrl={image.webformatURL}
          imgAlt={image.tags}
          largeImgUrl={image.largeImageURL}
        />
      ))}
      {modalVisible && <Modal />}
    </ul>
  );
};
