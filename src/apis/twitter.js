const oaiKey = "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";

export const generatePrompts = async (prompt) => {
  try {
    const res = await fetch(`https://api.openai.com/v1/completions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${oaiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Give me a catchy tweet on the following prompt:\n${prompt}`,
        max_tokens: 70,
        temperature: Math.random(),
        n: 10,
      }),
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.log("Error generating prompts", err);
    return false;
  }
};

export const generateThread = async (tweet) => {
  try {
    const res = await fetch(`https://api.openai.com/v1/completions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${oaiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Generate a twitter thread of 6 tweets with maximum 280 characters for the following tweet:\n${tweet}`,
        max_tokens: 350,
        temperature: Math.random(),
        n: 1,
      }),
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.log("Error generating thread", err);
    return false;
  }
};

export const generateImageForTweet = async (tweet) => {
  try {
    const res = await fetch(`https://api.openai.com/v1/completions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${oaiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `What image would be best suited for the following tweet:\n${tweet}`,
        max_tokens: 40,
        temperature: Math.random(),
        n: 1,
      }),
    });

    const data = await res.json();

    let answer = Array.isArray(data.choices) ? data.choices[0].text : "";
    answer = answer.split("\n").slice(1).join("");

    const res2 = await fetch(`https://api.openai.com/v1/images/generations`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${oaiKey}`,
      },
      body: JSON.stringify({
        prompt: answer,
        n: 1,
        size: "512x512",
      }),
    });

    const data2 = await res2.json();

    return data2;
  } catch (err) {
    console.log("Error generating thread", err);
    return false;
  }
};
