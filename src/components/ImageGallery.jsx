import ImageCard from "./ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ gallery, openModal }) {
  return (
    <>
      <ul className={css.gallery}>
        {gallery.map((image) => (
          <li className={css.element} key={image.id} id="image">
            <ImageCard
              urls={image.urls}
              description={image.alt_description}
              onClick={() => openModal(image)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
