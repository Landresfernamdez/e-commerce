/**
 * Created by Andres on 10/4/2017.
 */
//Corroborates if an item exists in a list

var lista_deseos=[];//Global Wish List

//It is responsible for obtaining localstorage data

function GetFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
//It is responsible for giving value to the user's wish list in session

function obtenerPlistaDeseos() {
    var usuario=JSON.parse(sessionStorage.getItem("user"));
    //document.getElementById("username").value=usuario.nombre;
    var lista_p=GetFromLocalStorage("personas");
    for(var x=0;x<lista_p.length;x++){
        if(lista_p[x].nombre===usuario.nombre){
            lista_deseos=lista_p[x].lista_deseos;
            break;
        }
    }
}
obtenerPlistaDeseos();
//It checks to see if there is an item in the list

function existe(product,lista) {
    for(i in lista){
        if(lista[i].id===product.id){
            return true;
        }
    }
    return false;
}
//Adds a wish to the list

function AgregarFavorito(id) {
        var lista=JSON.parse(localStorage.getItem("productos"));
        var lista1=JSON.parse(localStorage.getItem("personas"));
        for(var i=0;i<lista.length;i++){
            if(lista[i].id===id){
                for(var x=0;x<lista1.length;x++){
                    if(lista1[x].nombre===usuario.nombre){
                        var l_temp=lista1[x].lista_deseos;
                        if(existe(lista[i],l_temp)){
                            lista_deseos=l_temp;
                            alertify.error("Ya existe este deseo");
                            return;
                        }else{
                                if(parseInt(lista[i].cantidad)>0){
                                    lista[i].cantidad=document.getElementById("cant").value;
                                    if(lista[i].cantidad!=""){
                                        l_temp.push(lista[i]);
                                        lista_deseos=l_temp;
                                        lista1[x].lista_deseos=l_temp;
                                        localStorage.removeItem("personas");
                                        localStorage.setItem("personas",AddToLocalStorage(lista1));
                                        alertify.success("Deseado");
                                        return;
                                    }
                                     else{
                                        alertify.error("Digite una cantidad a desear");
                                        return;
                                    }

                                }
                                else{
                                    alertify.error("El producto esta agotado")
                                }
                        }
                    }
                }
            }
        }
}
//It is responsible for generating the wish list

function genera_tabla_deseos() {
    $("#table_products_deseos").empty();
    // Crea las celdas
    var lista = lista_deseos;

    var hilera = document.createElement("tr");

    var celda1 = document.createElement("td");
    var textoCelda1 = document.createTextNode("Nombre");
    celda1.appendChild(textoCelda1);
    hilera.appendChild(celda1);
    var celda2 = document.createElement("td");
    var textoCelda2 = document.createTextNode("Img");
    celda2.appendChild(textoCelda2);
    hilera.appendChild(celda2);
    var celda3 = document.createElement("td");
    var textoCelda3 = document.createTextNode("Categoria");
    celda3.appendChild(textoCelda3);
    hilera.appendChild(celda3);
    var celda4 = document.createElement("td");
    var textoCelda4 = document.createTextNode("Descripcion");
    celda4.appendChild(textoCelda4);
    hilera.appendChild(celda4);
    var celda5 = document.createElement("td");
    var textoCelda5 = document.createTextNode("Precio");
    celda5.appendChild(textoCelda5);
    hilera.appendChild(celda5);
    var celda6 = document.createElement("td");
    var textoCelda6 = document.createTextNode("Cantidad");
    celda6.appendChild(textoCelda6);
    hilera.appendChild(celda6);

    var celda7 = document.createElement("td");
    var textoCelda7 = document.createTextNode("Eliminar");
    celda7.appendChild(textoCelda7);
    hilera.appendChild(celda7);
    var celda8 = document.createElement("td");
    var textoCelda8 = document.createTextNode("Agregar al carrito");
    celda8.appendChild(textoCelda8);
    hilera.appendChild(celda8);
    var celda9 = document.createElement("td");
    var textoCelda9 = document.createTextNode("Disponible");
    celda9.appendChild(textoCelda9);
    hilera.appendChild(celda9);

    // $("#myframe").contents().find("#table_products_deseos").append(hilera);
    $("#table_products_deseos").append(hilera);
    //Se encarga de cargar todas las filas a la tabla
    for (var i = 0; i < lista.length; i++) {
        var hilera = document.createElement("tr");
        for (var j = 0; j < 9; j++) {
            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            var celda = document.createElement("td");
            if (j == 0) {
                var textoCelda = document.createTextNode(lista[i].name);
                celda.appendChild(textoCelda);
            }
            if (j == 1) {
                var imgCelda = document.createElement("img");
                imgCelda.src = lista[i].src;
                imgCelda.width = 100;
                imgCelda.height = 100;
                celda.appendChild(imgCelda);
            }
            if (j == 2) {
                var textoCelda = document.createTextNode(lista[i].categoria);
                celda.appendChild(textoCelda);
            }
            if (j == 3) {
                var textoCelda = document.createTextNode(lista[i].descripcion);
                celda.appendChild(textoCelda);
            }
            if (j == 4) {
                var textoCelda = document.createTextNode(lista[i].precio);
                celda.appendChild(textoCelda);
            }
            if (j == 5) {
                var textoCelda = document.createTextNode(lista[i].cantidad);
                celda.appendChild(textoCelda);
            }
            if (j == 6) {

                var btn = document.createElement("BUTTON");        // Create a <button> element

                var classBtn = document.createAttribute("class");       // Create a "class" attribute
                classBtn.value = "btn btn-danger btn-xs";
                btn.setAttributeNode(classBtn);

                var ida = lista[i].id;

                var idBtn = document.createAttribute("id");       // Create a "class" attribute
                idBtn.value = ida;
                btn.setAttributeNode(idBtn);

                btn.setAttribute("onclick", "Eliminar_deseo(this.id)");

                var span = document.createElement("SPAN");       // Create a text node

                var classSpan = document.createAttribute("class");       // Create a "class" attribute
                classSpan.value = "glyphicon glyphicon-trash";
                span.setAttributeNode(classSpan);

                btn.appendChild(span);
                celda.appendChild(btn);
            }

            if (j == 7) {
                var btn = document.createElement("BUTTON");        // Create a <button> element

                var classBtn = document.createAttribute("class");       // Create a "class" attribute
                classBtn.value = "btn btn-danger btn-xs";
                btn.setAttributeNode(classBtn);

                var ida = lista[i].id;

                var idBtn = document.createAttribute("id");       // Create a "class" attribute
                idBtn.value = ida;
                btn.setAttributeNode(idBtn);

                btn.setAttribute("onclick", "Agregar_de_deseos_a_carrito(this.id)");

                var span = document.createElement("SPAN");       // Create a text node

                var classSpan = document.createAttribute("class");       // Create a "class" attribute
                classSpan.value = "glyphicon glyphicon-shopping-cart";
                span.setAttributeNode(classSpan);

                btn.appendChild(span);
                celda.appendChild(btn);
            }
            if(j==8){
                if(lista[i].cantidad>0){
                    var textoCelda = document.createTextNode("Si");
                }
                if(lista[i].cantidad<=0){
                    var textoCelda = document.createTextNode("No");
                }
                celda.appendChild(textoCelda);
            }
            hilera.appendChild(celda);
        }
        $("#table_products_deseos").append(hilera);
        //$("#myframe").contents().find("#table_products_deseos").append(hilera);
    }
}
//Eliminates a desire from the wish list

function Eliminar_deseo(id){
    var lista=GetFromLocalStorage("personas");
    for(var x=0;x<lista_deseos.length;x++){
        if(lista_deseos[x].id===id){
            if(x>-1){
                lista_deseos.splice(x, 1);
            }
        }
    }
    for(var x=0;x<lista.length;x++){
        if(lista[x].nombre===usuario.nombre){
            lista[x].lista_deseos=lista_deseos;
        }
    }
    localStorage.setItem("personas",AddToLocalStorage(lista));
    genera_tabla_deseos();
}
//Add an item to cart

function Agregar_de_deseos_a_carrito(id){
        obtenerPlistaDeseos();
        var deseo={};
        var lista=GetFromLocalStorage("personas");
        for(var x=0;x<lista_deseos.length;x++){
            if(lista_deseos[x].id===id){
                if(x>-1){
                    deseo=lista_deseos[x];
                    lista_deseos.splice(x, 1);
                }
            }
        }
        for(var x=0;x<lista.length;x++){
            if(lista[x].nombre===usuario.nombre){
                lista[x].lista_deseos=lista_deseos;
                if(existe(deseo,lista[x].carrito)){
                    alertify.error("El producto ya existe en el carrito");
                    return;
                }
                else{
                    lista[x].carrito.push(deseo);
                }
            }
        }
        localStorage.setItem("personas",AddToLocalStorage(lista));
        genera_tabla_deseos();
}