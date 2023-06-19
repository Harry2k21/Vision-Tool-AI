import React, { useState } from 'react';
import axios from 'axios';

const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

const generateImage = async (query) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: query,
        n: 1,
        size: '1024x1024',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );
    return response.data.data[0].url;
  } catch (error) {
    console.error('Image generation failed:', error);
    return null;
  }
};

function ImageGenerationTab({ darkMode }) {
  const [query, setQuery] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const imageUrl = await generateImage(query);
    setLoading(false);
    setGeneratedImage(imageUrl);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Generate an Image!</h2>
      <p className="mb-4">
        No Camera? No Problem! Enter a description of an ingredient or meal here to have an image created for you!
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
      {loading ? (
        <div className="mt-4">
          <div className="fixed inset-0 flex items-center justify-center z-50">
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
          </div>
        </div>
      ) : generatedImage ? (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Generated Image:</h3>
          <img src={generatedImage} alt="Generated" width="300" />
        </div>
      ) : null}
    </div>
  );
}

export default ImageGenerationTab;
