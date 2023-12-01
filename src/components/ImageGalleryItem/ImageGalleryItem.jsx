import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imgUrl, imgAlt, onClick }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={onClick}>
      <img className={css.ImageGalleryItemImage} src={imgUrl} alt={imgAlt} />
    </li>
  );
};

export default ImageGalleryItem;
