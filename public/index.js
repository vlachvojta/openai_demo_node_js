// Frontend code for sending user input to the server
// Runs in the browser

// TODO: add this to the beginning of every conversation
// setup message to set the tone of the assistant's answers
var setup_message = [
    {
        role: "system",
        content: "You are a helpful assistant."
    }
];

async function submitAndFetchResponse() {
    // Handle submit
    var textInput = document.getElementById('textInput').value;
    var imageInput = document.getElementById('imageInput').value;

    var conversation = add_message_to_conversation(textInput, 'user', imageInput);
    add_message_to_html(textInput, 'user', imageInput);

    document.getElementById('status').innerText = '...getting response...';
    console.log('Last message:', conversation[conversation.length - 1]);

    document.getElementById('textInput').value = ''; // Clear the input field
    document.getElementById('imageInput').value = ''; // Clear the image input field

    // Send the input to the server through /api/openai endpoint
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

        add_message_to_conversation(data, 'assistant');
        add_message_to_html(data, 'assistant');
    } catch (error) {
        console.error('Error sending input to OpenAI API:', error);
        document.getElementById('status').innerText = 'Failed to get a response from Node server, is it running?.';
    }
}

// Add a message to the chat log
function add_message_to_html(message, role, image_url=null) {
    // Add a message packed in a new div and p element
    // Resulting in a structure like this:
    // <div class="{role}">
    //   <p class="{role}">{message}</p>
    // </div>

    var new_message_div = document.createElement('div');
    new_message_div.className = role;

    var new_message = document.createElement('p');
    new_message.innerText = message;
    
    if (image_url) {
        new_message.innerText += '\n' + image_url.substring(0, 30) + '...'; // Show only the first 30 characters of the image URL 
        var new_image = document.createElement('img');
        new_image.src = image_url;
        new_image.alt = 'Image';
        new_message_div.appendChild(new_image);
    }

    new_message.className = role;
    new_message_div.appendChild(new_message);

    document.getElementById('responseContainer').appendChild(new_message_div);
    document.getElementById('responseContainer').scrollTop = document.getElementById('responseContainer').scrollHeight; // Scroll to the bottom

    console.log('Message added:', message);
}

// Get the last message from the input fields
function add_message_to_conversation(text, role, image_url=null) {
    var message = {};

    if (image_url) {
        message = {
            'role': role,
            'content': [
                { type: 'text', text: text },
                {
                    type: 'image_url',
                    image_url: {
                        url: image_url
                    }
                }
            ]
        }
    } else {
        message = {
            'role': role,
            'content': text
        }
    }

    // TODO: store all messages in a conversation

    return [message];
}

// Enable submitting input by pressing Enter (without Shift)
addEventListener(document.getElementById("textInput"));
addEventListener(document.getElementById("imageInput"));

function addEventListener(element){
    element.addEventListener("keypress", function(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            document.getElementById("btnSubmit").click();
        }
    });
}
