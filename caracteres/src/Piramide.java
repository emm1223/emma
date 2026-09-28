import java.util.Scanner;

public class Piramide {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Asigne el numero de filas (mayor que 0 y menor que 10):");
        if (!sc.hasNextInt()) {
            System.out.println("Error: Debe ingresar un numero entero.");
            sc.close();
            return;
        }

        int numFila = sc.nextInt();

        if (numFila > 0 && numFila < 10) {

            System.out.println("Asigne un caracter:");
            String tipoCaracter = sc.next();

            if (tipoCaracter.length() != 1) {
                System.out.println("Error: Debe ingresar un solo caracter.");
                sc.close();
                return;
            }

            for (int i = 1; i <= numFila; i++) {

                for (int j = 1; j <= i; j++) {
                    System.out.print(tipoCaracter);
                }

                System.out.println();
            }

        } else {
            System.out.println("Error: El número de filas debe ser mayor que cero y menor que diez.");
        }

        sc.close();
    }
}