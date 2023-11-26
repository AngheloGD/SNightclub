// Variables globales
var username;
var chatRoomField = document.getElementById("chatRoomField");
var sendField = document.getElementById("sendField");
var sendButton = document.getElementById("sendButton");
var websocket = new WebSocket("ws://192.168.1.53:8080/SistemaNightclub/chatroom");
var aesKey;

function generateAESKey() {
    return "clavegenerada";
}

function encryptMessage(username, message, key) {
    var combinedMessage = username + ": " + message; // Combina nombre de usuario y mensaje
    var encrypted = CryptoJS.AES.encrypt(combinedMessage, key);
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

    // Intenta descifrar el mensaje
    var decryptedMessage = decryptMessage(evt.data, aesKey);

    if (decryptedMessage.startsWith("AES_KEY:")) {
        // Este mensaje contiene la clave AES
        var base64Key = decryptedMessage.substring("AES_KEY:".length);
        aesKey = atob(base64Key);  // Decodificar la clave desde base64
        console.log("Clave AES recibida: " + aesKey);
    } else {
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
                chatRoomField.innerHTML = currentContent + '<div class="chat-message ' + messageClass + '"><div class="chat-message-content">' + messageContent + '</div></div>';
            } else {
                // Si es otro usuario, muestra el nombre de usuario y el contenido del mensaje
                chatRoomField.innerHTML = currentContent + '<div class="chat-message ' + messageClass + '"><div class="chat-message-content">' + senderUsername + ': ' + messageContent + '</div></div>';
            }

            chatRoomField.scrollTop = chatRoomField.scrollHeight;
        }
    }
};

function join() {
    // Mostrar la animación de carga
    $(".loading-image").show();

    // Después de 2 segundos, ocultar la animación y mostrar los elementos del chat con la animación de desvanecer
    setTimeout(function () {
        $(".loading-image").hide();
        $("#chatRoomField, #sendField, #sendButton").addClass("fade-in").removeClass("hidden");
    }, 3000);
    
    username = document.getElementById("newUserField").value;
    document.getElementById("newUserField").disabled = true;
    document.getElementById("newUserButton").disabled = true;
    chatRoomField.disabled = false;
    sendField.disabled = false;
    sendButton.disabled = false;

    aesKey = generateAESKey();
    websocket.send("AES_KEY:" + btoa(aesKey));

    var joinMessage = "* " + username + " se ha unido!!";
    chatRoomField.innerHTML += '<div class="chat-message"><div class="chat-message-content">' + joinMessage + '</div></div>';

    websocket.send(username + " se ha unido!!");
}

function send_message() {
    var messageContent = sendField.value;
    var encryptedMessage = encryptMessage(username, messageContent, aesKey);
    websocket.send(encryptedMessage);

    sendField.value = "";
}

// Función para redirigir a principal.html
function goToPrincipalPage() {
    window.location.href = 'Principal.html';
}

document.addEventListener("DOMContentLoaded", function () {
    var storedUsername = localStorage.getItem('username');

    if (storedUsername) {
        // Insertar el nombre de usuario en el campo de entrada
        document.getElementById("newUserField").value = storedUsername;
    }
});
