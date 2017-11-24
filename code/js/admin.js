/**
 * Created by Andres on 9/25/2017.
             */

            var temporal="";
            //This is the structure of one product
            var selected_index=-1;
            //This function is responsible for loading the image of the product to the input file
            function handleFileSelect(evt){
                var files = evt.target.files; // FileList object

                // Loop through the FileList and render image files as thumbnails.
                for (var i = 0, f; f = files[i]; i++) {

                    // Only process image files.
                    if (!f.type.match('image.*')){
                        continue;
                    }
                    var reader = new FileReader();

                    // Closure to capture the file information.
                    reader.onload = (function(theFile){
                        return function(e){
                            // Render thumbnail.
                            var span = document.createElement('span');
                            span.innerHTML = ['<img class="thumb" id=id_img src="', e.target.result,
                                '" title="', escape(theFile.name), '"/>'].join('');
                            document.getElementById('list').insertBefore(span, null);
                            document.getElementById('list_m').insertBefore(span, null);
                            temporal=theFile.name;
                        };
                    })(f);
                    // Read in the image file as a data URL.
                    reader.readAsDataURL(f);
                }

            }
            document.getElementById('files').addEventListener('change', handleFileSelect, false);
            document.getElementById('files_m').addEventListener('change', handleFileSelect, false);
            //Used to add objects to the localstorage with string format
            function AddToLocalStorage(data) {
                if (typeof data != "string") {data = JSON.stringify(data);}
                return data;
            }
            //Used to obtain localstorage objects
            function GetFromLocalStorage(key) {
                return JSON.parse(localStorage.getItem(key));
            }
            //Class representing a product
            var producto=function(i,n,s,c,d,p,cd){
                    this.id=i,
                    this.name= n,
                    this.src= s,
                    this.categoria= c,
                    this.descripcion= d,
                    this.precio= p,
                    this.cantidad=cd
            }
            //Corroborates if an item exists in a list
            function existe(product,lista) {
                for(i in lista){
                    if(lista[i].name===product.name){
                        return true;
                    }
                }
                return false;
            }
            //It is responsible for loading data

            function Modificar(id){
                selected_index=id;
                var lista=GetFromLocalStorage("productos");
                document.getElementById("nombre_producto_m").value=lista[id].name;
                document.getElementById("precio_producto_m").value=lista[id].precio;
                document.getElementById("descripcion_producto_m").value=lista[id].descripcion;
                document.getElementById("cantidad_producto_m").value=lista[id].cantidad;
                document.getElementById("categoria_producto_m").value=lista[id].categoria;
                document.getElementById("img_anterior_m").innerHTML="Esta es la ruta anterior: "+lista[id].src;
            }
            //Modify a user in the list of people

            function Modifica(){
                    var lista=GetFromLocalStorage("productos");
                    for(var x=0;x<lista.length;x++){
                        alert(selected_index);
                        if(x==selected_index){
                            alert("entro");
                            lista[x].name=document.getElementById("nombre_producto_m").value;
                            lista[x].precio=document.getElementById("precio_producto_m").value;
                            lista[x].descripcion=document.getElementById("descripcion_producto_m").value;
                            lista[x].categoria=document.getElementById("categoria_producto_m").value;
                            if(temporal!=""){
                                lista[x].src="../imgCharge/"+temporal;
                            }
                            lista[x].cantidad=document.getElementById("cantidad_producto_m").value;
                        }
                    }
                    localStorage.removeItem("productos");
                    localStorage.setItem("productos",AddToLocalStorage(lista));
                    window.location.href =('../views/administrador.html');
            }
            //It removes from the list of products
            function Eliminar(id){
                var lista=GetFromLocalStorage("productos");
                for(var x=0;x<lista.length;x++){
                    if(lista[x].id===id){
                        if(x>-1){
                            lista.splice(x, 1);
                        }
                    }
                }
                for(var i=0;i<lista.length;i++){
                        lista[i].id=""+i;
                }
                localStorage.setItem("productos",AddToLocalStorage(lista));
                window.location.href =('../views/administrador.html');
            }
            //It is responsible for adding to the list of products
            function  addProduct(){
                    var id;
                    var name=document.getElementById("nombre_producto").value;
                    var src="../imgCharge/"+temporal;
                    console.log(src);
                    var categoria=document.getElementById("categoria_producto").value;
                    var descripcion=document.getElementById("descripcion_producto").value;
                    var precio=document.getElementById("precio_producto").value;
                    var cantidad=document.getElementById("cantidad_producto").value;
                    var lista_productos_temporal;
                    lista_productos_temporal=JSON.parse(localStorage.getItem("productos"));
                    id=lista_productos_temporal.length;

                    product=new producto(id,name,src,categoria,descripcion,precio,cantidad);
                    if(existe(product,lista_productos_temporal)){
                        alert("El producto ya existe");
                    }else{
                        lista_productos_temporal.push(product);
                        for(var i=0;i<lista_productos_temporal.length;i++){
                            lista_productos_temporal[i].id=""+i;
                        }
                        localStorage.removeItem("productos");
                        localStorage.setItem("productos",AddToLocalStorage(lista_productos_temporal));
                        alert("El producto se agrego con exito");
                        window.location.href =('../views/administrador.html');
                    }
            }

//create new table to get consults
function t_consultas(nombre,cant){

    $("#tabla_consultas").empty();
    var hilera = document.createElement("tr");

    var celda1 = document.createElement("td");
    var textoCelda1 = document.createTextNode("Nombre");
    celda1.appendChild(textoCelda1);
    hilera.appendChild(celda1);
    var celda2 = document.createElement("td");
    var textoCelda2 = document.createTextNode("Cantidad");
    celda2.appendChild(textoCelda2);
    hilera.appendChild(celda2);
    $("#tabla_consultas").append(hilera);
    var hilera2 = document.createElement("tr");

    var celda = document.createElement("td");
    var textoCelda = document.createTextNode(nombre);
    celda.appendChild(textoCelda);
    hilera2.appendChild(celda);
    var celda3 = document.createElement("td");
    var textoCelda = document.createTextNode(cant);
    celda3.appendChild(textoCelda);
    hilera2.appendChild(celda3);
    $("#tabla_consultas").append(hilera2);

}


//Function to obtain the buyer with lower and greater products obtained
function comprador_mayor_menor(x){
    lista=GetFromLocalStorage("personas");
    var compradorM=null;
    var cant=0;
    var cantAux=0;
    for(var i=0; i<lista.length;i++){
        if (lista[i].tipo=='c'){
            if(lista[i].compras.length>0){
                if(compradorM==null){
                    compradorM=lista[i]
                    for(var j=0; j<lista[i].compras.length; j++){
                        cant=cant+parseInt(lista[i].compras[j].cantidad);
                    }
                }
                else{
                    cantAux=0;
                    for(var j=0; j<lista[i].compras.length; j++){
                        cantAux=cantAux+parseInt(lista[i].compras[j].cantidad);
                    }
                    if(cantAux>cant & x==0){
                        cant=parseInt(cantAux);
                        compradorM=lista[i];
                    }
                    if(cantAux<cant & x==1){
                        cant=parseInt(cantAux);
                        compradorM=lista[i];
                    }
                }
            }
        }
    }
    t_consultas(compradorM.nombre,cant);
}


//Function to get the buyer with the most and least amount spent
function comprador_mayor_menor_dinero(x){

    lista=GetFromLocalStorage("personas");
    var compradorM=null;
    var cant=0;
    var cantAux=0;
    for(var i=0; i<lista.length;i++){
        if (lista[i].tipo=='c'){
            if(lista[i].compras.length>0){
                if(compradorM==null){
                    compradorM=lista[i]
                    for(var j=0; j<lista[i].compras.length; j++){
                        cant=cant+parseInt(lista[i].compras[j].total);
                    }
                }
                else{
                    cantAux=0;
                    for(var j=0; j<lista[i].compras.length; j++){
                        cantAux=cantAux+parseInt(lista[i].compras[j].total);
                    }
                    if(cantAux>cant & x==0){
                        cant=parseInt(cantAux);
                        compradorM=lista[i];
                    }
                    if(cantAux<cant & x==1){
                        cant=parseInt(cantAux);
                        compradorM=lista[i];
                    }
                }
            }
        }
    }
    t_consultas(compradorM.nombre,cant);
}


$("#consultas_admi").change(function(){

    if( $(this).val()=="Persona con más compras"){
        comprador_mayor_menor(0);
    }
    if( $(this).val()=="Persona con menos compras"){
        comprador_mayor_menor(1);
    }
    if( $(this).val()=="Persona con mayor dinero invertido"){
        comprador_mayor_menor_dinero(0);
    }
    if( $(this).val()=="Persona con menos dinero invertido"){
        comprador_mayor_menor_dinero(1);
    }

});