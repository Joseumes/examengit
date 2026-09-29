import './style.css'

const alumnos = [
  { nombre: 'Ana', edad: 18, curso: '1º A' },
  { nombre: 'Luis', edad: 19, curso: '2º B' },
  { nombre: 'Sofía', edad: 17, curso: '1º B' },
  { nombre: 'Mateo', edad: 20, curso: '3º A' }
]

let filtro = ''
const app = document.querySelector('#app')

function render() {
  const lista = alumnos.filter((alumno) =>
    alumno.nombre.toLowerCase().includes(filtro.toLowerCase())
  )

  app.innerHTML = `
    <main class="alumnos-container">
      <header class="topbar">
        <h1>Listado de alumnos</h1>
        <div class="toolbar">
          <input id="buscar" type="search" placeholder="Buscar por nombre" value="${filtro}" />
          <button id="btnAgregar" type="button">Agregar alumno</button>
        </div>
      </header>

      <form id="formAlumno" class="hidden">
        <input name="nombre" placeholder="Nombre" required />
        <input name="edad" type="number" placeholder="Edad" required />
        <input name="curso" placeholder="Curso" required />
        <button type="submit">Guardar</button>
        <button type="button" id="btnCancelar">Cancelar</button>
      </form>

      <table class="alumnos-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Curso</th>
          </tr>
        </thead>
        <tbody>
          ${
            lista.length
              ? lista
                  .map(
                    (alumno) => `
                      <tr>
                        <td>${alumno.nombre}</td>
                        <td>${alumno.edad}</td>
                        <td>${alumno.curso}</td>
                      </tr>
                    `
                  )
                  .join('')
              : '<tr><td colspan="3">No hay alumnos</td></tr>'
          }
        </tbody>
      </table>
    </main>
  `

  const buscar = document.querySelector('#buscar')
  const btnAgregar = document.querySelector('#btnAgregar')
  const formAlumno = document.querySelector('#formAlumno')
  const btnCancelar = document.querySelector('#btnCancelar')

  buscar.addEventListener('input', (e) => {
    filtro = e.target.value
    render()
  })

  btnAgregar.addEventListener('click', () => {
    formAlumno.classList.toggle('hidden')
  })

  btnCancelar.addEventListener('click', () => {
    formAlumno.classList.add('hidden')
    formAlumno.reset()
  })

  formAlumno.addEventListener('submit', (e) => {
    e.preventDefault()

    const datos = new FormData(formAlumno)
    const nombre = datos.get('nombre').trim()
    const edad = Number(datos.get('edad'))
    const curso = datos.get('curso').trim()

    if (!nombre || !curso || Number.isNaN(edad)) return

    alumnos.push({ nombre, edad, curso })
    formAlumno.reset()
    formAlumno.classList.add('hidden')
    render()
  })
}

render()
