import { useState } from "react";
import "./App.css";
import SearchBar from "./SearchBar";
import fetchGalleryWithInput from "../gallery-api";
import ImageGallery from "./ImageGallery";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import LoadMore from "./LoadMore";
import ImageModal from "./ImageModal";

export default function App() {
  const [gallery, setGallery] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async (input) => {
    try {
      setError(false);
      setLoading(true);
      setInput(input);
      setGallery([]);

      await new Promise((resolve) => setTimeout(resolve, 300));

      const data = await fetchGalleryWithInput(input, 1);
      setGallery(data.hits);
      setTotalPages(data.totalPages);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const scrollDown = () => {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 1);
    };
    try {
      setLoading(true);
      scrollDown();

      const nextPage = currentPage + 1;
      await new Promise((resolve) => setTimeout(resolve, 300));
      const data = await fetchGalleryWithInput(input, nextPage);
      setGallery((prevGallery) => [...prevGallery, ...data.hits]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
      scrollDown();
    }
  };

  const openModal = (image) => {
    setCurrentImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentImage(null);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error ? (
        <ErrorMessage />
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
