/**
 * Created by Andres on 10/3/2017.
 */
//Recover user in session

var usuario=JSON.parse(sessionStorage.getItem("user"));
//It is responsible for recovering the user with all the data in the list of people

function RecuperarUsuario(){
    var usuario=JSON.parse(sessionStorage.getItem("user"));
    var lista=JSON.parse(localStorage.getItem("personas"));
    for(var i=0;i<lista.length;i++){
        if(lista[i].nombre===usuario.nombre){
            return lista[i];
        }
    }
    return null;
}
//It is responsible for obtaining from the localstorage

function GetFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

//It is responsible for adding data to the localstorage

function AddToLocalStorage(data) {
    if (typeof data != "string") {data = JSON.stringify(data);}
    return data;
}
//It is responsible for loading user data to modify

function cargarDatosUsuario(){
    var data=RecuperarUsuario();//Datos del usuario
    document.getElementById("name_c_c").value=data.nombre;
    document.getElementById("apellido1_c_c").value=data.apellido1;
    document.getElementById("apellido2_c_c").value=data.apellido2;
    document.getElementById("edad_c").value=data.edad;
    document.getElementById("email_c").value=data.email;
    document.getElementById("direccion_c").value=data.direccion;
    document.getElementById("telefono_c").value=data.telefono;
}//Class representing a client

var cliente=function(t,a,i,n,a1,a2,e,em,d,te,ta,p,l){
        this.tipo=t,
        this.activo= a,
        this.id= i,
        this.nombre= n,
        this.apellido1= a1,
        this.apellido2= a2,
        this.edad= e,
        this.email= em,
        this.direccion= d,
        this.telefono= te,
        this.tarjetas= ta,
        this.pass= p,
        this.lista_deseos=l
}

function AddTarjeta(){

    var cod=document.getElementById("num_tarjeta_c").value;
    var fecha=document.getElementById("fecha_expira_c").value;
    var cod_s=document.getElementById("cod_s_s").value;

    var lista=GetFromLocalStorage("personas");
    for(var x=0;x<lista.length;x++){
        if(lista[x].nombre===usuario.nombre){
            lista[x].tarjetas.push({cod_tarjeta:cod,cod_seguridad:cod_s,fecha_vencimiento:fecha});
        }
    }
    localStorage.removeItem("personas");
    localStorage.setItem("personas",AddToLocalStorage(lista));
    alertify.success("Se actualizaron los datos con exito");
}
//Function to modify the user

function ModificarUser(){
    var name= document.getElementById("name_c_c").value;
    var apellido1=document.getElementById("apellido1_c_c").value;
    var apellido2=document.getElementById("apellido2_c_c").value;
    var edad=document.getElementById("edad_c").value;
    var email=document.getElementById("email_c").value;
    var direccion=document.getElementById("direccion_c").value;
    var telefono=document.getElementById("telefono_c").value;
    var pass=document.getElementById("pass_c_c").value;
    var estado=document.getElementById("estado").value;


    var cod=document.getElementById("num_tarjeta_c").value;
    var fecha=document.getElementById("fecha_expira_c").value;
    var cod_s=document.getElementById("cod_s_s").value;

    var lista=GetFromLocalStorage("personas");
    for(var x=0;x<lista.length;x++){
        if(lista[x].nombre===usuario.nombre){
            lista[x].nombre=name;
            lista[x].apellido1=apellido1;
            lista[x].apellido2=apellido2;
            lista[x].edad=edad;
            lista[x].email=email;
            lista[x].direccion=direccion;
            lista[x].telefono=telefono;
            lista[x].pass=pass;
            lista[x].tarjetas.push({cod_tarjeta:cod,cod_seguridad:cod_s,fecha_vencimiento:fecha});
            lista[x].activo=estado;
        }
    }
    localStorage.removeItem("personas");
    localStorage.setItem("personas",AddToLocalStorage(lista));
    alertify.success("Se actualizaron los datos con exito");

}
function salir() {
    window.location.href="../index.html";
}