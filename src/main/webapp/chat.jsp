<%-- 
    Document   : chat
    Created on : 20 nov 2023, 14:36:25
    Author     : ANGHELO
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Ayuda</title>
        <!-- Referencia a la biblioteca CryptoJS -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
        <!-- Elimina el error favicon.ico -->
        <link rel="icon" type="image/x-icon" href="data:image/x-icon;,">
    </head>
    <body>
        <h2>Ayuda al cliente</h2>
        <form action="">
            <input id="newUserField" name="user" value="" type="text"> 
            <input id="newUserButton" onclick="join();" value="Entrar" type="button">

            <br/><br/>
            <textarea id="chatRoomField" rows="10" cols="50" readonly disabled></textarea> <br>

            <br/>
            <input id="sendField" name="message" value="" type="text" disabled>
            <input id="sendButton" onclick="send_message();" value="Enviar" type="button" disabled>
        </form>

        <script src="websocket.js" type="text/javascript"></script>
    </body>
</html>