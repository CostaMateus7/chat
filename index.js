const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-gXeFhTU6ibmmluSPgfHNs8Rz",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3080;

app.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 250,
      temperature: 0.5,
    });

    res.send({
      message: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.send({ message: "deu ruim" });
  }
});
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
