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
            if (e.target.id === "lightbox") {
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

    const images = tab.images || []; // 👈 safety fallback

    let imagesHTML = "";

    images.forEach(img => {
        imagesHTML += `
            <img src="${img}"
                 alt="${tab.title}"
                 onclick="openLightbox('${img}')">
        `;
    });

    card.innerHTML = `
        <h3>${tab.title}</h3>
        <div class="tab-images">
            ${imagesHTML}
        </div>
    `;

    return card;
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

    lightbox.addEventListener("click", () => {
        lightbox.classList.add("hidden");
        lightboxImg.src = "";
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