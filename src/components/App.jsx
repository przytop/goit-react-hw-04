import { useReducer, useRef } from "react";
import "./App.css";
import SearchBar from "./SearchBar";
import fetchGalleryWithInput from "../gallery-api";
import ImageGallery from "./ImageGallery";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import LoadMore from "./LoadMore";
import ImageModal from "./ImageModal";

const reducer = (state, { payload }) => ({
  ...state,
  ...payload,
});

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    gallery: [],
    input: "",
    error: null,
    loading: false,
    modalIsOpen: false,
    currentImage: null,
    currentPage: 1,
    totalPages: 0,
  });

  const {
    gallery,
    input,
    error,
    loading,
    modalIsOpen,
    currentImage,
    currentPage,
    totalPages,
  } = state;

  const debounceRef = useRef(null);

  const handleSearch = (input) => {
    dispatch({
      payload: { gallery: [], error: null, loading: true, input },
    });

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await fetchGalleryWithInput(input, 1);
        dispatch({
          payload: {
            gallery: data.hits,
            totalPages: data.totalPages,
            currentPage: 1,
          },
        });
      } catch (error) {
        console.log(error);
        dispatch({ payload: { error: error.message } });
      } finally {
        dispatch({ payload: { loading: false } });
      }
    }, 500);
  };

  const handleLoadMore = () => {
    if (loading) return;

    const scrollDown = () => {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 1);
    };

    dispatch({ payload: { error: null, loading: true } });
    scrollDown();

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const nextPage = currentPage + 1;
        const data = await fetchGalleryWithInput(input, nextPage);
        dispatch({
          payload: {
            gallery: [...gallery, ...data.hits],
            currentPage: nextPage,
          },
        });
      } catch (error) {
        console.log(error);
        dispatch({ payload: { error: error.message } });
      } finally {
        dispatch({ payload: { loading: false } });
        scrollDown();
      }
    }, 500);
  };

  const openModal = (image) => {
    dispatch({ payload: { modalIsOpen: true, currentImage: image } });
  };

  const closeModal = () => {
    dispatch({ payload: { modalIsOpen: false, currentImage: null } });
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        gallery.length > 0 && (
          <ImageGallery openModal={openModal} gallery={gallery} />
        )
      )}
      {loading && <Loader />}
      {gallery.length > 0 && currentPage < totalPages && !error && (
        <LoadMore onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        image={currentImage}
      />
    </>
  );
}
