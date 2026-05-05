import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import RecipeModal from "./RecipeModal.jsx";
import "./App.css";

function App() {
  const [meals, setMeals] = useState([]);
  const [status, setStatus] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    setStatus(true);

    async function loadMeals() {
      const url =
        "https://api.freeapi.app/api/v1/public/meals";
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-2 p-3">
            🍽️ Meals Listing Interface
          </h1>
          <p className="text-gray-600 text-lg">
            Discover delicious rice recipes
          </p>
        </div>

        {/* Loading State */}
        {status ? (
          <div className="flex justify-center items-center min-h-96">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-600"></div>
              <p className="text-xl text-gray-600 font-medium">
                Loading tasty meals...
              </p>
            </div>
          </div>
        ) : (
          <div>
            {/* Meal Grid */}
            <div className="meal-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {/* Map through the meals array */}
              {meals.map((meal) => (
                <div key={meal.idMeal} className="meal-card group">
                  {/* Image Container */}
                  <div className="image-container relative overflow-hidden rounded-t-lg">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  </div>

                  {/* Card Content */}
                  <div className="card-content flex flex-col gap-3 p-4 bg-white rounded-b-lg justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2">
                        {meal.strMeal}
                      </h3>
                      <span className="badge inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {meal.strCategory}
                      </span>
                    </div>

                    <div>
                      <p className="area text-gray-600 text-sm mb-3 font-medium">
                        📍 {meal.strArea}
                      </p>
                      <button
                        className="view-btn w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                        onClick={() => setSelectedMeal(meal)}
                      >
                        View Recipe ➜
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {meals.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">No meals found</p>
              </div>
            )}
          </div>
        )}
      </div>

      <RecipeModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
    </div>
  );
}

export default App;
