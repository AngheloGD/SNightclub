// Variables globales
// Variables globales
var username;
var chatRoomField = document.getElementById("chatRoomField");  // Agrega esta línea
var websocket = new WebSocket("ws://192.168.1.43:8080/SistemaNightclub/chatroom");
var aesKey;  // Variable para almacenar la clave AES

// Nueva función para generar una clave secreta para AES
function generateAESKey() {
    // Implementa la generación de la clave aquí
    // Devuelve la clave generada
    return "clavegenerada";  // Reemplaza esto con la generación real de la clave
}

// Nueva función para encriptar mensajes con AES
function encryptMessage(message, key) {
    var encrypted = CryptoJS.AES.encrypt(message, key);
    return encrypted.toString();
}

// Nueva función para desencriptar mensajes con AES
function decryptMessage(encryptedMessage, key) {
    var decrypted = CryptoJS.AES.decrypt(encryptedMessage, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// Añadir un evento al presionar la tecla "Enter" en el campo de entrada
sendField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        send_message();
    }
});

websocket.onmessage = function (evt) {
    // Mostrar el mensaje cifrado en la consola
    console.log("Mensaje cifrado recibido:", evt.data);

    // Descifrar el mensaje recibido con AES
    var decryptedMessage = decryptMessage(evt.data, aesKey);

    // Mostrar el mensaje descifrado en la consola
    console.log("Mensaje descifrado:", decryptedMessage);

    // Mostrar el mensaje descifrado en el cuadro de mensajes
    chatRoomField.innerHTML += decryptedMessage + "\n";
};

function join() {
    username = newUserField.value;
    newUserField.disabled = true;
    newUserButton.disabled = true;
    chatRoomField.disabled = false;
    sendField.disabled = false;
    sendButton.disabled = false;

    // Generar y enviar la clave AES al servidor
    aesKey = generateAESKey();
    websocket.send("AES_KEY:" + btoa(aesKey));

    // Mostrar el mensaje de unión del usuario en el cuadro de mensajes
    var joinMessage = "* " + username + " se ha unido!!";
    chatRoomField.innerHTML += joinMessage + "\n";

    // Enviar el mensaje de unión del usuario al servidor
    websocket.send(username + " se ha unido!!");
}

function send_message() {
    // Enviar el mensaje encriptado con AES
    var encryptedMessage = encryptMessage(username + ": " + sendField.value, aesKey);
    websocket.send(encryptedMessage);

    // Limpiar el campo de entrada después de enviar el mensaje
    sendField.value = "";
}