const fecha = document.querySelector('#fecha');
const input = document.querySelector('#input');
const lista = document.querySelector('#lista');
const btnAgregar = document.querySelector('#boton-agregar');
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineTach = "line-tach";
let id ; // inicializa y puede cambiar
let LIST;

//Local

//funcion para tener la fecha siempre actualizada
const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('en-US',{weekday:'long', month:'short',day:'numeric'});


// const btnCheck = document.querySelector('.tach');

function agregarTarea(task, id, realizado, eliminado){

    if (eliminado) {return}

    const REALIZADO = realizado ? check : uncheck; //if else resumido
    const LINE = realizado ? lineTach : '';
    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${task}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `

    lista.insertAdjacentHTML("beforeend", elemento);
}

btnAgregar.addEventListener('click', ()=>{
    console.log(id);
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea,id,false,false);
        LIST.push({
            nombre: tarea,
            id : id,
            realizado : false,
            eliminado : false
        });
        localStorage.setItem('toDo', JSON.stringify(LIST));
        input.value='';
        id++;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea,id,false,false); 
            LIST.push({
                nombre: tarea,
                id : id,
                realizado : false,
                eliminado : false
            })  
            localStorage.setItem('toDo', JSON.stringify(LIST));
            input.value='';
            id++;
        }
    }
})

lista.addEventListener('click', function(event){
    const element = event.target;
    console.log(element);
    const elementData = element.attributes.data.value;
    console.log(elementData);
    if (elementData == "realizado") {
        console.log('realizado');
        completeTask(element);
    }else if (elementData == "eliminado") {
        deleteTask(element);
        console.log('eliminado');
    }
    localStorage.setItem('toDo', JSON.stringify(LIST));
})

//funcion para tarea realizada
function completeTask(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineTach)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true //cambia de true a false
}

//funcion para eliminar tarea 
function deleteTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminado = true; // pongo en true si es eliminado
    console.log(LIST);
}

// local storage 
//para traernos los valores

let data = localStorage.getItem('toDo');
if (data) {
    LIST=JSON.parse(data); //parse convierte de json a lenguaje actual
    console.log(LIST);
    id = LIST.length;
    cargarLista(LIST);
}else{
    LIST = [];
    id = 0;
}

function cargarLista(datos) {
    datos.forEach(function(i) {
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado);
    });
}