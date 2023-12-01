import React, { Component } from 'react';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    inputValue: '',
  };
  handleKeyUp = event => {
    if (event.code === 'Enter') {
      this.props.onSubmit(event.target.value);
    }
  };
  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };
  handleButtonClick = () => {
    this.props.onSubmit(this.state.inputValue);
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <button
          type="submit"
          className={css.SearchFormButton}
          onClick={this.handleButtonClick}
        >
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onKeyUp={this.handleKeyUp}
          onChange={this.handleInputChange}
        />
      </header>
    );
  }
}
