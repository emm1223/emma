package co.edu.unbosque.model;

public class Tablero {
  
  private char[][] pizarra;
  private int filas;
  private int columnas;
  public Tablero() {
	
	  filas = 7;
	  columnas = 7;
	  pizarra = new char[filas][columnas];
  }
  

 public void limpiar( ) { 
	 for (int i = 0; i < filas; i++ ) {
		 for (int j = 0; j < columnas; j++) {
			 pizarra[i][j] = '*';
		 }
	 }
 }
 public String verPizarra() { 
	    String rta = "";
	    for (int i = 0; i < filas; i++) {
	        for (int j = 0; j < columnas; j++) {
	            rta += pizarra[i][j] + " "; 
	        }
	        rta += "\n";
	    }
	    rta += "\n";
	    return rta;
	 }
 
 
 public void cargarLetraF() {
	    for (int i = 0; i < filas; i++) {
	        for (int j = 0; j < columnas; j++) {
	            if (i == 0) {
	                pizarra[i][j] = 'F';
	            } else if (i == 3) {
	                pizarra[i][j] = 'F';
	            } else if (j == 0) {
	                pizarra[i][j] = 'F';
	            } else {
	                pizarra[i][j] = ' ';
	            }
	        }
	    }
	}

	public void cargarLetraA() {
	    for (int i = 0; i < filas; i++) {
	        for (int j = 0; j < columnas; j++) {
	            if (i == 0) {
	                pizarra[i][j] = 'A';
	            } else if (i == 3) {
	                pizarra[i][j] = 'A';
	            } else if (j == 0) {
	                pizarra[i][j] = 'A';
	            } else if (j == 6) {
	                pizarra[i][j] = 'A';
	            } else {
	                pizarra[i][j] = ' ';
	            }
	        }
	    }
	}
 public void cargarLetraR() {
	    for (int i = 0; i < filas; i++) {
	        for (int j = 0; j < columnas; j++) {
	            if (i == 0 || i == 3 || j == 0) {
	                pizarra[i][j] = 'R';
	            } else if (j == 6 && i < 3) {
	                pizarra[i][j] = 'R';
	            } else if (i == 4 && j == 2) {
	                pizarra[i][j] = 'R';
	            } else if (i == 5 && j == 4) {
	                pizarra[i][j] = 'R';
	            } else if (i == 6 && j == 6) {
	                pizarra[i][j] = 'R';
	            } else {
	                pizarra[i][j] = ' ';
	            }
	        }
	    }
	}

	public void cargarLetraI() {
	    for (int i = 0; i < filas; i++) {
	        for (int j = 0; j < columnas; j++) {
	            if (i == 0 || i == 6 || j == 3) {
	                pizarra[i][j] = 'I';
	            } else {
	                pizarra[i][j] = ' ';
	            }
	        }
	    }
	}

	public void cargarLetraD() {
	    for (int i = 0; i < filas; i++) {
	        for (int j = 0; j < columnas; j++) {
	            if (j == 0) {
	                pizarra[i][j] = 'D';
	            } else if ((i == 0 || i == 6) && j < 6) {
	                pizarra[i][j] = 'D';
	            } else if (j == 6 && i > 0 && i < 6) {
	                pizarra[i][j] = 'D';
	            } else {
	                pizarra[i][j] = ' ';
	            }
	        }
	    }
	}

	public void cargarLetraE() {
	    for (int i = 0; i < filas; i++) {
	        for (int j = 0; j < columnas; j++) {
	            if (i == 0 || i == 3 || i == 6 || j == 0) {
	                pizarra[i][j] = 'E';
	            } else {
	                pizarra[i][j] = ' ';
	            }
	        }
	    }
	}

	public void cargarLetraM() {
	    for (int i = 0; i < filas; i++) {
	        for (int j = 0; j < columnas; j++) {
	            if (j == 0 || j == 6) {
	                pizarra[i][j] = 'M';
	            } else if (i == 1 && (j == 1 || j == 5)) {
	                pizarra[i][j] = 'M';
	            } else if (i == 2 && (j == 2 || j == 4)) {
	                pizarra[i][j] = 'M';
	            } else if (i == 3 && j == 3) {
	                pizarra[i][j] = 'M';
	            } else {
	                pizarra[i][j] = ' ';
	            }
	        }
	    }
	}

	public void cargarLetraN() {
	    for (int i = 0; i < filas; i++) {
	        for (int j = 0; j < columnas; j++) {
	            if (j == 0 || j == 6 || i == j) {
	                pizarra[i][j] = 'N';
	            } else {
	                pizarra[i][j] = ' ';
	            }
	        }
	    }
	}

	public void cargarLetraU() {
	    for (int i = 0; i < filas; i++) {
	        for (int j = 0; j < columnas; j++) {
	            if (j == 0 || j == 6 || i == 6) {
	                pizarra[i][j] = 'U';
	            } else {
	                pizarra[i][j] = ' ';
	            }
	        }
	    }
	}

	public void cargarLetraY() {
	    for (int i = 0; i < filas; i++) {
	        for (int j = 0; j < columnas; j++) {
	            if (i < 4 && (i == j || i + j == 6)) {
	                pizarra[i][j] = 'Y';
	            } else if (i >= 4 && j == 3) {
	                pizarra[i][j] = 'Y';
	            } else {
	                pizarra[i][j] = ' ';
	            }
	        }
	    }
	}



public void cargarLetraL() {
    for (int i = 0; i < filas; i++) {
        for (int j = 0; j < columnas; j++) {
            if (j == 0 || i == 6) {
                pizarra[i][j] = 'L';
            } else {
                pizarra[i][j] = ' ';
            }
        }
    }
}

public void cargarLetraC() {
    for (int i = 0; i < filas; i++) {
        for (int j = 0; j < columnas; j++) {
            if (i == 0 || i == 6 || j == 0) {
                pizarra[i][j] = 'C';
            } else {
                pizarra[i][j] = ' ';
            }
        }
    }
}

public void cargarLetraO() {
    for (int i = 0; i < filas; i++) {
        for (int j = 0; j < columnas; j++) {
            if (i == 0 || i == 6 || j == 0 || j == 6) {
                pizarra[i][j] = 'O';
            } else {
                pizarra[i][j] = ' ';
            }
        }
     }
  }
}
 
	 
	 
	