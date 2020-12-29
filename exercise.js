/* 
    Clases usadas
*/

class Vehiculo{
    constructor(marca, modelo, precio){
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
    }
}

class Automovil extends Vehiculo{
    constructor({marca, modelo, precio, puertas}){
        super(marca, modelo, precio);
        this.puertas = puertas;
    }
}

class Moto extends Vehiculo{
    constructor({marca, modelo, precio, cilindrada}){
        super(marca, modelo, precio);
        this.cilindrada = cilindrada;
    }
}

/* 
    Inicio del programa
*/
const data = require('./data');

let vehiculos = cargarVehiculos(data);
vehiculos.forEach(vehiculo => mostrarVehiculo(vehiculo));
br();
const mayorValor = masCaro(vehiculos);
console.log(`Vehiculo mas caro: ${mayorValor.marca} ${mayorValor.modelo}`);
const menorValor = masBarato(vehiculos);
console.log(`Vehiculo mas barato: ${menorValor.marca} ${menorValor.modelo}`);
const {marca, modelo, precio} = contieneString(vehiculos, "Y");
console.log(`Vehiculo que contiene en el modelo la letra "Y": ${marca} ${modelo} $${precio}`);
br();
vehiculos = ordenarPorPrecio(vehiculos);
console.log("Vehiculos ordenados por precio de mayor a menor:");
vehiculos.forEach(vehiculo => {
    const {marca, modelo} = vehiculo;
    console.log(marca, modelo);
});



/* 
    Funciones
*/
//Carga inicial de los vehiculos
function cargarVehiculos(listaVehiculos){
    let newLista = [];
    listaVehiculos.forEach(vehiculo => {
        if(vehiculo.puertas){
            const auto = new Automovil(vehiculo);
            newLista.push(auto);
        }else if(vehiculo.cilindrada){
            const moto = new Moto(vehiculo);
            newLista.push(moto);
        }
    });
    return newLista;
}
//Formateado de como mostrar los datos completos de un vehiculo
function mostrarVehiculo(vehiculo){
    const {marca, precio, modelo} = vehiculo;
    console.log(`Marca: ${marca} // Modelo: ${modelo} // ${vehiculo.puertas ? `Puertas: ${vehiculo.puertas}` : `Cilindrada: ${vehiculo.cilindrada}`} // Precio: $${precio}`);
}
//Line break en consola
function br(){
    console.log("=============================");
}
//Devuelve el vehiculo mas caro de la lista
function masCaro(listaVehiculos){
    let mayorPrecio = listaVehiculos[0];
    for(let i = 1; i < listaVehiculos.length; i++){
        if(mayorPrecio.precio < listaVehiculos[i].precio) mayorPrecio = listaVehiculos[i];
    }
    return mayorPrecio;
}
//Devuelve el vehiculo mas barato de la lista
function masBarato(listaVehiculos){
    let menorPrecio = listaVehiculos[0];
    for(let i = 1; i < listaVehiculos.length; i++){
        if(menorPrecio.precio > listaVehiculos[i].precio) menorPrecio = listaVehiculos[i];
    }
    return menorPrecio;
}
//Busca un string en el modelo los vehiculos, al primero que encuentra lo devuelve
function contieneString(listaVehiculos, string){
    for(let i = 0; i < listaVehiculos.length; i++){
        const {modelo} = listaVehiculos[i];
        if(modelo.includes(string)) return listaVehiculos[i];
    }
}
//Devuelve la misma lista pero ordenada por precios de mayor a menor
function ordenarPorPrecio(listaVehiculos){
    for(let i = 0; i < (listaVehiculos.length - 1); i++){
        for(let j = (i+1); j < listaVehiculos.length; j++){
            if(listaVehiculos[i].precio < listaVehiculos[j].precio){
                const aux = listaVehiculos[i];
                listaVehiculos[i] = listaVehiculos[j];
                listaVehiculos[j] = aux;
            }
        }
    }
    return listaVehiculos;
}