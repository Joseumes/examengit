import './style.css'

const alumnos = [
  { nombre: 'Ana', edad: 18, curso: '1º A' },
  { nombre: 'Luis', edad: 19, curso: '2º B' },
  { nombre: 'Sofía', edad: 17, curso: '1º B' },
  { nombre: 'Mateo', edad: 20, curso: '3º A' }
]

const renderTabla = () => `
  <table class="alumnos-tabla">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Edad</th>
        <th>Curso</th>
      </tr>
    </thead>
    <tbody>
      ${alumnos
        .map(
          (alumno) => `
            <tr>
              <td>${alumno.nombre}</td>
              <td>${alumno.edad}</td>
              <td>${alumno.curso}</td>
            </tr>
          `
        )
        .join('')}
    </tbody>
  </table>
`

const renderApp = () => {
  document.querySelector('#app').innerHTML = `
    <main class="alumnos-container">
      <header class="topbar">
        <h1>Listado de alumnos</h1>
        <button id="toggle-form" class="btn-agregar" type="button">Agregar alumno</button>
      </header>

      <section id="form-section" class="form-section hidden">
        <form id="form-alumno" class="alumno-form">
          <div class="campo">
            <label for="nombre">Nombre</label>
            <input id="nombre" name="nombre" type="text" placeholder="Ej: Carlos" required />
          </div>

          <div class="campo">
            <label for="edad">Edad</label>
            <input id="edad" name="edad" type="number" min="1" max="100" placeholder="Ej: 18" required />
          </div>

          <div class="campo">
            <label for="curso">Curso</label>
            <input id="curso" name="curso" type="text" placeholder="Ej: 2º B" required />
          </div>

          <div class="acciones">
            <button type="submit" class="btn-guardar">Guardar</button>
            <button type="button" id="cancelar-form" class="btn-cancelar">Cancelar</button>
          </div>
        </form>
      </section>

      ${renderTabla()}
    </main>
  `

  const formSection = document.querySelector('#form-section')
  const toggleFormBtn = document.querySelector('#toggle-form')
  const cancelarFormBtn = document.querySelector('#cancelar-form')
  const formAlumno = document.querySelector('#form-alumno')

  toggleFormBtn.addEventListener('click', () => {
    formSection.classList.toggle('hidden')
  })

  cancelarFormBtn.addEventListener('click', () => {
    formSection.classList.add('hidden')
    formAlumno.reset()
  })

  formAlumno.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(formAlumno)
    const nuevoAlumno = {
      nombre: formData.get('nombre').trim(),
      edad: Number(formData.get('edad')),
      curso: formData.get('curso').trim()
    }

    if (!nuevoAlumno.nombre || !nuevoAlumno.curso || Number.isNaN(nuevoAlumno.edad)) {
      return
    }

    alumnos.push(nuevoAlumno)
    formAlumno.reset()
    formSection.classList.add('hidden')
    renderApp()
  })
}

renderApp()
