document.addEventListener("DOMContentLoaded", () => {

  // 🎵 AUDIOS
  const musicaInicio = document.getElementById("musicaInicio");
  const musicaCarta = document.getElementById("musicaCarta");

  musicaInicio.volume = 0;
  musicaCarta.volume = 0.3;

  let musicaIniciada = false;
  let enCarta = false;

  // 🎶 FADE IN
  function fadeIn(audio, maxVol = 0.2) {
    let vol = 0;
    audio.volume = 0;
    audio.play();

    const fade = setInterval(() => {
      if (vol < maxVol) {
        vol += 0.01;
        audio.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 100);
  }

  // 🎶 FADE OUT
  function fadeOut(audio, callback) {
    let vol = audio.volume;

    const fade = setInterval(() => {
      if (vol > 0.01) {
        vol -= 0.01;
        audio.volume = vol;
      } else {
        clearInterval(fade);
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 0.3;
        if (callback) callback();
      }
    }, 100);
  }

  // ▶️ iniciar música SOLO UNA VEZ
  document.addEventListener("click", () => {
    if (!musicaIniciada) {
      fadeIn(musicaInicio);
      musicaIniciada = true;
    }
  }, { once: true });

  // 📄 CAMBIO DE SECCIONES
  window.mostrar = function(seccion) {
    document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
    document.getElementById(seccion).classList.add("active");

    // 🎵 cambio a carta
    if (seccion === "carta" && !enCarta) {
      enCarta = true;

      fadeOut(musicaInicio, () => {
        musicaCarta.currentTime = 0;
        fadeIn(musicaCarta, 0.25);
      });
    }
  };

  // ❤️ CORAZONES
  function crearCorazon() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 20 + 10) + "px";
    heart.style.animationDuration = (Math.random() * 8 + 8) + "s";

    document.querySelector(".hearts").appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
  }

  setInterval(crearCorazon, 300);

  // 📸 LIGHTBOX
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxFecha = document.getElementById("lightbox-fecha");

  document.querySelectorAll(".galeria img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.classList.add("show");
      lightboxImg.src = img.src;
      lightboxFecha.textContent = img.dataset.fecha;
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("show");
  });

  // 🔀 MEZCLAR GALERÍA
  function mezclarGaleria() {
    const galeria = document.querySelector(".galeria");
    const imagenes = Array.from(galeria.children);

    for (let i = imagenes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imagenes[i], imagenes[j]] = [imagenes[j], imagenes[i]];
    }

    galeria.innerHTML = "";
    imagenes.forEach(img => galeria.appendChild(img));
  }

  window.addEventListener("load", mezclarGaleria);

});