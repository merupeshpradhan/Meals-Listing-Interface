import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [meals, setMeals] = useState([]);
  const [status, setStatus] = useState(true);
  const [strIngredient1, setstrIngredient1] = useState([]);

  useEffect(() => {
    setStatus(true);

    async function loadMeals() {
      const url =
        "https://api.freeapi.app/api/v1/public/meals?page=1&limit=10&query=rice";
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        setMeals(data.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setStatus(false);
      }
    }
    loadMeals();
  }, []);
  return (
    <div className="container flex justify-center flex-col items-center gap-5">
      <h1 className="text-5xl">Hello Rupesh Pradhan</h1>

      {/* 1. Show loading status */}
      {status ? (
        <p>Loading tasty meals...</p>
      ) : (
        <div className="meal-grid">
          {/* 2. Map through the meals array */}
          {meals.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <div className="image-container">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  style={{ width: "200px" }}
                />
              </div>
              <div className="card-content">
                <h3>{meal.strMeal}</h3>
                <span className="badge">{meal.strCategory}</span>
                <p className="area">📍 {meal.strArea}</p>
                <button className="view-btn">View Recipe</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
