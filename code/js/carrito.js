


//It is responsible for obtaining localstorage data
function GetFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
//It is responsible for adding the localstorage data
function AddToLocalStorage(data){
    if (typeof data != "string") {data = JSON.stringify(data);}
    return data;
}
//It is responsible for generating the table in the modal of the shopping cart
function genera_tabla_carrito(){
            $("#table_products_ca").empty();
            var usuario=JSON.parse(sessionStorage.getItem("user"));

            var lista=GetFromLocalStorage("productos");
            var lista_p=GetFromLocalStorage("personas");
            var  carrito=[];
            for(var x=0;x<lista_p.length;x++){
                if(lista_p[x].nombre===usuario.nombre){
                    carrito=lista_p[x].carrito;
                }
            }
            if(carrito.length>0){
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

                $("#table_products_ca").append(hilera);
                //Se encarga de cargar todas las filas a la tabla
                var total=0;
                for(var i=0;i<carrito.length;i++){
                            var hilera = document.createElement("tr");
                            var totalAux=0;
                            for (var j = 0; j < 8; j++){
                                // Crea un elemento <td> y un nodo de texto, haz que el nodo de
                                // texto sea el contenido de <td>, ubica el elemento <td> al final
                                // de la hilera de la tabla
                                var celda = document.createElement("td");
                                if(j==0){
                                    var textoCelda = document.createTextNode(carrito[i].name);
                                    celda.appendChild(textoCelda);
                                }
                                if(j==1){
                                    var imgCelda =  document.createElement("img");
                                    imgCelda.src=carrito[i].src;
                                    imgCelda.width=100;
                                    imgCelda.height=100;
                                    celda.appendChild(imgCelda);
                                }if(j==2){
                                    var textoCelda = document.createTextNode(carrito[i].categoria);
                                    celda.appendChild(textoCelda);
                                }
                                if(j==3){
                                    var textoCelda = document.createTextNode(carrito[i].descripcion);
                                    celda.appendChild(textoCelda);
                                }
                                if(j==4){
                                    var textoCelda = document.createTextNode(carrito[i].precio);
                                    celda.appendChild(textoCelda);
                                    totalAux =totalAux+parseInt(carrito[i].precio) ;
                                }
                                if(j==5){
                                    var textoCelda = document.createTextNode(carrito[i].cantidad);
                                    celda.appendChild(textoCelda);
                                    total =total+totalAux*parseInt(carrito[i].cantidad) ;
                                }
                                if(j==6){
                                    var btn = document.createElement("BUTTON");        // Create a <button> element
            
                                    var classBtn = document.createAttribute("class");       // Create a "class" attribute
                                    classBtn.value ="btn btn-danger btn-xs";
                                    btn.setAttributeNode(classBtn);

            
                                    var idBtn = document.createAttribute("id");       // Create a "class" attribute
                                    idBtn.value =carrito[i].id;
                                    btn.setAttributeNode(idBtn);
                                    btn.setAttribute ("onclick","Eliminar_carrito(this.id)");

                                    var span = document.createElement("SPAN");       // Create a text node
                                    var classSpan = document.createAttribute("class");       // Create a "class" attribute
                                    classSpan.value ="glyphicon glyphicon-trash";
                                    span.setAttributeNode(classSpan);
                                    btn.appendChild(span);
                                    celda.appendChild(btn);
                                    
                                }
                                hilera.appendChild(celda);
                    }
                $("#table_products_ca").append(hilera);
                }

                var hilera = document.createElement("tr");
                var celda7 = document.createElement("td");
                var textoCelda7 =document.createTextNode("Total");
                celda7.appendChild(textoCelda7);
                hilera.appendChild(celda7);
                var celda7 = document.createElement("td");
                var textoCelda7 =document.createTextNode(" ");
                celda7.appendChild(textoCelda7);
                hilera.appendChild(celda7);
                var celda7 = document.createElement("td");
                var textoCelda7 =document.createTextNode(" ");
                celda7.appendChild(textoCelda7);
                hilera.appendChild(celda7);
                
                var celda7 = document.createElement("td");
                var textoCelda7 =document.createTextNode(" ");
                celda7.appendChild(textoCelda7);
                hilera.appendChild(celda7);

                var textoCelda = document.createTextNode(total);
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);             
                $("#table_products_ca").append(hilera);
                return;
            }

        }
        //This function is responsible for deleting the data of the shopping cart
function Eliminar_carrito(id){
            var usuario=JSON.parse(sessionStorage.getItem("user"));
            var carrito=[];
            var lista_p=GetFromLocalStorage("personas");
            for(var x=0;x<lista_p.length;x++){
                if(lista_p[x].nombre===usuario.nombre){
                    carrito=lista_p[x].carrito;
                }
            }
            for(var y=0; y<carrito.length; y++){
                if(carrito[y].id===id){
                    if(y>-1){
                        carrito.splice(y,1);
                    }
                }
            }
            for(var x=0;x<lista_p.length;x++){
                if(lista_p[x].nombre===usuario.nombre){
                    lista_p[x].carrito=carrito;
                }
            }
            localStorage.removeItem("personas");
            localStorage.setItem("personas",AddToLocalStorage(lista_p));
            genera_tabla_carrito();
        }
        //This function returns the total money invested in the products that are in the shopping cart
function devuelveTotal(carrito){
            var total=0;
            for(var x=0;x<carrito.length;x++){
                total=total+parseInt(carrito[x].precio);
            }
            return total;
}
//It is responsible for returning the quantity of items that are in the shopping cart and subtract the inventory items

function devuelveArticulos(carrito){
    var total=0;
    var lista_productos=JSON.parse(localStorage.getItem("productos"));
    var lista_personas=JSON.parse(localStorage.getItem("personas"));
    var usuario=JSON.parse(sessionStorage.getItem("user"));
    for(var x=0;x<carrito.length;x++){
        total=total+parseInt(carrito[x].cantidad);
        for(var y=0;y<lista_productos.length;y++){
            if(lista_productos[y].id===carrito[x].id){
                lista_productos[y].cantidad=parseInt(lista_productos[y].cantidad)-parseInt(carrito[x].cantidad);
                localStorage.setItem("productos",AddToLocalStorage(lista_productos));
                for(var i=0;i<lista_personas.length;i++){
                    if(lista_personas[i].nombre===usuario.nombre){
                        carrito.splice(x,1);
                        lista_personas[i].carrito=carrito;
                        localStorage.setItem("personas",AddToLocalStorage(lista_personas));
                    }
                }
            }
        }
    }
    return total;
}

//It is responsible for validating the card, with the user's cards

function validarTarjeta(cod,vencimiento,cod_s,listaTarjetas){
    for(var i=0; i<listaTarjetas.length; i++){
        if(listaTarjetas[i].cod_tarjeta===cod && listaTarjetas[i].fecha_vencimiento===vencimiento &&listaTarjetas[i].cod_seguridad===cod_s){
            var fechaTemp=listaTarjetas[i].fecha_vencimiento;
            var ano=parseInt(fechaTemp.substr(0,4));
            var mes=parseInt(fechaTemp.substr(5,7));
            var dia=parseInt(fechaTemp.substr(8,10));
            var fechaActualget = new Date();
            var ano1=fechaActualget.getFullYear();
            var mes1=fechaActualget.getMonth()+1;
            var dia1=fechaActualget.getDate();
            var fechaActual = new Date(ano1, mes1, dia1); //30 de noviembre de 2014
            var fechaVencimiento = new Date(ano, mes, dia); //30 de noviembre de 2014
            if(fechaActual > fechaVencimiento){
                alertify.error("Tarjeta vencida")
                return false;
            }
            if(fechaActual < fechaVencimiento){
                return true;
            }
        }
    }
    return false;
}
//It is in charge of validating the purchase that the data is consistent in addition to subtracting the items purchased from the inventory

//It is also responsible for keeping a record of the purchase in the user's shopping list by linking to it

function validarCompra(){
         var usuario=JSON.parse(sessionStorage.getItem("user"));
         var lista=JSON.parse(localStorage.getItem("personas"));
         for(var x=0;x<lista.length;x++){
             if(lista[x].nombre===usuario.nombre){
                 var cod=document.getElementById("cod_t_c").value;
                 var vencimiento=document.getElementById("fecha_t_c").value;
                 var cod_s=document.getElementById("cod_s").value;
                 if(validarTarjeta(cod,vencimiento,cod_s,lista[x].tarjetas)){
                        var total_compra=devuelveTotal(lista[x].carrito);
                        var can_articulos=devuelveArticulos(lista[x].carrito);
                        lista[x].compras.push({total:total_compra,cantidad:can_articulos});
                        localStorage.setItem("personas",AddToLocalStorage(lista));
                        alert("La compra se realizo con exito");
                        location.reload();
                        return;
                 }
                 else{
                     alertify.error("Datos inconsistentes");
                     return;
                 }
             }
         }
        }