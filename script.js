// script.js
const papers = [
    { title: "Time as a Measure of Change: A Unified Theory of Temporal Dynamics", file: "papers/Time.pdf" },
    { title: "The Computational Nature of Human Existence: DNA as an Autonomous AI System", file: "papers/DNA.pdf" },
    { title: "Midi-chlorians: A New Perspective on Cellular Biology", file: "papers/midi-chlorians_cellular_biology.pdf" }
];

const papersList = document.getElementById('papersList');
let pdfViewer;

// Set up PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';

papers.forEach((paper, index) => {
    const li = document.createElement('li');
    li.textContent = paper.title;
    li.onclick = () => displayPaper(index);
    papersList.appendChild(li);
});

const pdfViewerContainer = document.getElementById('pdfViewerContainer');

async function displayPaper(index) {
    const paper = papers[index];
    try {
        // Clear the container before loading a new PDF
        pdfViewerContainer.innerHTML = '';

        // Load the PDF
        const loadingTask = pdfjsLib.getDocument(paper.file);
        const pdf = await loadingTask.promise;

        // Loop through all the pages and render them
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);

            // Set the scale and viewport
            const scale = 1.5;
            const viewport = page.getViewport({ scale });

            // Create a new canvas for each page
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            // Append the canvas to the container
            pdfViewerContainer.appendChild(canvas);

            // Render the page on the canvas
            const renderContext = {
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            };

            await page.render(renderContext).promise;
        }
    } catch (error) {
        console.error('Error loading PDF:', error);
        pdfViewerContainer.innerHTML = '<p>Error loading PDF</p>';
    }
}

// Display the first paper by default
displayPaper(0);
