import { getImages } from 'components/Api/PixabayApi';
import { createContext, useContext, useEffect, useState } from 'react';

export const ImagesContext = createContext();

export const useImagesContext = () => useContext(ImagesContext);

export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [moreBtn, setMoreBtn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [renderedImages, setRenderedImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [tags, setTags] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleSearch = userQuery => {
    if (query === '') {
      alert('Input cannot be empty!');
      return;
    }
    setQuery(userQuery);
    setPage(1);
    setMoreBtn(true);
    fetchApi(query);
  };

  const fetchApi = async query => {
    try {
      setIsLoading(true);
      setImages([]);
      setErrorMsg('');
      const fetchedImages = await getImages(query, 1);
      if (fetchedImages.length === 0) {
        alert(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        setMoreBtn(false);
      }
      setImages(fetchedImages);
    } catch (err) {
      setErrorMsg(err.message);
      console.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const ifLoadMore = () => {
    setPage(page => {
      const newPage = page + 1;
      fetchMore(newPage);
      return newPage;
    });
  };
  const fetchMore = async newPage => {
    const fetchedImages = await getImages(query, newPage);
    if (fetchedImages === undefined) {
      setMoreBtn(false);
      return;
    }
    setImages([...images, ...fetchedImages]);
  };

  const openModal = (largeImageUrl, tags) => {
    setModalVisible(true);
    setSelectedImage(largeImageUrl);
    setTags(tags);
  };

  const handleKeyUp = event => {
    if (event.code === 'Enter') {
      handleSearch(event.target.value);
    }
  };

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleButtonClick = () => {
    handleSearch(query);
  };

  useEffect(() => {
    window.addEventListener('click', e => {
      if (e.target.nodeName !== 'IMG') {
        setModalVisible(false);
        setSelectedImage(null);
      }
    });
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape' || e.key === 'Escape') {
        setModalVisible(false);
        setSelectedImage(null);
      }
    });
    return () => {
      window.removeEventListener('click', e => {
        if (e.target.nodeName !== 'IMG') {
          setModalVisible(false);
          setSelectedImage(null);
        }
      });
      window.removeEventListener('keydown', e => {
        if (e.code === 'Escape' || e.key === 'Escape') {
          setModalVisible(false);
          setSelectedImage(null);
        }
      });
    };
  }, []);

  return (
    <ImagesContext.Provider
      value={{
        images,
        setImages,
        isLoading,
        setIsLoading,
        errorMsg,
        setErrorMsg,
        query,
        setQuery,
        page,
        setPage,
        moreBtn,
        setMoreBtn,
        modalVisible,
        setModalVisible,
        renderedImages,
        setRenderedImages,
        selectedImage,
        setSelectedImage,
        tags,
        setTags,
        inputValue,
        setInputValue,
        handleSearch,
        ifLoadMore,
        openModal,
        handleKeyUp,
        handleInputChange,
        handleButtonClick,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
};
