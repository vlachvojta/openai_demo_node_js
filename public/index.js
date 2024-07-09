// Frontend code for sending user input to the server
// Runs in the browser

async function submitAndFetchResponse() {
    const userInput = document.getElementById('textInput').value;
    console.log('Trying to send input to OpenAI API:', userInput);
    add_message(userInput, 'user');
    document.getElementById('status').innerText = '...getting response...';
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
        add_message(data, 'assistant');
        document.getElementById('status').innerText = '';
    } catch (error) {
        console.error('Error sending input to OpenAI API:', error);
        document.getElementById('status').innerText = 'Failed to get a response from the OpenAI API.';
    }
}

// Add a message to the chat log
function add_message(message, role) {
    var new_message_div = document.createElement('div');
    new_message_div.className = role;
    
    var new_message = document.createElement('p');
    new_message.innerText = message;
    new_message.className = role;
    new_message_div.appendChild(new_message);

    document.getElementById('responseContainer').appendChild(new_message_div);
    document.getElementById('responseContainer').scrollTop = document.getElementById('responseContainer').scrollHeight;
    console.log('Message added:', message);
}

// Enable submitting input by pressing Enter (without Shift)
var input = document.getElementById("textInput");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        document.getElementById("btnSubmit").click();
     }
});
