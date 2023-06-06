import React from "react";

function HomePage({ darkMode, handleImageUpload, imageUrl, recipe, isLoading }) {
  return (
    <div
      className={`min-h-screen py-6 flex flex-col justify-center sm:py-12 ${
        darkMode ? "bg-gray-900" : "bg-white-100"}`}>
      {isLoading && (
        <div class="container" id="load">
          <div class="cube">
            <div class="sides">
              <div class="top"></div>
              <div class="right"></div>
              <div class="bottom"></div>
              <div class="left"></div>
              <div class="front"></div>
              <div class="back"></div>
            </div>
          </div>
          <div class="text">Loading</div>
        </div>
      )}
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            className={`absolute inset-0 ${
              darkMode ? "bg-gradient-to-r from-gray-800" : "bg-gradient-to-r from-cyan-400"
            } to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl`}
          ></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <h1 className="text-2xl font-bold mb-4">
              Vision AI - Image-to-Recipe Analysis
            </h1>
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
              </div>
            )}
          </div>
        </div>
      </div>
      
    );
  }
  
  export default HomePage;