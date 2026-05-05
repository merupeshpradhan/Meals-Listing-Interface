import React from "react";
import "./RecipeModal.css";

function RecipeModal({ meal, onClose }) {
  if (!meal) return null;

  //   get ingredients list
  const getIngredients = (meal) => {
    let list = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        list.push(
          `${meal[`strMeasure${i}`] || ""} ${meal[`strIngredient${i}`]}`,
        );
      }
    }
    return list;
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="modal-card bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="modal-close-btn absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold p-2 hover:bg-gray-100 rounded-full transition"
        >
          ✕
        </button>

        <div className=" flex justify-center">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-1/2 object-cover rounded-t-lg"
          />
        </div>

        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            {meal.strMeal}
          </h2>

          {/* Ingredients and Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Ingredients */}
            <div className="ingredients-section">
              <h4 className="text-xl font-semibold mb-3 text-gray-700 border-b-2 border-orange-500 pb-2">
                🥘 Ingredients
              </h4>
              <ul className="space-y-2">
                {getIngredients(meal).map((ing, i) => (
                  <li key={i} className="flex items-start text-gray-700">
                    <span className="text-orange-500 font-bold mr-3">•</span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Details */}
            <div className="details-section">
              <h4 className="text-xl font-semibold mb-3 text-gray-700 border-b-2 border-orange-500 pb-2">
                ℹ️ Details
              </h4>
              <div className="space-y-3">
                <p className="text-gray-700">
                  <span className="font-semibold">Category:</span>
                  <span className="ml-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                    {meal.strCategory}
                  </span>
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Origin:</span>
                  <span className="ml-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {meal.strArea}
                  </span>
                </p>
                {meal.strYoutube && (
                  <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition"
                  >
                    🎥 Watch Tutorial
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Cooking Instructions */}
          <div className="instructions-section">
            <h4 className="text-xl font-semibold mb-3 text-gray-700 border-b-2 border-orange-500 pb-2">
              👨‍🍳 Cooking Instructions
            </h4>
            <p className="text-gray-700 leading-relaxed line-clamp-none">
              {meal.strInstructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;
