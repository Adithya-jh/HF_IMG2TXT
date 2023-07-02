'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [image, setImage] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const data = { inputs: input };

  //   try {
  //     const response = await fetch('/api/query', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch image');
  //     }

  //     const result = await response.blob();
  //     const imageUrl = URL.createObjectURL(result);
  //     setImage(imageUrl);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // import axios from 'axios';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputData = { inputs: input };

    try {
      const response = await axios({
        url: 'https://api-inference.huggingface.co/models/SG161222/Realistic_Vision_V1.4',
        // url: 'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
        // url: 'https://api-inference.huggingface.co/models/prompthero/openjourney',
        method: 'POST',
        headers: {
          Authorization: `Bearer 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`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(
          // `${inputData},  soft lighting, art, midjouneyl`
          inputData
        ),
        responseType: 'arraybuffer',
      });

      const mimeType = response.headers['content-type'];
      const result = response.data;
      const base64data = Buffer.from(result, 'binary').toString('base64');
      const img = `data:${mimeType};base64,${base64data}`;

      setImage(img);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          className="text-black"
        />
        <button type="submit">Search</button>
      </form>
      {image && <img src={image} alt="Result" />}
    </div>
  );
}
