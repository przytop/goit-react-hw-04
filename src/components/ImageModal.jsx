import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import css from "./ImageModal.module.css";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: 0,
    margin: 0,
  },
};

Modal.setAppElement("#root");

export default function ImageModal({ isOpen, closeModal, image }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Image Modal"
    >
      {image && (
        <>
          <button className={css.button} onClick={closeModal}>
            <IoClose size={35} color="white" />
          </button>
          <img
            className={css.img}
            src={image.urls.regular}
            alt={image.alt_description}
          />
          <div className={css.info}>
            <p className={css.text}>
              {image.description || "No description available"}
            </p>
            <p className={css.text}>Author: {image.user.name || "Unknown"}</p>
            <p className={css.text}>Likes: {image.likes || "0"}</p>
          </div>
        </>
      )}
    </Modal>
  );
}
