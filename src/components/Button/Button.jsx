import { useImagesContext } from 'components/ImagesContext/ImagesContext';
import css from './Button.module.css';

export const Button = () => {
  const { ifLoadMore } = useImagesContext();
  return (
    <button className={css.Button} type="button" onClick={ifLoadMore}>
      Load more
    </button>
  );
};
