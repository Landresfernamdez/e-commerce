/**
 * Created by Andres on 9/26/2017.
 */
//It loads the products into the administrator view
$(function () {


    var categoria_temporal=localStorage.getItem("categoria");

    $("#categoria_prod").val(categoria_temporal);
    function genera_tabla(){
        // Crea las celdas
        var lista=JSON.parse(localStorage.getItem("productos"))

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
        var textoCelda8 = document.createTextNode("Modificar");
        celda8.appendChild(textoCelda8);
        hilera.appendChild(celda8);

        $("#table_products").append(hilera);
        //Se encarga de cargar todas las filas a la tabla
        for (var i = 0; i < lista.length; i++) {
            if(categoria_temporal==lista[i].categoria){
                var hilera = document.createElement("tr");
                for (var j = 0; j < 8; j++){
                    // Crea un elemento <td> y un nodo de texto, haz que el nodo de
                    // texto sea el contenido de <td>, ubica el elemento <td> al final
                    // de la hilera de la tabla
                    var celda = document.createElement("td");
                    if(j==0){
                        var textoCelda = document.createTextNode(lista[i].name);
                        celda.appendChild(textoCelda);
                    }
                    if(j==1){
                        var imgCelda =  document.createElement("img");
                        imgCelda.src=lista[i].src;
                        imgCelda.width=100;
                        imgCelda.height=100;
                        celda.appendChild(imgCelda);
                    }if(j==2){
                        var textoCelda = document.createTextNode(lista[i].descripcion);
                        celda.appendChild(textoCelda);
                    }
                    if(j==3){
                        var textoCelda = document.createTextNode(lista[i].categoria);
                        celda.appendChild(textoCelda);
                    }
                    if(j==4){
                        var textoCelda = document.createTextNode(lista[i].precio);
                        celda.appendChild(textoCelda);
                    }
                    if(j==5){
                        var textoCelda = document.createTextNode(lista[i].cantidad);
                        celda.appendChild(textoCelda);
                    }
                    if(j==6){
                        var btn = document.createElement("BUTTON");        // Create a <button> element

                        var classBtn = document.createAttribute("class");       // Create a "class" attribute
                        classBtn.value ="btn btn-danger btn-xs";
                        btn.setAttributeNode(classBtn);

                        var ida=lista[i].id;

                        var idBtn = document.createAttribute("id");       // Create a "class" attribute
                        idBtn.value =ida;
                        btn.setAttributeNode(idBtn);

                        btn.setAttribute ("onclick", "Eliminar(this.id)");

                        var span = document.createElement("SPAN");       // Create a text node

                        var classSpan = document.createAttribute("class");       // Create a "class" attribute
                        classSpan.value ="glyphicon glyphicon-trash";
                        span.setAttributeNode(classSpan);

                        btn.appendChild(span);
                        celda.appendChild(btn);

                    }
                    if(j==7){
                        var btn = document.createElement("BUTTON");        // Create a <button> element
                        var classBtn = document.createAttribute("class");       // Create a "class" attribute
                        classBtn.value ="btn btn-primary btn-xs";
                        btn.setAttributeNode(classBtn);

                        var id=lista[i].id;

                        var idBtn = document.createAttribute("id");       // Create a "class" attribute
                        idBtn.value =id;
                        btn.setAttributeNode(idBtn);


                        btn.setAttribute ("onclick", "Modificar(this.id)");

                        var span = document.createElement("SPAN");       // Create a text node
                        var classSpan = document.createAttribute("class");       // Create a "class" attribute
                        classSpan.value ="glyphicon glyphicon-pencil";
                        span.setAttribute("data-title","update");
                        span.setAttribute("data-toggle","modal");
                        span.setAttribute("data-target","#update");
                        span.setAttributeNode(classSpan);
                        btn.appendChild(span);
                        celda.appendChild(btn);
                    }
                    hilera.appendChild(celda);
                }
            }
            $("#table_products").append(hilera);
        }
    }
    genera_tabla();
    $("#categoria_prod").change(function(){
        localStorage.setItem("categoria",$(this).val());
        window.location.href =('../views/administrador.html');
    });
});
function salir() {
    window.location.href="../index.html";
}