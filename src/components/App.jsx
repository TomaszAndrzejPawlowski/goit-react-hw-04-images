import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { Button } from './Button/Button';
import css from './App.module.css';
import { getImages } from './Api/PixabayApi';
import Error from './Error/Error';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    errorMsg: '',
    query: '',
    page: 1,
    moreBtn: false,
  };
  handleSearch = query => {
    if (query === '') {
      alert('Input cannot be empty!');
      return;
    }
    this.setState({ query: query, page: 1, moreBtn: true }, () => {
      this.fetchApi(this.state.query);
    });
    console.log(this.state.query);
  };
  fetchApi = async query => {
    try {
      this.setState({
        isLoading: true,
        images: [],
        errorMsg: '',
      });
      const fetchedImages = await getImages(query, 1);
      if (fetchedImages.length === 0) {
        alert(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        this.setState({ moreBtn: false });
      }
      this.setState({ images: fetchedImages });
    } catch (err) {
      this.setState({ errorMsg: err.message });
      console.error(err.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  ifLoadMore = async () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };
  fetchMore = async () => {
    const fetchedImages = await getImages(this.state.query, this.state.page);
    if (fetchedImages === undefined) {
      this.setState({ moreBtn: false });
      return;
    }
    this.setState(prevState => {
      return { images: prevState.images.concat(fetchedImages) };
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      this.fetchApi(this.state.query);
    }
    if (this.state.page !== prevState.page) {
      this.fetchMore();
    }
  }

  render() {
    const { images, errorMsg, isLoading, moreBtn } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearch} />
        {isLoading && <Loader />}
        {errorMsg && <Error errorMsg={errorMsg} />}
        {!errorMsg && images.length !== 0 && (
          <ImageGallery fetchedImages={images} />
        )}
        {images.length !== 0 && moreBtn && (
          <Button handleClick={this.ifLoadMore} />
        )}
      </div>
    );
  }
}
