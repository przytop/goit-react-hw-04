import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const input = form.elements.input.value;

    if (input.trim() === "") {
      toast.error("Please enter text to search image!");
      return;
    }
    onSearch(input);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.search} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="input"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">
          <FaSearch color="white" size={25} />
        </button>
      </form>
      <Toaster position="bottom-center" />
    </header>
  );
}
