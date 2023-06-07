import React, { useState } from 'react';
import axios from 'axios'

const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

const generateImage = async (query) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: query,
        n: 1,
        size: "1024x1024",
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        },
      }
    );
    return response.data.data[0].url;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
};

function ImageGenerationTab({ darkMode }) {
  const [query, setQuery] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await generateImage(query);
    setGeneratedImage(imageUrl);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Generate Food Item Image</h2>
      <p className="mb-4">
        Enter a food item description to generate an image using image generation service:
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="border rounded p-2 mr-4"
          placeholder="Enter food description"
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate Image
        </button>
      </form>
      {generatedImage && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Generated Image:</h3>
          <img src={generatedImage} alt="Generated" width="300" />
        </div>
      )}
    </div>
  );
}

export default ImageGenerationTab;