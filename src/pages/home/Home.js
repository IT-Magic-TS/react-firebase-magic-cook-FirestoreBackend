import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Recipes from "../../components/Recipes";
import Spinner from "../../components/Spinner";
import { projectFirestore } from "../../firebase/config";
// import { useFetch } from "../../hooks/useFetch";

export default function Home() {
  // const { data, isPending, error } = useFetch("http://localhost:3000/recipes");

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore.collection("recipes").onSnapshot(
      snapshot => {
        if (snapshot.empty) {
          setError("No recipesto load");
          setIsPending(false);
        } else {
          let results = [];
          setIsPending(false);
          snapshot.docs.forEach(doc => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
        }
      },
      err => {
        setError(err.message);
        setIsPending(false);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="home">
      {isPending && <Spinner />}
      {error && <ErrorMessage error={error} />}
      {data && <Recipes data={data} />}
    </div>
  );
}
