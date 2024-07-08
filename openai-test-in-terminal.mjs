
// Import the readline module
import readline from 'readline';
const readl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Import the OpenAI library
import OpenAI from 'openai'; // Make sure the package name is correct
const openai = new OpenAI();

// Define the main function
async function main() {
    console.log("Ask me something (exit with Ctrl+C)");
    
    readl.question('Q: ', input => {
        test(input);
    })
}

async function test(input) {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." },
            { role: "user", content: input }
        ],
        model: "gpt-3.5-turbo",
    });

    console.log('A:', completion.choices[0].message.content);
}

main();
