/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Session;

import javax.servlet.http.HttpSession;

/**
 *
 * @author ANGHELO
 */
public class Sesion {

    public static void crearsesion(HttpSession session, int codiUsua, String logiUsua, String nombUsua) {
        session.setAttribute("logueado", "1");
        session.setAttribute("codiUsua", codiUsua);
        session.setAttribute("logiUsua", logiUsua);
        session.setAttribute("nombUsua", nombUsua);
    }

    public static boolean sesionvalida(HttpSession session) {
        String logueado = (String) session.getAttribute("logueado");
        if (logueado.equals("1")) {
            return true;
        }
        return false;
    }

    public static void cerrarsesion(HttpSession session) {
        session.removeAttribute("logueado");
        session.removeAttribute("codiUsua");
        session.removeAttribute("logiUsua");
        session.removeAttribute("nombUsua");
        session.invalidate();
    }

    public static int getCodiUsua(HttpSession session) {
        Object ocodigo = session.getAttribute("codiUsua");
        return Integer.parseInt(ocodigo.toString());
    }

    public static String getLogiUsua(HttpSession session) {
        Object ologi = session.getAttribute("logiUsua");
        return ologi.toString();
    }
}
