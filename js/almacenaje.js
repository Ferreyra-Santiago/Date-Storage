// llamar elementos del html 
const body = document.body
const formulario = document.querySelector(".formulario")
const nombre = document.querySelector("#nombre")
const apellido = document.querySelector("#apellido")
const genero = document.querySelector("#sexo")
const fechaNacimiento= document.querySelector("#Fecha-nacimiento")
const edad = document.querySelector("#edad")
const dni = document.querySelector("#dni")    
const localidad = document.querySelector("#localidad")
const Domicilio = document.querySelector("#Domicilio")
const codigoPostal = document.querySelector("#codigo_postal")
const telefono = document.querySelector("#telefono")
const esposasino = document.querySelector("#esposao")
const trabajo = document.querySelector("#trabajo")
const botonOcultar = document.querySelector("#botonOcultar")
const logo = document.querySelector(".logo")
const logo2 = document.querySelector(".logo2")
const card = document.querySelector("#cardcontainer")
const ordenar = document.querySelector("#botonOrdenar")
const botonParaEliminar = document.querySelector("#buttonDelate")
const formularioEliminar = document.querySelector(".formularioEliminar")
const nombreEliminar = document.querySelector("#nombreEliminar")
const dniEliminar = document.querySelector("#dniEliminar")
const apellidoEliminar = document.querySelector("#apellidoEliminar")
const cerrarSesion = document.querySelector("#cerrarSesion")
const modo = document.querySelector("#modo")

//algunas variables que utilizo
let sexo;
let identifica;

//clase constructora para las personas
class personas{
    constructor(nombre, apellido, genero, fechaNacimiento, edad, dni, localidad, Domicilio, codigoPostal, telefono, esposasino, trabajo,){
        this.nombre = nombre;
        this.apellido = apellido;
        this.genero = genero;
        this.fechaNacimiento = fechaNacimiento;
        this.edad = edad;
        this.dni = dni;
        this.localidad = localidad;
        this.Domicilio = Domicilio;
        this.codigoPostal = codigoPostal
        this.telefono = telefono;
        this.estadoCivil = esposasino;
        this.trabajo = trabajo
    }
}

//array de objetos que se guarda en el localstorage
const datos = datoStorage = JSON.parse(localStorage.getItem("Datos")) ?? [];


//funcion para acomodar alas cards de forma alfabetica
    let acomodar = ()=>{
        datos.sort((a, b) => {
            if (a.nombre > b.nombre) {
                return 1;
            }
            if (a.nombre < b.nombre) {
                return -1;
            }
            return 0;
        })
    }

// Funcion para guardar los datos de las personas
const guardarInfo = () =>{
    datos.push(new personas(nombre.value, apellido.value, genero.value, fechaNacimiento.value, edad.value, dni.value, localidad.value, Domicilio.value, codigoPostal.value, telefono.value, esposasino.value, trabajo.value,));
    localStorage.setItem("Datos", JSON.stringify(datos));
}

//funcion para verificar el storage y volver a generar las cards cuando vuelves a ingresar
const verificarStorage = () => {
    if(!!datoStorage && datoStorage.length > 0){
        for(const persona of datoStorage){
            div = document.createElement("div")
            li = document.createElement("li")

            //Desesctructuración
    const {nombre, apellido, genero, fechaNacimiento, edad, dni, localidad, Domicilio, codigoPostal, telefono, estadoCivil, trabajo} = persona

    if(genero == 1){
        sexo ="../img/icono-usuario-hombre.png"
        identifica= "Masculino"
    }else if(genero == 2){
        sexo = "../img/icono-usuario-mujer.png"
        identifica = "Femenino"
    }else{
        sexo = "../img/avatar-predeterminado.png"
        identifica = "No definido"
    }

    div.innerHTML =`<div class="card">
    <div class="card1">
        <div class="face front">
            <img src="${sexo}" alt="">
            <h3>${nombre} ${apellido}</h3><br>
            <p>D.N.I: ${dni}</p>
        </div>
        <div class="face back">
            <h3>${nombre} ${apellido}</h3>
            <p>Nombre: ${nombre || "No definido"} <br>
            Apellido: ${apellido || "No definido"} <br>
            Genero ${identifica || "No definido"} <br>
            Fecha de nacimiento: ${fechaNacimiento || "No especificado"} <br>
            Edad: ${edad  || "No definido"} <br>
            D.N.I: ${dni  || "No definido"} <br>
            Localidad: ${localidad || "No especificado"}<br>
            Domicilio: ${Domicilio || "No especificado"}<br>
            Codigo postal: ${codigoPostal  || "No especificado"} <br>
            Telefono: ${telefono || "No especificado"}<br>
            Estado Civil: ${estadoCivil || "no definido"}<br>
            Trabajo: ${trabajo || "No especificado"}</p></p>
        </div>
    </div>
</div>`
card.append(div);
    }
}
}


// una ves que se inicie la pagina se activen tas 1.5s
setTimeout(()=>{
    acomodar()
    verificarStorage();
},1500)


// evento para ocultar el formulario y cambiar por momentos el logo 
botonOcultar.addEventListener("click",()=>{
    formulario.classList.toggle("oculto");
    formularioEliminar.classList.remove("aparecer");
    logo.classList.add("desaparecer")
    logo2.classList.add("aparecer")
    setTimeout(()=>{
        logo.classList.remove("desaparecer")
        logo2.classList.remove("aparecer")
    },3000)
})

// alerta que avisa que se agrego una persona una ves terminado el formulario
const seAgrego = () =>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
        })
    Toast.fire({
        icon: 'success',
        title: `Se a agregado
        ${nombre.value} ${apellido.value}`
    })
}


// Forumulario principal 
formulario.addEventListener("submit",(e)=>{
    e.preventDefault();
    acomodar();
    guardarInfo();
    seAgrego()
    crearCard();
}
)

//Crear la card con la informacion 
const crearCard = () =>{
    div = document.createElement("div");
    li = document.createElement("li");
    for(const persona of datos){

    const {nombre, apellido, genero, fechaNacimiento, edad, dni, localidad, Domicilio, codigoPostal, telefono, estadoCivil, trabajo } = persona

        if(genero == 1){
            sexo ="../img/icono-usuario-hombre.png"
            identifica= "Masculino"
        }else if(genero == 2){
            sexo = "../img/icono-usuario-mujer.png"
            identifica = "Femenino"
        }else{
            sexo = "../img/avatar-predeterminado.png"
            identifica = "No definido"
        }
        div.innerHTML =`<div class="card">
        <div class="card1">
            <div class="face front">
                <img src="${sexo}" alt="">
                <h3>${nombre} ${apellido}</h3><br>
                <p>D.N.I: ${dni}</p>
            </div>
            <div class="face back">
                <h3>${nombre} ${apellido}</h3>
                <p>Nombre: ${nombre || "No definido"} <br>
                Apellido: ${apellido || "No definido"} <br>
                Genero ${identifica || "No definido"} <br>
                Fecha de nacimiento: ${fechaNacimiento || "No especificado"} <br>
                Edad: ${edad  || "No definido"} <br>
                D.N.I: ${dni  || "No definido"} <br>
                Localidad: ${localidad || "No especificado"}<br>
                Domicilio: ${Domicilio || "No especificado"}<br>
                Codigo postal: ${codigoPostal  || "No especificado"} <br>
                Telefono: ${telefono || "No especificado"}<br>
                Estado Civil: ${estadoCivil  || "no definido"}<br>
                Trabajo: ${trabajo || "No especificado"}</p></p>
            </div>
        </div>
    </div>`
        card.append(div);
        formulario.reset();
    }
}

//Evento para hacer aparecer el formulario de eliminar 
    botonParaEliminar.addEventListener("click", ()=>{
        formularioEliminar.classList.toggle("aparecer");
        formulario.classList.remove("oculto")
    })


//Formulario para eliminar usuarios
    formularioEliminar.addEventListener("submit", (e)=>{
        e.preventDefault()
        validarUsuario()
    })

//funcion para eliminar del storage la persona que cumpla con el mismo dni 
let deleate = () =>{
    const datos = datoStorage = JSON.parse(localStorage.getItem("Datos")) ?? [];
    const resultado2 = datoStorage.findIndex(element => element.dni == dniEliminar.value)
    datoStorage.splice(resultado2, 1)
    let eliminado =JSON.stringify(datos)
    localStorage.setItem("Datos", eliminado)
}

//Funcion para validar el usuario para ver si la informacion coincide para eliminarlo 
const validarUsuario = () => {
    for (const usuario of datos) {
        const { nombre, apellido ,dni } = usuario

        if (nombre === nombreEliminar.value && apellido=== apellidoEliminar.value && dni === dniEliminar.value) {
            return Swal.fire({
                title: `Seguro que quieres eliminar a ${nombreEliminar.value} ${apellidoEliminar.value}?`,
                text: "los datos se perderan",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'si quiero',
                cancelButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                    `Se ha eliminado a ${nombreEliminar.value} ${apellidoEliminar.value}`,
                    '',
                    'success',
                    deleate(),
                    setTimeout(()=>{
                        window.location.href = "../paginas/almacenaje.html"
                    },2000)
                )
                }
            })
            }
            Swal.fire({
                icon: 'error',
                title: `No se pudo encontrar
                ${nombreEliminar.value} ${apellidoEliminar.value}.`,
                text: `Verifica que el nombre o apellido esta bien escrito`,
            })
        }
        }



//modo oscuro o claro
modo.addEventListener("click", function(){
    let val=body.classList.toggle("dark")
    localStorage.setItem("modo",val)
})

let valor=localStorage.getItem("modo")

if (valor=="true") {
    body.classList.add("dark")
} else {
    body.classList.remove("dark")
}


//evento para cerrar sesion y te lleve nuevamente al index para loguearse
cerrarSesion.addEventListener("click", ()=>{
    Swal.fire({
        title: `Seguro que quieres
        Cerrar sesion?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si quiero',
        cancelButtonText: 'Cancelar',
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            `Su sesion ha finalizado`,
            '',
            'success',

            setTimeout(()=>{
                window.location.href ="../index.html"
            },1000)
        )
        }
    });
})

//animacion de carga que termina una ves ya cargo todo 
window.onload = ()=>{
    let contenedorCarga = document.querySelector("#contenedor_carga")
    contenedorCarga.style.visibility = "hidden"
    contenedorCarga.style.opacoty = "0"
}