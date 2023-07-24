const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

const motocicletas = [
    { id: 1, marca: "pulsar", cilindraje: 200, modelo: 2023, color: "rojo"},
    { id: 2, marca: "auteco", cilindraje: 150, modelo: 2021, color: "negro" },
    { id: 3, marca: "honda", cilindraje: 1200, modelo: 2019, color: "azul" },
];

app.get("/", (req, res) => {
    res.send("Hola señores, así es la creación de mi API");
});

app.get("/api/motocicleta", (req, res) => {
    res.send(motocicletas);
});

app.get("/api/motocicleta/:id", (req, res) => {
    const moto = motocicletas.find((e) => e.id === parseInt(req.params.id));
    if (!moto) 
        return res
        .status(404)
        .send("Motocicleta no encontrada en nuestra base de datos"); 
    else res.send(moto);    
}); 

// Crear motocicleta
app.post("/api/motocicleta", (req, res) => { 
    const nuevaMoto = {
        id: motocicletas.length + 1, 
        marca: req.body.marca, 
        cilindraje: req.body.cilindraje, 
        modelo: parseInt(req.body.modelo), 
        color: req.body.color,   
    };

    motocicletas.push(nuevaMoto);
    res.send(nuevaMoto);
});

app.put("/api/motocicleta/:id", (req, res) => {
    const motoIndex = motocicletas.findIndex((moto) => moto.id === parseInt(req.params.id));

    if (motoIndex !== -1) {
        const updatedMoto = {
            id: parseInt(req.params.id),
            marca: req.body.marca, 
            cilindraje: req.body.cilindraje, 
            modelo: parseInt(req.body.modelo), 
            color: req.body.color, 
            
        };
        motocicletas[motoIndex] = updatedMoto;
        res.send(updatedMoto);
    } else {
        res.status(404).send("Motocicleta no encontrada");
    }
});

// Eliminar motocicleta
app.delete("/api/motocicleta/:id", (req, res) => {
    const moto = motocicletas.find((m) => m.id === parseInt(req.params.id));
    if (!moto) return res.status(404).send("Motocicleta no encontrada"); 
    else res.send(moto);
    
    const index = motocicletas.indexOf(moto);
    motocicletas.splice(index, 1);
    res.send(moto); 
});

app.listen(port, () => console.log("Escuchando el puerto:", port));
