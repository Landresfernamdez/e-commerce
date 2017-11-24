/**
 * Created by Andres on 9/25/2017.
 */

function GetFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
function AddToLocalStorage(data) {
    if (typeof data != "string") {data = JSON.stringify(data);}
    return data;
}
function cargarSesionGuardada(){
    var user=JSON.parse(localStorage.getItem("user"));

    document.getElementById("id").value=user.nombre;
    document.getElementById("pass").value=user.pass;
}
cargarSesionGuardada();
function validar(){
    var personas=[]
    personas=GetFromLocalStorage("personas")
    console.log(personas)
    for(i in personas){
        if(document.getElementById("id").value==personas[i].nombre && document.getElementById("pass").value==personas[i].pass){
            if(personas[i].tipo==="a"){
                window.location.href="views/administrador.html";
                return;
            }
            else if(personas[i].tipo==="c"){
                var bandera=JSON.parse(localStorage.getItem("bandera"));
                if(personas[i].activo==="0" && bandera=="1"){
                    personas[i].activo="1";
                    localStorage.setItem("personas",AddToLocalStorage(personas));
                    alertify.success('La confirmacion fue exitosa');
                    localStorage.setItem("bandera","0");
                    var usuario=JSON.parse(localStorage.getItem("user"));
                    if(usuario.nombre===""){
                        alertify.prompt("","Desea guardar sesion",
                            function(evt){
                                var usuario={
                                    nombre:personas[i].nombre,
                                    pass:personas[i].pass
                                }
                                sessionStorage.setItem("user",AddToLocalStorage(usuario));
                                localStorage.setItem("user",AddToLocalStorage(usuario));
                                alert("La sesion se guardo con exito")
                                window.location.href="views/cliente.html";
                            },
                            function(){
                                var usuario={
                                    nombre:personas[i].nombre,
                                    pass:personas[i].pass
                                }
                                localStorage.setItem("user",AddToLocalStorage({nombre:"",pass:""}));
                                sessionStorage.setItem("user",AddToLocalStorage(usuario));
                                window.location.href="views/cliente.html";
                            })
                        ;
                    }
                    else{
                        var usuario={
                            nombre:personas[i].nombre,
                            pass:personas[i].pass
                        }
                        localStorage.setItem("user",AddToLocalStorage({nombre:"",pass:""}));
                        sessionStorage.setItem("user",AddToLocalStorage(usuario));
                        window.location.href="views/cliente.html";
                    }
                }
                if(personas[i].activo==="0" && bandera=="0"){
                        alertify.confirm("Su cuenta esta inactiva, desea activarla dijite OK y dijite sus credenciales.",
                        function(){
                            localStorage.setItem("bandera","1");
                            window.location.href="index.html";
                        },
                        function(){
                            alertify.error('No se ha confirmado la cuenta');
                        });
                    return;
                }
                else{
                    var usuario=JSON.parse(localStorage.getItem("user"));
                    if(usuario.nombre===""){
                        alertify.confirm("Desea guardar sesion",
                            function(){
                                var usuario={
                                    nombre:personas[i].nombre,
                                    pass:personas[i].pass
                                }
                                sessionStorage.setItem("user",AddToLocalStorage(usuario));
                                localStorage.setItem("user",AddToLocalStorage(usuario));
                                alertify.success("La sesion se guardo con exito")
                                window.location.href="views/cliente.html";
                            },
                            function(){
                                var usuario={
                                    nombre:personas[i].nombre,
                                    pass:personas[i].pass
                                }
                                localStorage.setItem("user",AddToLocalStorage({nombre:"",pass:""}));
                                sessionStorage.setItem("user",AddToLocalStorage(usuario));
                                window.location.href="views/cliente.html";
                            })
                        ;
                    }
                    else{
                        var usuario={
                            nombre:personas[i].nombre,
                            pass:personas[i].pass
                        }
                        localStorage.setItem("user",AddToLocalStorage({nombre:"",pass:""}));
                        sessionStorage.setItem("user",AddToLocalStorage(usuario));
                        window.location.href="views/cliente.html";
                    }
                    return;
                }
            }
        }
    }
    alertify.error("El usuario no existe")
}
//Clase que representa un cliente
var cliente=function(t,a,i,n,a1,a2,e,em,d,te,ta,p,l,car,comp,cod){
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
        this.lista_deseos=l,
        this.carrito=car,
        this.compras=comp
}
function existe(name,lista){
    for(var x=0;x<lista.length;x++){
        if(lista[x].nombre==name){
            return true;
        }
    }
    return false;
}
function guardarRegistro() {
        var lista_personas=GetFromLocalStorage("personas");
        var tipo="c";
        var estado="0";
        var id=lista_personas.length;
        var name=document.getElementById("name_c").value;
        var apellido1=document.getElementById("apellido1_c").value;
        var apellido2=document.getElementById("apellido2_c").value;
        var edad=document.getElementById("edad").value;
        var email=document.getElementById("email").value;
        var direccion=document.getElementById("direccion").value;
        var telefono=document.getElementById("telefono").value;
        var pass=document.getElementById("pass_c").value;
        var num_t_c=document.getElementById("num_tarjeta").value;
        var fecha_expiracion=document.getElementById("fecha_expira").value;
        var cod_c=document.getElementById("cod_c").value;
        var tarjetas=[];
        var lista_d=[];//Lista de deseos
        var carrito=[];
        var compras=[];
        tarjetas.push({cod_tarjeta:num_t_c,fecha_vencimiento:fecha_expiracion,cod_seguridad:cod_c});
        var cli=new cliente(tipo,estado,id,name,apellido1,apellido2,edad,email,direccion,telefono,tarjetas,pass,lista_d,carrito,compras);
        if(cod_c.length<3 || cod_c.length>3){
            alertify.error("El codigo de seguridad consta de 3 numeros");
            return;
        }
        if(existe(name,lista_personas)){
            alertify.error("Ya existe un usuario con este nombre");
            return;
        }
        else{
            lista_personas.push(cli);
            localStorage.setItem("personas",AddToLocalStorage(lista_personas));
            alert("Se ha registrado con exito: "+name);
        }

}