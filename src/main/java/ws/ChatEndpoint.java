package ws;

import java.io.IOException;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Base64;
import javax.websocket.EncodeException;
import javax.websocket.OnMessage;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/chatroom")
public class ChatEndpoint {

    private static final BigInteger P = new BigInteger("FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD1"
            + "29024E088A67CC74020BBEA63B139B22514A08798E3404DD"
            + "EF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245"
            + "E485B576625E7EC6F44C42E9A63A3620FFFFFFFFFFFFFFFF", 16);
    private static final BigInteger G = BigInteger.valueOf(2);

    private BigInteger privateKey;
    private BigInteger publicKey;
    private BigInteger sharedSecret;

    @OnMessage
    public void message(String message, Session client) throws IOException, EncodeException {
        if (message.equals("INIT_DH")) {
            // Iniciar el intercambio Diffie-Hellman
            generateKeys();
            System.out.println("Server Private Key: " + privateKey);
            System.out.println("Server Public Key: " + publicKey);

            // Enviar la clave pública al cliente
            String publicKeyMessage = "PUBLIC_KEY:" + Base64.getEncoder().encodeToString(publicKey.toByteArray());
            client.getBasicRemote().sendText(publicKeyMessage);
        } else if (message.startsWith("PUBLIC_KEY:")) {
            // Procesar la clave pública del cliente y calcular la clave compartida
            String base64Key = message.substring("PUBLIC_KEY:".length());
            BigInteger clientPublicKey = new BigInteger(Base64.getDecoder().decode(base64Key));
            sharedSecret = clientPublicKey.modPow(privateKey, P);
            System.out.println("Shared Secret: " + sharedSecret);
        } else {
            // Mensaje normal
            for (Session openSession : client.getOpenSessions()) {
                openSession.getBasicRemote().sendText(message);
            }
        }
    }

    private void generateKeys() {
        SecureRandom random = new SecureRandom();
        privateKey = new BigInteger(2048, random);
        publicKey = G.modPow(privateKey, P);
    }
}
