const express = require('express');
const app = express();
const port = 3000;

const { OpenAI } = require('openai');
// import OpenAI from 'openai'; // Make sure the package name is correct

const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.use(express.json());

app.use(express.static('public')); // Serve static files from the 'public' folder

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

app.post('/api/openai', async (req, res) => {
    const { userInput } = req.body;
    console.log('Received a request to /api/openai with user input:', userInput);
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userInput }
            ],
            model: "gpt-3.5-turbo",
        });
        res.json(completion.choices[0].message.content); // Send the completion back to the client
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).send('Failed to get a response from the OpenAI API.');
    }
});
