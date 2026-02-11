async function loadPortfolio() {
  const app = document.getElementById('app')

  try {
    const response = await fetch('js/mock-data/data.json')
    const data = await response.json()

    // Render Profile Header with Centered Layout
    const header = `
            <header class="profile-header reveal">
                <div class="header-top">
                    <div class="avatar">
                        <img src="${data.profile.avatar}" alt="${data.profile.name}">
                    </div>
                    <div class="profile-info">
                        <h1 class="font-serif">${data.profile.name}</h1>
                        <p>${data.profile.bio}</p>
                    </div>
                </div>
                ${
                  data.profile.description
                    ? `
                    <div class="profile-description">
                        ${data.profile.description}
                    </div>
                `
                    : ''
                }
                <div class="social-links">
                    ${data.socials
                      .map(
                        (social) => `
                        <a href="${social.url}" class="social-item" title="${social.title}">
                            ${social.icon ? `<img src="${social.icon}" alt="${social.title}" class="social-icon">` : social.label}
                        </a>
                    `,
                      )
                      .join('')}
                </div>
            </header>
        `

    // Render Bento Grid
    const grid = `
            <main class="bento-grid">
                ${data.links
                  .map(
                    (link, index) => `
                    <a href="${link.url}" class="bento-card ${link.featured ? 'featured' : ''} reveal delay-${(index % 4) + 1}">
                        <h3>${link.title}</h3>
                        <p>${link.short_description || ''}</p>
                        <span class="meta">${link.meta}</span>
                    </a>
                `,
                  )
                  .join('')}
            </main>
        `

    app.innerHTML = header + grid
  } catch (error) {
    console.error('Error loading portfolio:', error)
    let errorMessage = 'Error al cargar el portafolio.'
    if (window.location.protocol === 'file:') {
      errorMessage +=
        '<br><br><strong>⚠️ Nota técnica:</strong> Los navegadores bloquean la carga de archivos JSON cuando abres el HTML directamente (doble clic). <br>Necesitas usar un <strong>servidor local</strong> (como la extensión "Live Server" de VS Code) para que funcione correctamente.'
    } else {
      errorMessage +=
        'Asegúrate de que js/mock-data/data.json exista y sea un JSON válido.'
    }
    app.innerHTML = `<div class="error">${errorMessage}</div>`
  }
}

document.addEventListener('DOMContentLoaded', loadPortfolio)
