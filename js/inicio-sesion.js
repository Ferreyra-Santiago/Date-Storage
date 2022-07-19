//llamando elementos del html
const BotonIng = document.querySelector("#BotonIng")
const BotonReg = document.querySelector("#BotonReg")
const botonRegistrar = document.querySelector(".form1")
const botonIngresar = document.querySelector(".form2")
const formularioRegistro = document.querySelector(".formulario-Registro")
const formularioinicio = document.querySelector(".formulario-inicio")
const inicioEmail = document.querySelector("#inicioEmail")
const inicioContraseña = document.querySelector("#inicioContraseña")
const botonInicio  = document.querySelector("#botonInicio")
const registroNombre = document.querySelector("#regNombre")
const registroApellido = document.querySelector("#regApellido")
const registroEmail = document.querySelector("#regEmail")
const registroContraseña = document.querySelector("#regContraseña")
const botonRegistro = document.querySelector("#botonRegistro")

//Clase constructora para crear los usuarios
class NuevoUsuario{
    constructor(nombre, apellido, correo, contraseña){
        this.nombre = nombre
        this.apellido = apellido
        this.correo = correo
        this.contraseña = contraseña
    }
}


//Guardar las cuentas en el localstorage
const usuario = JSON.parse(localStorage.getItem("usuario")) ?? [];

//Boton para mostrar el formulario de registro
BotonReg.addEventListener("click", ()=>{
    botonIngresar.classList.add("aparecer")
    formularioRegistro.classList.add("aparecer")
    botonRegistrar.classList.add("oculto")
    formularioinicio.classList.add("oculto")
    })

//Boton para mostrar el formulario de login
BotonIng.addEventListener("click", ()=>{
    botonIngresar.classList.remove("aparecer")
    formularioRegistro.classList.remove("aparecer")
    botonRegistrar.classList.remove("oculto")
    formularioinicio.classList.remove("oculto")
})


// Crear el usuario
const crearUsuario = () =>{
    usuario.push(new NuevoUsuario(registroNombre.value, registroApellido.value, registroEmail.value, registroContraseña.value))
    localStorage.setItem("usuario", JSON.stringify(usuario))
}

//Alerta para figurar que la persona se registro
const usuarioRegistrado = () =>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'success',
        title: `Usuario Registrado`})
}

//Validar que  los datos esten puesto de forma correcta 
const validarUsuario = () => {
    for(const verificar of usuario){
        const {correo, contraseña} = verificar

    if (correo === inicioEmail.value && contraseña === inicioContraseña.value){
        window.location.href = "./paginas/almacenaje.html";
    }
    else {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
            })

            Toast.fire({
            icon: 'error',
            title: 'Los datos ingresados no son correctos'
            })
    }
}
}

//Formulario de registro con su funciones 
formularioRegistro.addEventListener("submit", (e)=>{
    e.preventDefault()
    crearUsuario()
    usuarioRegistrado()
    formularioRegistro.reset()
    botonRegistrar.classList.remove("oculto")
    botonIngresar.classList.remove("aparecer")
    formularioinicio.classList.remove("oculto")
    formularioRegistro.classList.remove("aparecer")
} )

//Formulario de login con sus funciones para ingresar al date storage
formularioinicio.addEventListener("submit", (e)=>{
e.preventDefault()
validarUsuario()
formularioinicio.reset()
})