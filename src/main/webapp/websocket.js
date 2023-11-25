// Variables globales
var username;
var chatRoomField = document.getElementById("chatRoomField");
var sendField = document.getElementById("sendField");  // Agrega esta línea
var sendButton = document.getElementById("sendButton");  // Agrega esta línea
var websocket = new WebSocket("ws://192.168.1.53:8080/SistemaNightclub/chatroom");
var aesKey;

function generateAESKey() {
    return "clavegenerada";
}

function encryptMessage(message, key) {
    var encrypted = CryptoJS.AES.encrypt(message, key);
    return encrypted.toString();
}

function decryptMessage(encryptedMessage, key) {
    var decrypted = CryptoJS.AES.decrypt(encryptedMessage, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
}

sendField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        send_message();
    }
});

websocket.onmessage = function (evt) {
    console.log("Mensaje cifrado recibido:", evt.data);
    var decryptedMessage = decryptMessage(evt.data, aesKey);
    console.log("Mensaje descifrado:", decryptedMessage);

    // Verifica si el mensaje tiene contenido
    if (decryptedMessage.trim() !== "") {
        var currentContent = chatRoomField.innerHTML;
        var messageArray = decryptedMessage.split(":");
        var senderUsername = messageArray[0];
        var messageContent = messageArray.slice(1).join(":"); // Reunir el resto del array como contenido del mensaje
        var messageClass = username === senderUsername ? "me" : "other";

        // Verifica si el mensaje proviene del usuario actual
        if (messageClass === "me") {
            // Si es el usuario actual, solo muestra el contenido del mensaje
            chatRoomField.innerHTML = currentContent + '<div class="chat-message ' + messageClass + '">' + messageContent + '</div>';
        } else {
            // Si es otro usuario, muestra el nombre de usuario y el contenido del mensaje
            chatRoomField.innerHTML = currentContent + '<div class="chat-message ' + messageClass + '">' + senderUsername + ': ' + messageContent + '</div>';
        }

        chatRoomField.scrollTop = chatRoomField.scrollHeight;
    }
};

function join() {
    username = document.getElementById("newUserField").value;  // Cambia newUserField.value a document.getElementById("newUserField").value
    document.getElementById("newUserField").disabled = true;  // Cambia newUserField.disabled a document.getElementById("newUserField").disabled
    document.getElementById("newUserButton").disabled = true;
    chatRoomField.disabled = false;
    sendField.disabled = false;
    sendButton.disabled = false;

    aesKey = generateAESKey();
    websocket.send("AES_KEY:" + btoa(aesKey));

    var joinMessage = "* " + username + " se ha unido!!";
    chatRoomField.innerHTML += '<div class="chat-message">' + joinMessage + '</div>';

    websocket.send(username + " se ha unido!!");
}

function send_message() {
    var encryptedMessage = encryptMessage(username + ": " + sendField.value, aesKey);
    websocket.send(encryptedMessage);

    sendField.value = "";
}