console.log("Hello, openai-test.js!");

// Import the OpenAI library
import OpenAI from 'openai'; // Make sure the package name is correct

console.log("Hello, OpenAI!");
const openai = new OpenAI();

async function test() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

test();
