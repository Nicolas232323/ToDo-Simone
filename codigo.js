const agregarElemento = (nombre) => {
    elementos.push({
        id: Date.now(),
        nombre: nombre,
        fechaCreacion: Date.now(),
        estaTachado: false,
        fechaTachado: null,
    });
};

const actualizarLista = () => {
    let html = "";
    elementos.forEach(n => {
        let estilo = "";
        let checked = "";
        if (n.estaTachado) {
            estilo = "text-decoration: line-through";
            checked = "checked"
        }
        html += `
        <div>
            <input ${checked} type="checkbox" onclick="tachar(${n.id})" />
            <span style="${estilo}">${n.nombre}</span>
        </div>`;
    });
    toDos.innerHTML = html;
};

const tareaMasRapida = () => {
    let tareaRapidaNombre = "";
    let duracionRapida = Infinity;
    elementos.filter(e => e.estaTachado).forEach(n => {
        const duracion = n.fechaTachado - n.fechaCreacion;
        if (duracion < duracionRapida) {
            duracionRapida = duracion;
            tareaRapidaNombre = n.nombre;
        }
    });
    toDoRapido.innerHTML = `La tarea más rápida en realizarse fue ${tareaRapidaNombre}`;
};

document.getElementById("agregarTarea").onclick = () => {
    agregarElemento(toDo.value);
    actualizarLista();
    toDo.value = "";
};

const tachar = (id) => {
    const index = elementos.findIndex(elem => elem.id === id);
    if (index !== -1) {
        elementos[index].estaTachado = !elementos[index].estaTachado;
        elementos[index].fechaTachado = elementos[index].estaTachado ? Date.now() : undefined;
        actualizarLista();
    }
};

document.getElementById("tareaMasRapida").onclick = () => {
    tareaMasRapida();
};

let toDos = document.getElementById("ToDos");
let toDo = document.getElementById("ToDo");
let toDoRapido = document.getElementById("ToDoRapido");
let elementos = [];