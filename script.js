let currentPage = 0;
let pages = [];
const book = document.getElementById('book');
const toc = document.getElementById('toc');

// Lista dei file Markdown (capitoli)
const chapters = [
    'chapters/capitolo1.md',
    'chapters/capitolo2.md',
    'chapters/capitolo3.md'
];

// Funzione per caricare un file Markdown
async function loadMarkdown(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Errore nel caricamento del file: ${url}`);
    return response.text();
}

// Funzione per creare una pagina dal contenuto Markdown
function createPage(content) {
    const page = document.createElement('div');
    page.classList.add('page');
    page.innerHTML = `<div class="content">${marked.parse(content)}</div>`;
    return page;
}

// Funzione per caricare tutti i capitoli e inizializzare il libro
async function initBook() {
    for (let i = 0; i < chapters.length; i++) {
        const content = await loadMarkdown(chapters[i]);
        const page = createPage(content);
        book.appendChild(page);
        pages.push(page);

        // Aggiungi un link all'indice
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = `Capitolo ${i + 1}`;
        link.onclick = () => goToPage(i);
        toc.appendChild(link);
        if (i < chapters.length - 1) toc.appendChild(document.createTextNode(' | '));
    }
    showPage(0); // Mostra la prima pagina
}

// Funzione per mostrare una pagina specifica
function showPage(index) {
    pages.forEach((page, i) => {
        page.classList.toggle('active', i === index);
    });
    currentPage = index;
}

// Funzione per passare alla pagina successiva
function nextPage() {
    if (currentPage < pages.length - 1) {
        showPage(currentPage + 1);
    }
}

// Funzione per tornare alla pagina precedente
function prevPage() {
    if (currentPage > 0) {
        showPage(currentPage - 1);
    }
}

// Funzione per andare a una pagina specifica
function goToPage(index) {
    showPage(index);
}

// Inizializza il libro al caricamento della pagina
window.onload = initBook;