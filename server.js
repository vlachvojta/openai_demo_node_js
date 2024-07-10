// Backend code for sending user input to the OpenAI API
// Runs in the Node.js server

const express = require('express');

const app = express();
const port = 3000;

const { OpenAI } = require('openai');
// TODO put your API key here, DO NOT COMMIT IT to git
const openai = new OpenAI({ apiKey: "your-api-key" });

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' folder

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    console.log('Press Ctrl+C to stop the server\n');
});

// Enable frontend to send user input to the server
app.post('/api/openai', async (req, res) => {
    const { conversation } = req.body;
    // console.log('Conversation:', conversation);  // print the whole conversation if needed
    console.log('User:', conversation[conversation.length - 1].content);

    // Send the whole conversation to the OpenAI API
    try {
        const completion = await openai.chat.completions.create({
            messages: conversation,
            model: "gpt-4o",
        });
        answer = completion.choices[0].message.content;
        print_gpt_answer(answer);
        res.json(answer);
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).send('Failed to get a response from the OpenAI API.');
    }
});

function print_gpt_answer(answer) {
    if (answer.length < 100) {
        console.log('GPT:', answer);
    } else {
        console.log('GPT:', answer.substring(0, 100) + '...');
    }
    console.log('') // Add a blank line for readability in the console
}