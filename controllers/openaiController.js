const dotenv = require("dotenv");
dotenv.config();
// const OpenAI = require("openai");
const AzureOpenAI = require("openai").AzureOpenAI;
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
const deployment = process.env.AZURE_OPENAI_API_DEPLOYMENT;

const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

// const openai = new OpenAI({
//     organization: process.env.OPENAI_ORGANIZATION,
//     project: process.env.OPENAI_PROJECT,
// });

async function getCompletion(userPrompt, systemPrompt) {
  const result = await client.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    model: "",
  });
  return result.choices[0].message.content;
}
exports.summaryController = async (req, res) => {
  try {
    const text = req.body.inputs;
    console.log("text", text)
    const result = await getCompletion(text, "Summarize this");
    console.log(result);
    return res.status(200).json(result);
    // const { data } = await openai.completions.create({
    //   model: "gpt-3.5-turbo-instruct",
    //   prompt: `Summarize this \n${text}`,
    //   max_tokens: 500,
    //   temperature: 0.5,
    // });
    // if (data) {
    //   if (data.choices[0].text) {
    //     return res.status(200).json(data.choices[0].text);
    //   }
    // }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.paragraphController = async (req, res) => {
  try {
    const text = req.body.inputs;
    console.log("text", text);
    const result = await getCompletion(text, "Write a detailed Paragraph");
    console.log(result);
    return res.status(200).json(result);
    // const { data } = await openai.completions.create({
    //   model: "gpt-3.5-turbo-instruct",
    //   prompt: `Write a detailed Paragraph \n${text}`,
    //   max_tokens: 500,
    //   temperature: 0.5,
    // });
    // if (data) {
    //   if (data.choices[0].text) {
    //     return res.status(200).json(data.choices[0].text);
    //   }
    // }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.chatbotController = async (req, res) => {
  try {
    const text = req.body.inputs;
    console.log("text", text);
    const result = await getCompletion(text, "Answer questions similar to how Yoda from Starwars would. Me: 'What is your Name?' Yoda: 'Yoda is my name.' Me: ${text}");
    console.log(result);
    return res.status(200).json(result);
    // const { text } = req.body;
    // const { data } = await openai.completions.create({
    //   model: "gpt-3.5-turbo-instruct",
    //   prompt: `Answer questions similar to how Yoda from Starwars would.
    //   Me: 'What is your Name?'
    //   Yoda: 'Yoda is my name.'
    //   Me: ${text}`,
    //   max_tokens: 300,
    //   temperature: 0.7,
    // });
    // if (data) {
    //   if (data.choices[0].text) {
    //     return res.status(200).json(data.choices[0].text);
    //   }
    // }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.jsConverterController = async (req, res) => {
  try {
    const text = req.body.inputs;
    console.log("text", text);
    const result = await getCompletion(text, "/*convert these instructions into javascript code");
    console.log(result);
    return res.status(200).json(result);
    // const { text } = req.body;
    // const { data } = await openai.completions.create({
    //   model: "gpt-3.5-turbo-instruct",
    //   prompt: `/*convert these instructions into javascript code \n${text}`,
    //   max_tokens: 400,
    //   temperature: 0.25,
    // });
    // if (data) {
    //   if (data.choices[0].text) {
    //     return res.status(200).json(data.choices[0].text);
    //   }
    // }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.scifiImageController = async (req, res) => {
  try {
    const text = req.body.inputs;
    console.log("text", text);
    const result = await getCompletion(text, "generate a scifi image of ${text}");
    console.log(result);
    return res.status(200).json(result);
    // const { text } = req.body;
    // const { data } = await openai.createImage({
    //   prompt: `generate a scifi image of ${text}`,
    //   n: 1,
    //   size: "512x512",
    // });
    // if (data) {
    //   if (data.data[0].url) {
    //     return res.status(200).json(data.data[0].url);
    //   }
    // }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};