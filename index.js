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
        //Verificación de campos vacíos
        if (nombre === '' || apellido === '' || especialidad === '' || fecha === '' || hora === '' || nmedico === '') {
        // Muestra un mensaje de error o realiza alguna acción adicional para manejar los campos vacíos
        alert('Por favor, completa todos los campos del formulario');
        return; // Detén la ejecución del bloque de código si hay campos vacíos
    }
        guardar(nombre, apellido, especialidad, fecha, hora, nmedico)
    } else {
        //Verificación de campos vacíos
        if (nombre === '' || apellido === '' || especialidad === '' || fecha === '' || hora === '' || nmedico === '') {
        alert('Por favor, completa todos los campos del formulario');
        return; // STOP ejecución del bloque de código si hay campos vacíos
        }
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
        Swal.fire('Registro Modificado!')
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
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
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
                Swal.fire({
                    title: 'Desea Editar el Registro??',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    denyButtonText: `No`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      Swal.fire('Se han cargado los datos para modificar')
                    } else if (result.isDenied) {
                      Swal.fire('Los cambios no se han guardado')
                    }                
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
})
document.getElementById('btnLimpiar').addEventListener('click', () => {
    limpiarFormulario();
});