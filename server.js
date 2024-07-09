// Backend code for sending user input to the OpenAI API
// Runs in the Node.js server

const express = require('express');

const app = express();
const port = 3000;

const { OpenAI } = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

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

    var messages = [
        { 
            role: "system",
            content: "You are a helpful assistant."
        }
    ];
    messages = messages.concat(conversation);

    // Send the whole conversation to the OpenAI API
    try {
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-3.5-turbo",
        });
        answer = completion.choices[0].message.content;
        console.log('GPT:', answer);
        console.log('') // Add a blank line for readability in the console
        res.json(answer);
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).send('Failed to get a response from the OpenAI API.');
    }
});
