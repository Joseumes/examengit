import './style.css'

const alumnos = [
  { nombre: 'Ana', edad: 18, curso: '1º A' },
  { nombre: 'Luis', edad: 19, curso: '2º B' },
  { nombre: 'Sofía', edad: 17, curso: '1º B' },
  { nombre: 'Mateo', edad: 20, curso: '3º A' }
]

const state = {
  filtro: ''
}

const getAlumnosFiltrados = () => {
  const texto = state.filtro.trim().toLowerCase()

  if (!texto) return alumnos

  return alumnos.filter((alumno) =>
    alumno.nombre.toLowerCase().includes(texto)
  )
}

const renderTabla = () => {
  const tbody = document.querySelector('.alumnos-tabla tbody')

  if (!tbody) return

  const alumnosFiltrados = getAlumnosFiltrados()

  tbody.innerHTML = alumnosFiltrados.length
    ? alumnosFiltrados
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
    : '<tr><td colspan="3">No se encontraron alumnos</td></tr>'
}

const renderApp = () => {
  document.querySelector('#app').innerHTML = `
    <main class="alumnos-container">
      <header class="topbar">
        <div class="titulo-wrap">
          <h1>Listado de alumnos</h1>
        </div>

        <div class="toolbar">
          <input
            id="buscar-alumno"
            type="search"
            value="${state.filtro}"
            placeholder="Buscar por nombre"
            aria-label="Buscar alumno"
          />
          <button id="toggle-form" class="btn-agregar" type="button">Agregar alumno</button>
        </div>
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

      <table class="alumnos-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Curso</th>
          </tr>
        </thead>
        <tbody>
          ${getAlumnosFiltrados()
            .map(
              (alumno) => `
                <tr>
                  <td>${alumno.nombre}</td>
                  <td>${alumno.edad}</td>
                  <td>${alumno.curso}</td>
                </tr>
              `
            )
            .join('') || '<tr><td colspan="3">No se encontraron alumnos</td></tr>'}
        </tbody>
      </table>
    </main>
  `

  const formSection = document.querySelector('#form-section')
  const toggleFormBtn = document.querySelector('#toggle-form')
  const cancelarFormBtn = document.querySelector('#cancelar-form')
  const formAlumno = document.querySelector('#form-alumno')
  const buscarInput = document.querySelector('#buscar-alumno')

  toggleFormBtn.addEventListener('click', () => {
    formSection.classList.toggle('hidden')
  })

  cancelarFormBtn.addEventListener('click', () => {
    formSection.classList.add('hidden')
    formAlumno.reset()
  })

  buscarInput.addEventListener('input', (event) => {
    state.filtro = event.target.value
    renderTabla()
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
