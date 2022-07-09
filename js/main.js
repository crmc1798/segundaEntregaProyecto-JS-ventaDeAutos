class Auto {
    constructor(marca, modelo, ano, kilometraje, precio) {
        this.marca = marca;                 //Nissan               
        this.modelo = modelo;               //GTR             
        this.ano = ano;                     //2002
        this.kilometraje = kilometraje;     //100000
        this.precio = precio;               //1000000
    }
}
let arregloAutos = [];

document.getElementById("formulario-alta").addEventListener("submit", agregarAuto);

function agregarAuto(e) {
    e.preventDefault();
    let marcaA = document.getElementById("Marca").value;
    let modeloA = document.getElementById("Modelo").value;
    let anoA = document.getElementById("Ano").value;
    let kilometrajeA = document.getElementById("Kilometraje").value;
    let precioA = document.getElementById("Precio").value;
    let arregloAutos = new Auto(marcaA, modeloA, anoA, kilometrajeA, precioA);

    let arregloAutosJSON = JSON.parse(localStorage.getItem("arregloAutos"));

    if (arregloAutosJSON == null) {
        localStorage.setItem("arregloAutos", JSON.stringify([arregloAutos]));
        console.log("vacio");
        mostrarAutos([arregloAutos]);
    } else {
        arregloAutosJSON.push(arregloAutos);
        localStorage.setItem("arregloAutos", JSON.stringify(arregloAutosJSON));
        mostrarAutos(arregloAutosJSON);
    }
    e.target.reset();
}


function mostrarAutos(arregloAutosJSON) {
    let listadoDeAutos = document.getElementById("listadoDeAutos");
    listadoDeAutos.innerHTML = "";
    //  [{el señor de los anillos},{matrix}]
    arregloAutosJSON.forEach(auto => {
        let li = document.createElement("li");
        li.innerHTML = `
       <hr> Marca: ${auto.marca} - Modelo: ${auto.modelo} - Año: ${auto.ano} - Kilometraje: ${auto.kilometraje} - Precio: ${auto.precio}       `;
        const botonBorrar = document.createElement("button");
        botonBorrar.innerText = "Borrar";
        botonBorrar.addEventListener("click", () => {
            eliminarAuto(auto);
        })
        li.appendChild(botonBorrar);
        listadoDeAutos.appendChild(li);
    });
}

function eliminarAuto(auto) {
    console.log(auto);
    const arregloAutosJSON = JSON.parse(localStorage.getItem("arregloAutos"));
    const nuevoArray = arregloAutosJSON.filter(item => item.marca != auto.marca);
    localStorage.setItem("arregloAutos", JSON.stringify(nuevoArray));
    mostrarAutos(nuevoArray);
  }