/**
 * Created by Andres on 9/25/2017.
 */

// this function converts JSON into string to be entered into localStorage
function AddToLocalStorage(data) {
    if (typeof data != "string") {data = JSON.stringify(data);}
    return data;
}
// this function gets string from localStorage and converts it into JSON

function GetFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
//List of default people
var personas=[
    {
        tipo:"a",
        id:"1",
        nombre:"Andres",
        edad:"21",
        pass:"12345"
    },
    {
        tipo:"c",
        activo:"0",
        id:"2",
        nombre:"Yerlin",
        apellido1:"Ramirez",
        apellido2:"Chavarria",
        edad:"21",
        email:"landresf12@gmail.com",
        direccion:"Balboa",
        telefono:"86374844",
        targetas:[{cod_tarjeta:"0",cod_seguridad:"0",fecha_vencimiento:"10/02/2018"}],
        pass:"12345",
        lista_deseos:[],
        carrito:[],
        compras:[{total:1000000000000000, cantidad:300},{total:10, cantidad:3} ]
    },
    {
        tipo:"c",
        activo:"0",
        id:"3",
        nombre:"Jurguen",
        apellido1:"Romero",
        apellido2:"Rodriguez",
        edad:"21",
        email:"r.r@gmail.com",
        direccion:"",
        telefono:"",
        tarjetas:[{cod_tarjeta:"0",cod_seguridad:"0",fecha_vencimiento:"2018-10-02"}],
        pass:"12345",
        lista_deseos:[],
        carrito:[],
        compras:[{total:1000, cantidad:400},{total:10, cantidad:3}]
    }
]
//Valid if the list of people has been created with this does not overwrite it

if(GetFromLocalStorage("personas")===null){
    localStorage.setItem("personas",AddToLocalStorage(personas));
}
//list of products by default

var productos=[
    {
        id:"0",
        name: "Peperoni",
        src: "../img/productos/peperoni.jpg",
        categoria:"Pizzas medianas",
        descripcion:"deliciosa",
        precio:"6500",
        cantidad:1000//Osea que existen engredientes para poder hacer 10 pizzas
    },
    {
        id:"1",
        name: "Hawaiana",
        src:"../img/productos/hawaiana_p.jpg",
        categoria: "Pizzas pequeñas",
        descripcion:"deliciosa",
        precio: "4500",
        cantidad:1000

    },
    {
        id:"2",
        name: "Hawaiana",
        src:"../img/productos/hawaiana.jpg",
        categoria: "Pizzas personales",
        descripcion:"deliciosa",
        precio: "2000",
        cantidad:1000

    },
    {
        id:"3",
        name: "Hawaiana",
        src:"../img/productos/hawaiana_p.jpg",
        categoria: "Pizzas personales",
        descripcion:"deliciosa",
        precio: "2000",
        cantidad:1000

    }
    ,
    {
        id:"4",
        name: "Jamon y queso",
        src:"../img/productos/jamon.jpg",
        categoria: "Pizzas medianas",
        descripcion:"deliciosa",
        precio: "5000",
        cantidad:1000

    }
    ,
    {
        id:"5",
        name: "Jamon y queso",
        src:"../img/productos/jamonqueso.jpg",
        categoria: "Pizzas personales",
        descripcion:"deliciosa",
        precio: "2500",
        cantidad:1000

    }
    ,
    {
        id:"6",
        name: "Batido de mora",
        src:"../img/productos/batido_mora.jpg",
        categoria: "Batidos",
        descripcion:"Saludable",
        precio: "1500",
        cantidad:1000
    }

    ,
    {
        id:"7",
        name: "Batido de cas",
        src:"../img/productos/batido_cas.jpg",
        categoria: "Batidos",
        descripcion:"Saludable",
        precio: "1500",
        cantidad:1000
    }
    ,
    {
        id:"8",
        name: "Fanta",
        src:"../img/productos/fanta.jpg",
        categoria: "Gaseosas",
        descripcion:"Refrescante",
        precio: "1500",
        cantidad:1000
    }
    ,
    {
        id:"9",
        name: "Suprema",
        src:"../img/productos/pizza_p_suprema.jpg",
        categoria: "Pizzas grandes",
        descripcion:"deliciosa",
        precio: "12000",
        cantidad:1000
    }
]
//Validate if the list of products has been created with this does not overwrite it

if(GetFromLocalStorage("productos")==null){
    localStorage.setItem("productos",AddToLocalStorage(productos));
}
//They save the selected category by one of the two users with this load only the elements of that category in the view

localStorage.setItem("categoria","Pizzas pequeñas");
localStorage.setItem("categoria_c","Pizzas pequeñas");
//It verifies if the user has already been created

if(GetFromLocalStorage("user")===null){
        localStorage.setItem("user",AddToLocalStorage({nombre:"",pass:""}))
}
//It verifies if the flag has already been created

if(GetFromLocalStorage("bandera")===null){
    localStorage.setItem("bandera","0");
}