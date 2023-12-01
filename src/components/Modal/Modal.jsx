import css from './Modal.module.css';

const Modal = ({ bigImgUrl, imgAlt }) => {
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={bigImgUrl} alt={imgAlt} />
      </div>
    </div>
  );
};

export default Modal;
