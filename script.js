let savedpasttext = []; // Variable to store the message
let savedpastresponse = []; // Variable to store the message

// Section: get the Id of the talking container
const messagesContainer = document.getElementById('messages-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
//

//Section: function to creat the dialogue window
const addMessage = (message, role, imgSrc) => {
  // creat elements in the dialogue window
  const messageElement = document.createElement('div');
  const textElement = document.createElement('p');
  messageElement.className = `message ${role}`;
  const imgElement = document.createElement('img');
  imgElement.src = `${imgSrc}`;
  // append the image and message to the message element
  messageElement.appendChild(imgElement);
  textElement.innerText = message;
  messageElement.appendChild(textElement);
  messagesContainer.appendChild(messageElement);
  // creat the ending of the message
  var clearDiv = document.createElement("div");
  clearDiv.style.clear = "both";
  messagesContainer.appendChild(clearDiv);
};
//


//Section: Calling the model
const sendMessage = async (message) => {
  addMessage(message, 'user','user.jpeg');
  // Loading animation
  const loadingElement = document.createElement('div');
  const loadingtextElement = document.createElement('p');
  loadingElement.className = `loading-animation`;
  loadingtextElement.className = `loading-text`;
  loadingtextElement.innerText = 'Loading....Please wait';
  messagesContainer.appendChild(loadingElement);
  messagesContainer.appendChild(loadingtextElement);
  
  // the fetch content sent to the model
  response = await fetch('http://localhost:8000/chatbot', {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify({
    inputs: {
      past_user_inputs: savedpasttext,
      generated_responses: savedpastresponse,
      text: message
    }
  })
});
  // Deleting the loading animation
  const loadanimation = document.querySelector('.loading-animation');
  const loadtxt = document.querySelector('.loading-text');
  loadanimation.remove();
  loadtxt.remove();

  // Hoding the respones
  const data = await response.json();
  if (data.error) {
    // Handle the error here
    //const errorMessage = 'Error：\n'+data.error.message;
    const errorMessage = JSON.stringify(data);
    addMessage(errorMessage, 'error','Error.png');
  } else {
    // Process the normal response here
    const responseMessage = data['response'];
    addMessage(responseMessage, 'aibot','Bot_logo.png');
  }
  
  // save the content in history
  savedpasttext.push(message);
  savedpastresponse.push(JSON.stringify(data['response']));
  console.log(savedpasttext);
  console.log(savedpastresponse);
};
//

//Section: Button to submit to the model and get the response
messageForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (message !== '') {
    await sendMessage(message);
    messageInput.value = '';
  }
});
