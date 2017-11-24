/**
 * Created by Andres on 10/3/2017.
 */
//Charges the product cart

$(document).ready(function(){
    function GetFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }
    var lista=GetFromLocalStorage("productos");
    var categoria_temporal=localStorage.getItem("categoria_c");
    $("#categoria_prod_c").val(categoria_temporal);
    for(var i=0 ; i< lista.length ; i++){
        if(categoria_temporal==lista[i].categoria){
            var cantidad=lista[i].cantidad;
            $('<div class="item">' +
                '<img style="margin-left: 40% "height="200px" width="200px" src="'+lista[i].src+'">' +
                '<p style="margin-left: 40% ">'+'<b>'+"Nombre:"+'</b>'+lista[i].name+'<p/>'+
                '<p style="margin-left: 40% ">'+'<b>'+"Categoria:"+'</b>'+lista[i].categoria+'<p/>'+
                '<p style="margin-left: 40% ">'+'<b>'+"Descripcion:"+'</b>'+lista[i].descripcion+'<p/>'+
                '<p style="margin-left: 40% ">'+'<b>'+"Precio:"+'</b>'+lista[i].precio+'<p/>'+
                '<p style="margin-left: 40% ">'+'<b>'+"Cantidad:"+'</b>'+lista[i].cantidad+'<p/>'+
                '<button  onclick="AgregarFavorito(this.id)" id='+lista[i].id+' style="margin-left: 40%"><i  class="large material-icons" >favorite</i></button>'  +
                '<button onclick="agregar_a_carrito(this.id)" id='+lista[i].id+'><i  class="large material-icons" >add_shopping_cart</i></button>'  +
                '<input id="cant" type="number" name="quantity" min="1" max='+lista[i].cantidad+ '>'+
                '<div class="carousel-caption"> </div>').appendTo('.carousel-inner');
            $('<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators')
        }
    }
    $('.item').first().addClass('active');
    $('.carousel-indicators > li').first().addClass('active');
    $('#carousel-example-generic').carousel();


    $("#categoria_prod_c").change(function(){
        localStorage.setItem("categoria_c",$(this).val());
        window.location.href =('../views/cliente.html');
    });
});

//It is responsible for obtaining localstorage data

function GetFromLocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
}

//It is responsible for adding localstorage data

function AddToLocalStorage(data) {
    if (typeof data != "string") {data = JSON.stringify(data);}
    return data;
}
//Get the data in session
var usuario=JSON.parse(sessionStorage.getItem("user"));
//add to cart Confirm that you do not add the same products



//Validate if there is a product in the list
function existe(product,lista) {
    for(i in lista){
        if(lista[i].id===product.id){
            return true;
        }
    }
    return false;
}
//Add to cart
function agregar_a_carrito(id,cant){
    var cant=document.getElementById("cant").value;
    var lista=GetFromLocalStorage("productos");
    var bandera=true;
    for (var i=0;i<lista.length;i++){
        if(lista[i].id===id){
                if(cant!=""){
                    if(lista[i].cantidad>0){
                            var lista_u=GetFromLocalStorage("personas");
                            for(var x=0;x<lista_u.length;x++){
                                if(lista_u[x].nombre===usuario.nombre){
                                        var carrito=lista_u[x].carrito;
                                        if(existe(lista[i],carrito)){
                                            alertify.error("Este objeto ya esta agregado en el carrito");
                                            return;
                                        }else{
                                            lista[i].cantidad=cant;
                                            carrito.push(lista[i]);
                                            lista_u[x].carrito=carrito;
                                            localStorage.setItem("personas", AddToLocalStorage(lista_u));
                                            alertify.success("Se agrego con exito");
                                            return;
                                        }
                                }
                            }
                        }
                        else{
                            alertify.error("Producto agotado");
                        }
                            }
                    else{
                       alertify.error("Necesita definir la cantidad");
                        }
                            }
        }

}
