/*class compradores {
    constructor(nombre,apellido,subastado,edad){
        this.nombre=nombre;
        this.apellido=apellido;
        this.subastado=subastado;
        this.edad=edad;
    }
}

let lista_compradores = [];

for(let i=0;i<2;i=i+1){
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

console.log(resultado_filter);*/

const subastaDiv = document.getElementById("subastas-div");
const precioSubasta = document.getElementById("precio-subasta");
const inputSubasta = document.getElementById("caja-input-subasta");
const botonSubastar = document.getElementById("btn-subastar");

botonSubastar.onclick = subastar;

function subastar(){
    if(inputSubasta.value>precioSubasta.innerHTML){        
        precioSubasta.innerHTML=inputSubasta.value;
    }else{
        alert("El precio ofertado debe ser mayor al precio actual");
    }
}

let lista_usuarios=[];



function set_info(){
    let nombre=document.getElementById("nombre_usuario");
    let mail= document.getElementById("mail_usuario");
    let telefono=document.getElementById("telefono_usuario");
    let usuario={nombre_del_usuario:nombre.value,
    mail_del_usuario:mail.value,
    telefono_del_usuario:telefono.value};
    lista_usuarios.push(usuario);
    let lista_json= JSON.stringify(lista_usuarios);
    localStorage.setItem("lista",lista_json);
    let recuperando= localStorage.getItem("lista");
    recuperando=JSON.parse(recuperando);

}

let boton=document.getElementById("btn-subastar");
mostrarCarrito();


boton.addEventListener("click",set_info);

const boton_compra= document.querySelectorAll(".botonCompra");


for(let i=0; i<boton_compra.length;i++){
      boton_compra[i].addEventListener("click",agregar_carrito)
}


function agregar_carrito(e){
    let listaCarrito=recuperarCarrito();
    let itemRepetido= false; /**Esta variable se usa cuando quiero comprar un item q ya esta en mi lista */

    let producto_2= e.target;
    let producto_1= producto_2.parentNode;
    let producto=producto_1.parentNode;

    let nombre_productos = producto_1.querySelector("h5").innerHTML;
    let precio_productos = producto_1.querySelector("span").innerHTML;
    let img_productos = producto.querySelector("img").src;
    const carritoEnPantalla = document.getElementById("tbody");

    let itemCarrito={  /** Es el mismo objeto pero le cambie el nombre para q sea mas facil */
        nombre: nombre_productos,
        precio: precio_productos,
        img: img_productos,
        cantidad:1
    };

    listaCarrito.forEach(producto => {  /** Recorro mi listaCarrito (Es la que esta en local storage) */
        if(itemCarrito.img==producto.img){ /**Pregunto si la imagen del item que va a comprar la persona es igual al producto que tengo guardado en el localstorage (es decir si ya existe en mi carrito) */
            producto.cantidad++ /** en caso de que exista, a ese producto dentro de mi localstorage le sumo 1  */
            itemRepetido=true; /**Como el item que quiere comprar esta repetido cambio el valor de la variable */
        }
    });

    if(!itemRepetido){ /**Si el item no esta repetido, entonces voy a agregarlo a mi lista que voy a guardar en mi local storage */
        listaCarrito.push(itemCarrito);    
    }
    
    guardarCarrito(listaCarrito);
    carritoEnPantalla.innerHTML="";
    mostrarCarrito(); /* LLamo a la funcion que muestra el carrito */

    
}

function mostrarCarrito(){  /*Le cambie el nombre a la funcion (antes era solo carrito), de esta manera se entiende mejor que hace esta funcion */
    let listaCarrito = recuperarCarrito();
    listaCarrito.forEach(producto =>{ /*para cada elemento de la lista voy a hacer lo siguiente */
        let precio_total = parseInt(producto.precio)*producto.cantidad;
        let fila = document.createElement("tr");
        fila.innerHTML = `<td><img class="carrito-img" src="${producto.img}"></td> 
                          <td>${producto.nombre}</td>
                          <td>${producto.cantidad}</td>
                          <td>${precio_total}</td>
                          <td><button class="boton-suma botones-carrito">+</button></td>
                          <td><button class="botones-carrito boton-resta">-</button></td>
                          <td><button class="btn btn-danger borrar_elemento">Borrar</button></td>
                         `;    /**En la linea 129 agregue un estilo para q la imagen se vea chico */
        let botonSuma= fila.querySelector(".boton-suma");
        let botonResta = fila.querySelector(".boton-resta")
        botonSuma.addEventListener("click", sumarRestarItems);
        botonResta.addEventListener("click", sumarRestarItems);
        let tabla = document.getElementById("tbody");
        tabla.append( fila );
    })

    const boton_borrar= document.querySelectorAll(".borrar_elemento"); /*me traigo los botones de borrar que acabo de crear */
    for(let i=0; i<boton_borrar.length;i++){ /* Les agrego la funcion */
        boton_borrar[i].addEventListener("click",borrarElemento)
    }
    return listaCarrito ;    
    
    const sumemos= document.querySelectorAll(".boton-suma");
    for(let i=0; i<sumemos.length;i++){
        sumemos[i].addEventListener("click",sumarElemento)
    }
}
function sumarElemento(e){
    let listaCarrito=recuperarCarrito();
    let suma= e.target.parentNode.parentNode.querySelector(".carrito-img").src;


    listaCarrito.forEach(producto => {  
        if(suma==producto.img){
            producto.cantidad++;
            
        }});
    guardarCarrito(listaCarrito);
    
    let botonPresionado = e.target;
    let columnaBotonPresionado = botonPresionado.parentNode;
    let fila = columnaBotonPresionado.parentNode;
    fila.innerHTML="";
}
function borrarElemento(e){
    let listaCarrito=recuperarCarrito();
    let imgParaBorrar= e.target.parentNode.parentNode.querySelector(".carrito-img").src;

    let pos=0;
    listaCarrito.forEach(producto => {  /** Recorro mi listaCarrito (Es la que esta en local storage) */
        if(imgParaBorrar==producto.img){ /**Pregunto si la imagen del item que va a comprar la persona es igual al producto que tengo guardado en el localstorage (es decir si ya existe en mi carrito) */
            listaCarrito.splice (pos,1);
        }
        pos++;
    });
    guardarCarrito(listaCarrito);
    
    let botonPresionado = e.target;
    let columnaBotonPresionado = botonPresionado.parentNode;
    let fila = columnaBotonPresionado.parentNode;
    fila.innerHTML="";
}



function recuperarCarrito(){
    let listaCarrito = JSON.parse(localStorage.getItem("listaCarrito")) || [];
    return listaCarrito;
}

function guardarCarrito(listaCarrito){
    let listaCarrito_json=JSON.stringify(listaCarrito);
    localStorage.setItem("listaCarrito",listaCarrito_json); /**Guardo mi lista, ya sea porque le agregue un item al carrito, o porque aumente el valor de algun producto que ya estaba dentro del carrito */

}

let finalizar_compra= document.getElementById("comprar");

finalizar_compra.addEventListener("click", function(){
    Toastify({
        text: "COMPRA EXITOSA",
        duration: 1000,
        style:{
           fontSize: "30px",
           color: "black",
           background: "lightgreen"
        }
        
    
    }).showToast();
});

function sumarRestarItems(e){
    let imgParaBorrar = e.target.parentNode.parentNode.querySelector("img").src;
    let listaCarrito = recuperarCarrito();
    let pos=0;
    if(e.target.classList.contains("boton-suma")){
        listaCarrito.forEach(producto => {  /** Recorro mi listaCarrito (Es la que esta en local storage) */
        if(imgParaBorrar==producto.img){ /**Pregunto si la imagen del item que va a comprar la persona es igual al producto que tengo guardado en el localstorage (es decir si ya existe en mi carrito) */
            producto.cantidad++;
        }
    });
    }else{
        listaCarrito.forEach(producto => {  /** Recorro mi listaCarrito (Es la que esta en local storage) */
        if(imgParaBorrar==producto.img){ /**Pregunto si la imagen del item que va a comprar la persona es igual al producto que tengo guardado en el localstorage (es decir si ya existe en mi carrito) */
           if(producto.cantidad>1){
               producto.cantidad--;
           }else{
            listaCarrito.splice (pos,1);
           }
        }
        pos++;
    });
    }
    const carritoEnPantalla = document.getElementById("tbody");
    guardarCarrito(listaCarrito);
    carritoEnPantalla.innerHTML="";
    mostrarCarrito();
}






