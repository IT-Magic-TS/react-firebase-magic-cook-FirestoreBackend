import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar() {
  const [term, setTerm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    navigate(`/search?q=${term}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <i className=" w3-xxlarge fa fa-search" aria-hidden="true"></i>
      <input
        type="text"
        className="w3-input"
        name="search"
        value={term}
        onChange={e => setTerm(e.target.value)}
        required
      />
    </form>
  );
}
