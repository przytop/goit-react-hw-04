import css from "./LoadMore.module.css";

export default function LoadMore({ onClick }) {
  return (
    <div className={css.load}>
      <button onClick={onClick} className={css.button}>
        Load more
      </button>
    </div>
  );
}
