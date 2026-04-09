
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const introOverlay = document.getElementById("introOverlay");
const enterExperienceBtn = document.getElementById("enterExperienceBtn");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

let currentIndex = 0;
let musicOn = false;

function useFullImage(imgEl) {
  const fallback = imgEl.dataset.full;
  if (fallback && imgEl.src !== fallback) {
    imgEl.src = fallback;
    imgEl.onerror = null;
  }
}

function openLightbox(index){
  currentIndex = index;
  updateLightbox();
  lightbox.classList.remove("hidden");
}

function openLightboxByName(fullName){
  const idx = images.findIndex(x => x.full_name === fullName);
  if (idx >= 0) openLightbox(idx);
}

function closeLightbox(){
  lightbox.classList.add("hidden");
}

function changeSlide(direction){
  currentIndex = (currentIndex + direction + images.length) % images.length;
  updateLightbox();
}

function updateLightbox(){
  const img = images[currentIndex];
  lightboxImg.src = "full/" + img.full_name;
}

enterExperienceBtn?.addEventListener("click", async () => {
  introOverlay.classList.add("hidden");
  document.body.style.overflow = "auto";
  if (HAS_MUSIC && bgMusic && !musicOn) {
    try {
      await bgMusic.play();
      musicOn = true;
      if (musicToggle) musicToggle.textContent = "♫ Music On";
    } catch (e) {}
  }
});

musicToggle?.addEventListener("click", async () => {
  if (!bgMusic) return;
  if (musicOn) {
    bgMusic.pause();
    musicOn = false;
    musicToggle.textContent = "♫ Music";
  } else {
    try {
      await bgMusic.play();
      musicOn = true;
      musicToggle.textContent = "♫ Music On";
    } catch (e) {}
  }
});

document.body.style.overflow = "hidden";

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("hidden")) {
    if (e.key === "ArrowRight") changeSlide(1);
    if (e.key === "ArrowLeft") changeSlide(-1);
    if (e.key === "Escape") closeLightbox();
    return;
  }
  if (e.key === "Escape" && introOverlay && !introOverlay.classList.contains("hidden")) {
    introOverlay.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
});
