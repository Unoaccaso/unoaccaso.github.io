let currentPage = 0;
const pages = document.querySelectorAll('.page');

function showPage(index) {
    pages.forEach((page, i) => {
        page.classList.toggle('active', i === index);
    });
    currentPage = index;
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        showPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 0) {
        showPage(currentPage - 1);
    }
}

function goToPage(index) {
    showPage(index);
}

let currentPage = 0;
const pages = [];
const bookContainer = document.querySelector('.book');

function loadMarkdown(file, index) {
    fetch(file)
        .then(response => response.text())
        .then(markdown => {
            const htmlContent = marked(markdown); // Converte Markdown in HTML
            const pageElement = document.createElement('div');
            pageElement.classList.add('page');
            pageElement.innerHTML = htmlContent;
            pages.push(pageElement);
            bookContainer.appendChild(pageElement);
            if (index === 0) {
                pageElement.classList.add('active'); // Rende la prima pagina visibile
            }
        })
        .catch(error => console.error('Errore nel caricamento del file Markdown:', error));
}

// Funzione per gestire la visualizzazione della pagina
function showPage(index) {
    pages.forEach((page, i) => {
        page.classList.toggle('active', i === index);
    });
    currentPage = index;
}

// Funzione per la navigazione tra le pagine
function nextPage() {
    if (currentPage < pages.length - 1) {
        showPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 0) {
        showPage(currentPage - 1);
    }
}

function goToPage(index) {
    showPage(index);
}

// Carica i file Markdown (ad esempio "capitolo1.md", "capitolo2.md")
loadMarkdown('capitolo1.md', 0);
loadMarkdown('capitolo2.md', 1);
