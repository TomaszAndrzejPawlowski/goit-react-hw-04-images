import css from './Searchbar.module.css';
import React from 'react';
import { useImagesContext } from 'components/ImagesContext/ImagesContext';

export const Searchbar = () => {
  const { handleKeyUp, handleInputChange, handleButtonClick } =
    useImagesContext();
  return (
    <header className={css.Searchbar}>
      <button
        type="submit"
        className={css.SearchFormButton}
        onClick={handleButtonClick}
      >
        <span className={css.SearchFormButtonLabel}>Search</span>
      </button>
      <input
        className={css.SearchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onKeyUp={handleKeyUp}
        onChange={handleInputChange}
      />
    </header>
  );
};
