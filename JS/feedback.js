const chatMessages = document.getElementById("chatMessages")
const sendButton = document.getElementById("sendMessage")
const messageInput = document.getElementById("messageInput")
const usernameInput = document.getElementById("username")

let messages = JSON.parse(localStorage.getItem("feedbackMessages")) || []

function renderMessages(){

chatMessages.innerHTML = ""

messages.forEach(msg => {

const div = document.createElement("div")
div.classList.add("message")

div.innerHTML = "<strong>" + msg.user + ":</strong> " + msg.text

chatMessages.appendChild(div)

})

chatMessages.scrollTop = chatMessages.scrollHeight

}

sendButton.addEventListener("click", () => {

const text = messageInput.value.trim()
const user = usernameInput.value.trim() || "Anonymous"

if(!text) return

messages.push({
user:user,
text:text
})

localStorage.setItem("feedbackMessages", JSON.stringify(messages))

messageInput.value=""

renderMessages()

})

renderMessages()