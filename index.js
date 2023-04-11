import { guardar, obtener, eliminarPaciente, obtenerUno, editarPaciente } from "./cfgfirebase.js"

let id = ''
let editStatus = false

// Función para limpiar los campos del formulario
function limpiarFormulario() {
    document.getElementById('nombre').value = ''
    document.getElementById('apellido').value = ''
    document.getElementById('especialidad').value = ''
    document.getElementById('fecha').value = ''
    document.getElementById('hora').value = ''
    document.getElementById('nmedico').value = ''
}

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault()

    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value
    const especialidad = document.getElementById('especialidad').value
    const fecha = document.getElementById('fecha').value
    const hora = document.getElementById('hora').value
    const nmedico = document.getElementById('nmedico').value

    if (!editStatus) {
        guardar(nombre, apellido, especialidad, fecha, hora, nmedico)
    } else {
        editarPaciente(id, {
            'nombre': nombre,
            'apellido': apellido,
            'especialidad': especialidad,
            'fecha': fecha,
            'hora': hora,
            'nmedico': nmedico
        })
        editStatus = false
        id = ''
        limpiarFormulario() // Limpia los campos del formulario después de editar
    }
})

window.addEventListener('DOMContentLoaded', async () => {
    //arreglo que contendrá los datos de la base de datos
    obtener((querySnapshot) => {
        let tabla = ''
        querySnapshot.forEach((doc) => {
            const horasmedicas = doc.data()
            tabla += ` 
                <tr>
                    <td>${horasmedicas.nombre}</td>
                    <td>${horasmedicas.apellido}</td>
                    <td>${horasmedicas.especialidad}</td>
                    <td>${horasmedicas.fecha}</td>
                    <td>${horasmedicas.hora}</td>
                    <td>${horasmedicas.nmedico}</td>
                    <td><button class="btn btn-danger eliminar" id="${doc.id}">Borrar</button>
                        <button class="btn btn-warning editar" id="${doc.id}">Editar</button>
                    </td>
                </tr>
                
            `
        })
        document.getElementById('tbody').innerHTML = tabla

        document.querySelectorAll('.eliminar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // console.log(e.target)
                Swal.fire({
                    title: '¿Desea eliminar Registro?',
                    text: "No podrás la información",
                    icon: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'No',
                    confirmButtonText: 'Eliminar!',
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminarPaciente(e.target.id)
                        Swal.fire(
                            'Eliminado!',
                            'Tu registro ha sido eliminado',
                            'success'
                        )
                    }
                })
            })
        })

        document.querySelectorAll('.editar').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const documento = await obtenerUno(e.target.id)
                const reg = documento.data()

                document.getElementById('nombre').value = reg.nombre
                document.getElementById('apellido').value = reg.apellido
                document.getElementById('especialidad').value = reg.especialidad
                document.getElementById('fecha').value = reg.fecha
                document.getElementById('hora').value = reg.hora
                document.getElementById('nmedico').value = reg.nmedico

                editStatus = true
                id = documento.id
            })
        })
    })
})

document.getElementById('btnLimpiar').addEventListener('click', () => {
    limpiarFormulario();
});