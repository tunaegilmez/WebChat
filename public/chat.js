const socket = io.connect("http://localhost:3000/");

const sender = document.getElementById("sender");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const feedback = document.getElementById("feedback");
const output = document.getElementById("output");

submitBtn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    sender: sender.value,
  });
});

socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML +=
    `<p><strong>` + data.sender + ` : </strong>` + data.message + `</p>`;
  message.value = "";
});

message.addEventListener("keypress", () => {
  socket.emit("typing", sender.value);
});

socket.on("typing", (data) => {
  feedback.innerHTML = `<p>` + data + ` typing...</p>`;
});
