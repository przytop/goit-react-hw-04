import css from "./ImageCard.module.css";

export default function ImageCard({ urls, description, onClick }) {
  return (
    <div className={css.card} onClick={onClick} style={{ cursor: "pointer" }}>
      <img className={css.img} src={urls.small} alt={description} />
    </div>
  );
}
