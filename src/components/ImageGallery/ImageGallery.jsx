import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Modal from '../Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    modalVisible: false,
    renderedImages: {},
    selectedImage: null,
    tags: null,
  };

  openModal = (largeImageUrl, tags) => {
    this.setState({
      modalVisible: true,
      selectedImage: largeImageUrl,
      alt: tags,
    });
  };

  closeModal = () => {
    this.setState({ modalVisible: false, selectedImage: {} });
  };

  closeModalOnClick = e => {
    if (e.target.nodeName !== 'IMG') {
      this.closeModal();
    }
  };

  closeModalOnKey = e => {
    if (e.code === 'Escape' || e.key === 'Escape') {
      this.closeModal();
    }
  };

  componentDidMount = () => {
    window.addEventListener('click', this.closeModalOnClick);
    window.addEventListener('keydown', this.closeModalOnKey);
  };
  componentWillUnmount = () => {
    window.removeEventListener('click', this.closeModalOnClick);
    window.removeEventListener('keydown', this.closeModalOnKey);
  };

  render() {
    const { modalVisible, selectedImage, tags } = this.state;
    return (
      <ul className={css.ImageGallery}>
        {this.props.fetchedImages.map(fetchedImage => (
          <ImageGalleryItem
            key={fetchedImage.id}
            imgUrl={fetchedImage.webformatURL}
            imgAlt={fetchedImage.tags}
            onClick={() =>
              this.openModal(fetchedImage.largeImageURL, fetchedImage.tags)
            }
          />
        ))}
        {modalVisible && <Modal bigImgUrl={selectedImage} imgAlt={tags} />}
      </ul>
    );
  }
}
