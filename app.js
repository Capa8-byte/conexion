const API_URL = 'http://localhost:3000/api/usuarios';

const tabla = document.getElementById('usuarios-tabla');
const modal = document.getElementById('modal-usuario');
const formUsuario = document.getElementById('form-usuario');

function abrirModal(u = null) {
  modal.style.display = 'block';
  if (u) {
    document.getElementById('modal-titulo').textContent = 'Editar Usuario';
    document.getElementById('usuario-id').value = u.id;
    document.getElementById('nombre').value = u.nombre;
    document.getElementById('apellidos').value = u.apellidos;
    document.getElementById('correo').value = u.correo;
  } else {
    document.getElementById('modal-titulo').textContent = 'Nuevo Usuario';
    formUsuario.reset();
    document.getElementById('usuario-id').value = '';
  }
}

function cerrarModal() {
  modal.style.display = 'none';
}

// 1. GET: Cargar Datos
async function cargarDatos() {
  try {
    const respuesta = await fetch(API_URL);
    const datos = await respuesta.json();
    tabla.innerHTML = '';
    const fragmento = document.createDocumentFragment();

    datos.forEach(u => {
      const fila = document.createElement('tr');
      const tdNombre = document.createElement('td'); tdNombre.textContent = u.nombre ?? '';
      const tdApellidos = document.createElement('td'); tdApellidos.textContent = u.apellidos ?? '';
      const tdCorreo = document.createElement('td'); tdCorreo.textContent = u.correo ?? '';

      const tdAcciones = document.createElement('td');
      const btnEditar = document.createElement('button');
      btnEditar.className = 'btn btn-warning';
      btnEditar.textContent = 'Editar';
      btnEditar.onclick = () => abrirModal(u);

      const btnEliminar = document.createElement('button');
      btnEliminar.className = 'btn btn-danger';
      btnEliminar.style.marginLeft = '5px';
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.onclick = () => eliminarUsuario(u.id);

      tdAcciones.append(btnEditar, btnEliminar);
      fila.append(tdNombre, tdApellidos, tdCorreo, tdAcciones);
      fragmento.appendChild(fila);
    });

    tabla.appendChild(fragmento);
  } catch (error) {
    console.error(error);
  }
}

// 2. POST / PUT: Crear o Editar (RETO ALUMNO)
formUsuario.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('usuario-id').value;
  const usuarioData = {
    nombre: document.getElementById('nombre').value,
    apellidos: document.getElementById('apellidos').value,
    correo: document.getElementById('correo').value
  };

  /* ✏️ TODO ALUMNO:
     1. Si 'id' existe -> fetch con PUT a `${API_URL}/${id}`
     2. Si 'id' NO existe -> fetch con POST a API_URL
     3. Convertir 'usuarioData' con JSON.stringify()
     4. Ejecutar cargarDatos() y cerrarModal()
  */

  cerrarModal();
});

// 3. DELETE: Eliminar Usuario (RETO ALUMNO)
async function eliminarUsuario(id) {
  if (!confirm('¿Eliminar usuario?')) return;

  /* ✏️ TODO ALUMNO:
     1. Fetch con DELETE a `${API_URL}/${id}`
     2. Validar respuesta y llamar a cargarDatos()
  */
}

document.addEventListener('DOMContentLoaded', cargarDatos);