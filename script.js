async function loadData(jsonFile, containerId, renderFn) {

    const response = await fetch(`data/${jsonFile}`);
    const data = await response.json();

    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    data.forEach(item => {
        container.appendChild(renderFn(item));
    });
}
window.openLightbox = function(src) {

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = src;
    lightbox.classList.remove("hidden");
};
function closeLightbox() {

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    if (!lightbox || !lightboxImg) return;

    lightbox.classList.add("hidden");
    lightboxImg.src = "";
}
document.addEventListener("DOMContentLoaded", () => {

    const lightbox = document.getElementById("lightbox");
    const closeBtn = document.getElementById("lightbox-close");

    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeLightbox);
    }
});
function renderSong(song) {

    const card = document.createElement("div");
    card.classList.add("card");

    const embedUrl = getYouTubeEmbed(song.youtube);

    card.innerHTML = `
        <h3>${song.title}</h3>
        <p>${song.artist}</p>

        <div class="video-wrapper">
            <iframe
                src="${embedUrl}"
                title="YouTube video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
    `;

    return card;
}
function getYouTubeEmbed(url) {

    if (!url) return "";

    const videoId = url.split("v=")[1]?.split("&")[0];

    if (!videoId) return "";

    return `https://www.youtube.com/embed/${videoId}`;
}
function renderTab(tab) {

    const card = document.createElement("div");
    card.classList.add("card");

    const previewImage = tab.images[0];

    // Create image
    const img = document.createElement("img");

    img.src = previewImage;
    img.classList.add("tab-preview");
    img.alt = tab.title;

    // Click opens gallery
    img.addEventListener("click", () => {
        openGallery(tab.images, 0);
    });

    // Create title
    const title = document.createElement("h3");
    title.textContent = tab.title;

    // Add to card
    card.appendChild(img);
    card.appendChild(title);

    return card;
}
function nextImage() {


    if (currentGallery.length === 0) return;

    currentIndex++;

    if (currentIndex >= currentGallery.length) {
        currentIndex = 0;
    }

    document.getElementById("lightbox-img").src =
        currentGallery[currentIndex];
    updateCounter();
}
function prevImage() {

    if (currentGallery.length === 0) return;

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = currentGallery.length - 1;
    }

    document.getElementById("lightbox-img").src =
        currentGallery[currentIndex];
    updateCounter();
}
window.openGallery = function(images, index) {

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    if (!lightbox || !lightboxImg) return;

    currentGallery = images;
    currentIndex = index;

    lightboxImg.src = currentGallery[currentIndex];
    updateCounter();
    lightbox.classList.remove("hidden");
};
document.getElementById("lightbox-next")
?.addEventListener("click", (e) => {

    e.stopPropagation();
    nextImage();
});

document.getElementById("lightbox-prev")
?.addEventListener("click", (e) => {

    e.stopPropagation();
    prevImage();
});
let currentGallery = [];
let currentIndex = 0;
function updateCounter() {

    const counter =
        document.getElementById("lightbox-counter");

    if (!counter) return;

    counter.textContent =
        `${currentIndex + 1} / ${currentGallery.length}`;
}
function renderItem(item) {

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>

        <a href="${item.link}"
           target="_blank"
           class="button">
            View
        </a>
    `;

    return card;
}
function renderChord(chord) {

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img src="${chord.image}" alt="${chord.name}">
        <h3>${chord.name}</h3>
    `;

    return card;
}
const page = document.body.id;

if (page === "songs") {
    loadData("songs.json", "songs-container", renderSong);
}

if (page === "tabs") {
    loadData("tabs.json", "tabs-container", renderTab);
}

if (page === "items") {
    loadData("items.json", "items-container", renderItem);
}

if (page === "chords") {
    loadData("chords.json", "chords-container", renderChord);
}
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

if (lightbox) {

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {
            closeLightbox();
        }

    });
}
function initLightbox() {

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    if (!lightbox || !lightboxImg) return;

    lightbox.addEventListener("click", () => {
        lightbox.classList.add("hidden");
        lightboxImg.src = "";
    });
}

initLightbox();
