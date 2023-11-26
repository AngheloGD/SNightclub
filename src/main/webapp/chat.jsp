<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Ayuda</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
        <link rel="icon" type="image/x-icon" href="data:image/x-icon;,">
        <link href="css/ChatStyle.css" rel="stylesheet" type="text/css"/>
        <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
        </head>
    <body>
        <div class="flex-container">
            <div>
                <button class="button red" onclick="goToPrincipalPage()">Ir a la página principal</button>
            </div>
            <div class="center-container">
                <h2>Ayuda al cliente</h2>
            </div>
        </div>
        <form>

            <input id="newUserField" name="user" value="" type="text"> 
            <input id="newUserButton" onclick="join();" value="Entrar" type="button">

            <br/><br/>
            <div id="chatRoomField" class="chat-message"></div>
            <br/>
            <input id="sendField" name="message" value="" type="text" disabled>
            <input id="sendButton" onclick="send_message();" value="Enviar" type="button" disabled>
        </form>

        <script type="text/javascript" src="websocket.js"></script>

        <script>
                // Función para redirigir a principal.html
                function goToPrincipalPage() {
                    window.location.href = 'Principal.html';
                }

                $(document).ready(function () {
                    // Obtener el nombre de usuario almacenado en LocalStorage
                    var username = localStorage.getItem('username');

                    // Verificar si se ha iniciado sesión y si se ha obtenido el nombre de usuario
                    if (username) {
                        // Insertar el nombre de usuario en el campo de entrada
                        $("#newUserField").val(username);
                    }
                });
        </script>
    </body>
</html>
