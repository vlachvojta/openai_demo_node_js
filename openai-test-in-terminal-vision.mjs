import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
    image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg";
    console.log("Q: What's in this image? (url: " + image_url + ")");
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
        {
            role: "user",
            content: [
            { type: "text", text: "What's in this image?" },
            {
                type: "image_url",
                image_url: {
                    "url": image_url,
                },
            },
            ],
        },
        ],
    });
    console.log('A:', response.choices[0].message.content);
}

main();
// Run the script with the following command:
// node openai-test-in-terminal_vision.mjs