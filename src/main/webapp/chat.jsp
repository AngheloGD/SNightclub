<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Ayuda</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
    <link rel="icon" type="image/x-icon" href="data:image/x-icon;,">
    <link href="css/ChatStyle.css" rel="stylesheet" type="text/css"/>
</head>
<body>
    <h2>Ayuda al cliente</h2>
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
</body>
</html>