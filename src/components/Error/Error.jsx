import { useImagesContext } from 'components/ImagesContext/ImagesContext';
import css from './Error.module.css';

export const Error = () => {
  const { errorMsg } = useImagesContext();
  return (
    <>
      <div className={css.error}>{errorMsg}</div>
    </>
  );
};
