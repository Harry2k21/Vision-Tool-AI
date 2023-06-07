import React, { useState } from "react";
import ImageGenerationTab from '../components/ImageGenerationTab';
import ScrollToTopButton from "../components/ScrollToTopButton";

// Handles the save recipe action
const handleSaveRecipe = (recipe) => {
  const element = document.createElement("a");
  const file = new Blob([recipe], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = "recipe.txt";
  document.body.appendChild(element);
  element.click();
};

// Add this function to handle the share recipe action
const handleShareRecipe = async (recipe) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Shared Recipe",
        text: recipe,
      });
      console.log("Sharing was successful!");
    } catch (error) {
      console.log("Sharing failed:", error);
    }
  } else {
    console.log("Web Share API not supported in this browser.");
  }
};

function HomePage({ darkMode, handleImageUpload, imageUrl, recipe, isLoading }) {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div
      className={`min-h-screen py-6 flex flex-col justify-center sm:py-12 ${
        darkMode ? "bg-gray-900" : "bg-white-100"
      }`}>
      {isLoading && (
        <div className="container" id="load">
          <div className="cube">
            <div className="sides">
              <div className="top"></div>
              <div className="right"></div>
              <div className="bottom"></div>
              <div className="left"></div>
              <div className="front"></div>
              <div className="back"></div>
            </div>
          </div>
          <div className="text">Loading</div>
        </div>
      )}
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          className={`absolute inset-0 ${
            darkMode ? "bg-gradient-to-r from-gray-800" : "bg-gradient-to-r from-purple-400"
          } to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl`}
        ></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-bold mb-4">
            Vision AI - Image-to-Recipe Analysis
          </h1>
          {/* Add tabs to switch between upload image and generate image */}
          <div className="flex mb-4">
            <button
              onClick={() => setActiveTab('upload')}
              className={`font-bold py-2 px-4 rounded ${
                activeTab === 'upload'
                  ? 'bg-purple-500  hover:bg-purple-700 text-white'
                  : 'text-purple-500'
              }`}
            >
              Upload Image
            </button>
            <button
              onClick={() => setActiveTab('generate')}
              className={`font-bold py-2 px-4 rounded ml-4 ${
                activeTab === 'generate'
                  ? 'bg-purple-500 hover:bg-purple-700 text-white '
                  : 'text-purple-500'
              }`}
            >
              Generate Image
            </button>
          </div>
          {activeTab === 'upload' ? (
            <div>
              <p className="mb-4">
                Upload an image to get a recipe and nutritional information based
                on the image's content.
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  width="300"
                  className="mb-4"
                />
              )}
              {recipe && (
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    Recipe and Nutritional Information:
                  </h2>
                  <div className="whitespace-pre-wrap break-words">{recipe}</div>
                  {/* Save and share recipe buttons */}
                  <button
                    onClick={() => handleSaveRecipe(recipe)}
                    className="mt-4 bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Save Recipe
                  </button>
                  <button
                    onClick={() => handleShareRecipe(recipe)}
                    className="mt-4 bg-purple-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Share Recipe
                  </button>
                </div>
              )}
            </div>
          ) : (
            <ImageGenerationTab darkMode={darkMode} apiKey={process.env.REACT_APP_OPENAI_API_KEY} />
          )}
          <div className="scroll-to-top-button-container">
            <ScrollToTopButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;