import './style.css'

const alumnos = [
  { nombre: 'Ana', edad: 18, curso: '1º A' },
  { nombre: 'Luis', edad: 19, curso: '2º B' },
  { nombre: 'Sofía', edad: 17, curso: '1º B' },
  { nombre: 'Mateo', edad: 20, curso: '3º A' }
]

document.querySelector('#app').innerHTML = `
  <main class="alumnos-container">
    <h1>Listado de alumnos</h1>
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
  </main>
`
