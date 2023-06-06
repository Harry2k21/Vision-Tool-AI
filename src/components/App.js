import React, { useState } from 'react';
import '../index.css';
import './App.scss'

// Load environment variables
const googleLensApiKey = process.env.REACT_APP_GOOGLE_LENS_API_KEY;
const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageInfo, setImageInfo] = useState('');
  const [recipe, setRecipe] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64data = reader.result;
      setImageUrl(base64data);

      try {
        const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${googleLensApiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64data.split(',')[1],
                },
                features: [
                  {
                    type: 'WEB_DETECTION',
                    maxResults: 5,
                  },
                  {
                    type: 'LABEL_DETECTION',
                    maxResults: 5,
                  },
                ],
              },
            ],
          }),
        });

        const data = await response.json();
        const description = data.responses[0].webDetection.bestGuessLabels[0].label;
        setImageInfo(description);
        getRecipe(description);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    reader.readAsDataURL(file);
  };

  const getRecipe = async (description) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a Recipe and Nutrition expert who finds recipes and nutritional information based on the user\'s input.',
            },
            {
              role: 'user',
              content: `Please return a recipe based on ${description} and give me some nutritional information about the recipe.`,
            },
          ],
        }),
      });

      const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a Recipe and Nutrition expert who finds recipes and nutritional information based on the user\'s input.',
          },
          {
            role: 'user',
            content: `Please return a recipe based on ${description} and give me some nutritional information about the recipe.`,
          },
        ],
      };

      console.log('Request body:', requestBody);
  
      const data = await response.json();
      setRecipe(data.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className={darkMode ? "bg-gray-800 min-h-screen" : "bg-gray-100 min-h-screen"}>
    <div className={"p-6 flex flex-col justify-center"}>
      <button
        onClick={toggleDarkMode}
        className={"bg-blue-500 text-white px-4 py-2 rounded mb-6"}
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button></div>
      <div className="min-h-screen bg-blue-100 py-6 flex flex-col justify-center sm:py-12">
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
  <div class="text">BUNDLING DEPENDENCIES</div>
</div>
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className=" w-200 md:w-200 lg:w-200 relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-bold mb-4">Vision AI - Image-to-Recipe Analysis</h1>
          <p className="mb-4">Upload an image to get a recipe and nutritional information based on the image's content.</p>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
          {imageUrl && <img src={imageUrl} alt="Uploaded" width="300" className="mb-4" />}
          {recipe && (
            <div>
              <h2 className="text-xl font-bold mb-2">Recipe and Nutritional Information:</h2>
              <div className="whitespace-pre-wrap break-words">{recipe}</div>
              <div></div>
            </div>
          )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default App;