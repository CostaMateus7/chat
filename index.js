const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-Iy9pgcRw1m0rcgj8HSpkTBFo",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const port = 3080 

app.post('/', async (req, res)=>{
  const { message } = req.body
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 250,
    temperature: 0.5,
  });
  res.json({
    message: response.data.choices[0].text
  })
})
app.listen(port, ()=>{
  console.log(`http://localhost:${port}`)
})