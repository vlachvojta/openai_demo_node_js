console.log("Hello, send_input.js!");

async function sendInput() {
    const userInput = document.getElementById('textInput').value;
    console.log('Trying to send input to OpenAI API:', userInput);
    document.getElementById('responseContainer').innerText += '\nQ:';
    document.getElementById('responseContainer').innerText += userInput;
    document.getElementById('textInput').value = ''; // Clear the input field
    console.log('Stringified input:', JSON.stringify({ userInput }));

    // Send the input to the server
    try {
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput })
        })
        const data = await response.json();
        console.log('Data being saved to responseContainer:', data);
        document.getElementById('responseContainer').innerText += '\nA:';
        document.getElementById('responseContainer').innerText += data;
    } catch (error) {
        console.error('Error sending input to OpenAI API:', error);
        document.getElementById('responseContainer').innerText += '\n';
        document.getElementById('responseContainer').innerText += 'Failed to get a response from Node server, is it running?.';
    }
}
