import { useEffect, useState } from "react";

import "./Recipe.css";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import { useTheme } from "../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot(
        doc => {
          if (doc.exists === true) {
            setIsPending(false);
            setData(doc.data());
          } else {
            setIsPending(false);
            setError("Could not find that recipe");
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

  const handleClick = () => {
    projectFirestore.collection("recipes").doc(id).update({
      title: "Nekaj Kranjska z Zeljem"
    });
  };

  return (
    <div
      className="w3-content recipe"
      style={{ color: mode === "dark" ? "white" : "black" }}
    >
      {isPending && <Spinner />}
      {error && <ErrorMessage error={error} />}
      {data && (
        <>
          <h2 className="w3-center">{data.title}</h2>
          <p className="w3-center">Takes {data.cookingTime} to cook.</p>
          <ul>
            {data.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="method">{data.method}</p>
          <div className="w3-center">
            <button onClick={handleClick} className="w3-btn w3-green">
              Update
            </button>
          </div>
        </>
      )}
    </div>
  );
}
