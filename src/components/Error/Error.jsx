import { Component } from 'react';
import css from './Error.module.css';

export default class Error extends Component {
  render() {
    return (
      <>
        <div className={css.error}>{this.props.errorMsg}</div>
      </>
    );
  }
}
