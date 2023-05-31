import React, { useState } from 'react';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageInfo, setImageInfo] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64data = reader.result;
      setImageUrl(base64data);


      // ENTER YOUR API KEY WHERE IT SAYS YOUR_API_KEY 
      try {
        const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY', {
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
        setImageInfo(JSON.stringify(data, null, 2));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h1>Google Lens Image Analysis</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageUrl && <img src={imageUrl} alt="Uploaded" width="300" />}
      {imageInfo && (
        <pre>
          <code>{imageInfo}</code>
        </pre>
      )}
    </div>
  );
};

export default App;
