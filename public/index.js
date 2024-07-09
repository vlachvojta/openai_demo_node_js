// Frontend code for sending user input to the server
// Runs in the browser

async function submitAndFetchResponse() {
    // Handle submit
    const userInput = document.getElementById('textInput').value;
    console.log('Trying to send input to OpenAI API:', userInput);
    add_message(userInput, 'user');
    document.getElementById('status').innerText = '...getting response...';
    document.getElementById('textInput').value = ''; // Clear the input field

    var conversation = get_conversation();
    // console.log('Conversation:', conversation);  // print the whole conversation if needed
    console.log('Last message:', conversation[conversation.length - 1]);

    // Send the input to the server
    try {
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ conversation })
        })
        const data = await response.json();
        console.log('Data being saved to responseContainer:', data);
        document.getElementById('status').innerText = '';

        // Add the response to the chat log
        add_message(data, 'assistant');
    } catch (error) {
        console.error('Error sending input to OpenAI API:', error);
        document.getElementById('status').innerText = 'Failed to get a response from Node server, is it running?.';
    }
}

// Add a message to the chat log
function add_message(message, role) {
    // Add a message packed in a new div and p element
    // Resulting in a structure like this:
    // <div class="{role}">
    //   <p class="{role}">{message}</p>
    // </div>

    var new_message_div = document.createElement('div');
    new_message_div.className = role;
    
    var new_message = document.createElement('p');
    new_message.innerText = message;
    new_message.className = role;
    new_message_div.appendChild(new_message);

    document.getElementById('responseContainer').appendChild(new_message_div);
    document.getElementById('responseContainer').scrollTop = document.getElementById('responseContainer').scrollHeight; // Scroll to the bottom

    console.log('Message added:', message);
}

// Get the conversation history from <p> elements in the responseContainer
function get_conversation() {
    message_paragraphs = document.getElementById('responseContainer').getElementsByTagName('p');
    var conversation = [];
    for (let i = 0; i < message_paragraphs.length; i++) {
        conversation.push(
            {
                role: message_paragraphs[i].className,
                content: message_paragraphs[i].innerText
            }
        );
    }

    return conversation;
}

// Enable submitting input by pressing Enter (without Shift)
var input = document.getElementById("textInput");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        document.getElementById("btnSubmit").click();
     }
});
