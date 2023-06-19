import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage";
import "../index.css";
import "./App.css";

// Load environment variables
const googleLensApiKey = process.env.REACT_APP_GOOGLE_LENS_API_KEY;
const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageInfo, setImageInfo] = useState('');
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleImageUpload = async (event) => {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Router>
      <Navbar toggleDarkMode={toggleDarkMode}
      darkMode={darkMode} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              handleImageUpload={handleImageUpload}
              imageUrl={imageUrl}
              recipe={recipe}
              darkMode={darkMode}
              isLoading={isLoading}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;