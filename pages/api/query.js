const fetchImage = async (data) => {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/prompthero/openjourney-v4',
    {
      headers: {
        Authorization: 'Bearer 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',
      },
      method: 'POST',
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch image');
  }

  return await response.blob();
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  try {
    const { inputs } = req.body;
    const imageBlob = await fetchImage({ inputs });
    res.status(200).send(imageBlob);
  } catch (error) {
    console.error(error);
    res.status(500).end(); // Internal Server Error
  }
}
