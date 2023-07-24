function generarTablaMotocicletas() {
    const tbody = document.getElementById("tbody-motocicletas");
    
    fetch("http://localhost:3030/api/motocicleta")
        .then(response => response.json())
        .then(motocicletas => {
            motocicletas.forEach(function (motocicletas) {
                const fila = tbody.insertRow();
                const celdaId = fila.insertCell();
                const celdaMarca = fila.insertCell();
                const celdaCilindraje = fila.insertCell();
                const celdaModelo = fila.insertCell();
                const celdaColor = fila.insertCell();

                celdaId.textContent = motocicletas.id;
                celdaMarca.textContent = motocicletas.marca;
                celdaCilindraje.textContent = motocicletas.cilindraje;
                celdaModelo.textContent = motocicletas.modelo;
                celdaColor.textContent = motocicletas.color;
    
            });
        });
    }
generarTablaMotocicletas();