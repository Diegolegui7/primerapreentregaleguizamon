/*let moneda="";
let monto="";
while(moneda != "salir"){
    moneda= prompt ("¿dolar, pesos o salir?");
    if (moneda != "salir"){
    monto= prompt ("ingrese su monto: ");
    calcular_precios(monto);
    }
}*/

/*function calcular_precios (monto){
    if(monto>0 && moneda =="pesos"){
        precio1= monto / 315;
        console.log("su monto es:",monto);
        console.log("el precio de la pintura es de:",precio1);   
        }
        else if (monto>0 && moneda=="dolar"){
        precio2= monto *315;
        console.log("su monto es:",monto);
        console.log("el precio de la pintura es de:",precio2);  
     }
}*/

class compradores {
    constructor(nombre,apellido,subastado,edad){
        this.nombre=nombre;
        this.apellido=apellido;
        this.subastado=subastado;
        this.edad=edad;
    }
}

let lista_compradores = [];

for(let i=0;i<3;i=i+1){
    let nombre= prompt("ingrese su nombre");
    let apellido=prompt("ingrese apellido");
    let subastado=prompt("¿desea comprar una pintura, una escultura o una fotografia?")
    let edad=prompt("ponga su edad:")

    let nuevo_comprador = new compradores(nombre,apellido,subastado,edad);
    lista_compradores.push (nuevo_comprador);
}

console.log(lista_compradores);

function mayor_edad (compradores){
   
    return compradores.edad >=18;
}
lista_compradores.forEach (compradores =>{
    if (mayor_edad(compradores)){
        console.log("mayor de edad")
    }
})

let resultado_filter = lista_compradores.filter (mayor_edad);

console.log(resultado_filter);