document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  fijarNav();
  navSmooth();
  crearGaleria();
}

function fijarNav() {
  const barra = document.querySelector(".header");
  const limite = document.querySelector(".contenido_video");
  const body = document.querySelector("body");

  window.addEventListener("scroll", function () {
    if (limite.getBoundingClientRect().bottom < 0) {
      barra.classList.add("fijar-barra");
      body.classList.add("error-barra");
    } else {
      barra.classList.remove("fijar-barra");
      body.classList.remove("error-barra");
    }
  });
}

function navSmooth() {
  const enlaces = document.querySelectorAll(".nav-principal a");
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();

      const seccion = document.querySelector(e.target.attributes.href.value);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");
  for (let x = 1; x <= 12; x++) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
              <source srcset="build/img/thumb/${x}.avif" type="image/avif" />
              <source srcset="build/img/thumb/${x}.webp" type="image/webp" />
                <img
                  loading="lazy"
                  width="200"
                  height="300"
                  src="build/img/thumb/${x}.jpg"
                  alt="imagen galeria"
                />
        `;
    imagen.addEventListener("click", function () {
      mostrarImagen(x);
    });
    galeria.appendChild(imagen);
  }
}
function mostrarImagen(id) {
  const imagen = document.createElement("picture");
  imagen.innerHTML = `
              <source srcset="build/img/grande/${id}.avif" type="image/avif" />
              <source srcset="build/img/grande/${id}.webp" type="image/webp" />
                <img
                  loading="lazy"
                  width="200"
                  height="300"
                  src="build/img/grande/${id}.jpg"
                  alt="imagen galeria"
                />
        `;
  const overlay = document.createElement("DIV");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");
  overlay.addEventListener("click", function () {
    overlay.remove();
    const body = document.querySelector("body");
    body.classList.remove("overflow");
  });

  const btnCerrar = document.createElement("P");
  btnCerrar.classList.add("btn-cerrar");
  btnCerrar.textContent = "X";
  overlay.appendChild(btnCerrar);
  btnCerrar.addEventListener("click", function () {
    overlay.remove();
    body.classList.remove("overflow");
  });

  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("overflow");
}
