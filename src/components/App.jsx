import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import css from './App.module.css';
import { Error } from './Error/Error';
import { useImagesContext } from './ImagesContext/ImagesContext';

export const App = () => {
  const { images, isLoading, errorMsg, moreBtn } = useImagesContext();
  return (
    <div className={css.App}>
      <Searchbar />
      {isLoading && <Loader />}
      {errorMsg && <Error />}
      {!errorMsg && images.length !== 0 && <ImageGallery />}
      {images.length !== 0 && moreBtn && <Button />}
    </div>
  );
};
