import "./Search.css";
import { useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";
import Recipes from "../../components/Recipes";

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const url = `http://localhost:3000/recipes?q=${query}`;

  const { data, isPending, error } = useFetch(url);

  return (
    <div className="w3-content search">
      <h2 className="w3-center w3-margin">Recipes including {query}</h2>
      {isPending && <Spinner />}
      {error && <ErrorMessage error={error} />}
      {data && <Recipes data={data} />}
    </div>
  );
}
