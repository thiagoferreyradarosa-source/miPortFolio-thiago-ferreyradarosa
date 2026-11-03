class Item {
    constructor(nuevaTarea) {
        this.crearDiv(nuevaTarea);
    }

    crearDiv(tarea) {
        const divItem = document.createElement('div');
        divItem.classList.add('item'); 

        const inputItem = document.createElement('input');
        inputItem.type = 'text';
        inputItem.disabled = true; 
        inputItem.value = tarea;

        const botonEditar = document.createElement('button');
        botonEditar.innerHTML = "<i class='fas fa-lock'></i>";
        botonEditar.classList.add('boton-editar');
        
        botonEditar.addEventListener('click', () => {
            if (inputItem.disabled) {
                inputItem.disabled = false;
                inputItem.focus(); 
                botonEditar.innerHTML = "<i class='fas fa-lock-open'></i>";
            } else {
                inputItem.disabled = true;
                botonEditar.innerHTML = "<i class='fas fa-lock'></i>";
            }
        });

        const botonRemover = document.createElement('button');
        botonRemover.innerHTML = "<i class='fas fa-trash'></i>"; 
        botonRemover.classList.add('boton-remover');
        
        botonRemover.addEventListener('click', () => {
            divItem.remove();
        });

        divItem.appendChild(inputItem);
        divItem.appendChild(botonEditar);
        divItem.appendChild(botonRemover);

        const container = document.querySelector('#container');
        container.appendChild(divItem);
    }
}

const inputPrincipal = document.querySelector('#input-principal'); 
const botonAgregar = document.querySelector('#boton-agregar');

function agregarTarea() {
    if (inputPrincipal.value.trim() !== '') {
        new Item(inputPrincipal.value);
        inputPrincipal.value = '';
        inputPrincipal.focus();
    }
}

botonAgregar.addEventListener('click', agregarTarea);

inputPrincipal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});