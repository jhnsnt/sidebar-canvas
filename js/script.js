const searchInput = document.getElementById("searchInput");
const folderList = document.getElementById("folderList");
const canvasCards = document.querySelectorAll(".canvas-card");

// Search filter
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    canvasCards.forEach(card => {
        const title = card.querySelector("h4").textContent.toLowerCase();
        card.style.display = title.includes(value) ? "block" : "none";
    });
});

// Folder filter
folderList.addEventListener("click", e => {
    if (e.target.tagName !== "LI") return;
    document
    .querySelectorAll(".folders li")
    .forEach(li => li.classList.remove("active"));

    e.target.classList.add("active");

    const folder = e.target.dataset.folder;

    canvasCards.forEach(card => {
    card.style.display =
        folder === "all" || card.dataset.folder === folder
            ? "block"
            : "none";
    });
});

const libraryBtn = document.getElementById("libraryBtn");
const libraryView = document.getElementById("libraryView");
const canvasView = document.getElementById("canvasView");

libraryBtn.addEventListener("click", () => {
  libraryView.classList.toggle("hidden");
  canvasView.classList.toggle("hidden");
  const isLibraryOpen = !libraryView.classList.contains("hidden");

  if (isLibraryOpen) {
    libraryBtn.textContent = "Back to Canvas";
    libraryBtn.classList.remove("primary");
    libraryBtn.classList.add("secondary");
  } else {
    libraryBtn.textContent = "Open Library";
    libraryBtn.classList.remove("secondary");
    libraryBtn.classList.add("primary");
  }
});


let draggedCard = null;

// Drag start / end
canvasCards.forEach(card => {
    card.addEventListener("dragstart", () => {
        draggedCard = card;
        card.style.opacity = "0.5";
    });

    card.addEventListener("dragend", () => {
        draggedCard = null;
        card.style.opacity = "1";
    });
});

// Category drop zones
document.querySelectorAll(".category").forEach(category => {
    category.addEventListener("dragover", e => {
        e.preventDefault();
        category.classList.add("drag-over");
    });

    category.addEventListener("dragleave", () => {
        category.classList.remove("drag-over");
    });

    category.addEventListener("drop", e => {
        e.preventDefault();
        category.classList.remove("drag-over");

        if (!draggedCard) return;

        const newFolder = category.dataset.folder;

        // Move card into this category's grid
        category.querySelector(".canvas-grid").appendChild(draggedCard);

        // Update data-folder
        draggedCard.dataset.folder = newFolder;

        // Update visible label
        const label = draggedCard.querySelector("span");
        if (label) {
        label.textContent =
            newFolder.charAt(0).toUpperCase() + newFolder.slice(1);
        }
    });
});