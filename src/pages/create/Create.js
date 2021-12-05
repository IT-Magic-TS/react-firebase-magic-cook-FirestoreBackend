import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";

import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log(title, method, cookingTime, ingredients);
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes"
    };
    try {
      await projectFirestore.collection("recipes").add(doc);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = e => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients(prev => [...prev, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  return (
    <div className="create">
      <h2 className="w3-center w3-margin">Add a New recipe</h2>
      <form className="w3-container" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          className="w3-input"
          name="title"
          value={title}
          required
          onChange={e => setTitle(e.target.value)}
        />

        <label htmlFor="ingredients">Ingredients:</label>
        <div className="ingredient">
          <input
            type="text"
            className="w3-input"
            name="ingredients"
            value={newIngredient}
            onChange={e => setNewIngredient(e.target.value)}
            ref={ingredientInput}
          />
          <button onClick={handleAdd} className="w3-btn w3-green w3-round">
            Add
          </button>
        </div>
        <p>
          Current Ingredients:{" "}
          {ingredients.map(ing => (
            <em key={ing}>
              {ing}
              {", "}
            </em>
          ))}
        </p>

        <label htmlFor="cookingTime">Cooking Time:</label>
        <input
          type="number"
          className="w3-input"
          name="cookingTime"
          value={cookingTime}
          required
          onChange={e => setCookingTime(e.target.value)}
        />
        <label htmlFor="method">Recipe method:</label>
        <textarea
          className="w3-input"
          name="method"
          value={method}
          required
          onChange={e => setMethod(e.target.value)}
        />
        <p className="w3-center w3-margin">
          <button type="submit" className="w3-btn w3-indigo w3-ripple">
            Submit
          </button>
        </p>
      </form>
    </div>
  );
}
