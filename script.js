// Select elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");

// Storage key
const STORAGE_KEY = "quicknotes";

// Store notes in an array
let notes = [];

// Save notes to localStorage
function saveNotes() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Load notes from localStorage
function loadNotes() {
    const savedNotes = localStorage.getItem(STORAGE_KEY);

    if (savedNotes) {
        notes = JSON.parse(savedNotes);
    }
}

// Render notes
function render(notesToDisplay = notes) {
    notesList.textContent = "";

    if (notesToDisplay.length === 0 && searchInput.value.trim() !== "") {
        const noResults = document.createElement("li");
        noResults.textContent = "No notes match your search.";
        notesList.appendChild(noResults);

        updateCount();
        return;
    }

    notesToDisplay.forEach((note) => {
        const listItem = document.createElement("li");
        listItem.classList.add("note-card");

        // Add category class
        const categoryClass = `category-${note.category.toLowerCase()}`;
        listItem.classList.add(categoryClass);

        // Category label
        const categoryLabel = document.createElement("span");
        categoryLabel.classList.add("note-category");
        categoryLabel.textContent = note.category;

        // Note text
        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        // Note date
        const date = document.createElement("p");
        date.classList.add("note-date");
        date.textContent = note.createdAt;

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            notes = notes.filter((item) => item.id !== note.id);

            saveNotes();
            render(getFilteredNotes());
        });

        // Build note card
        listItem.appendChild(categoryLabel);
        listItem.appendChild(noteText);
        listItem.appendChild(date);
        listItem.appendChild(deleteButton);

        notesList.appendChild(listItem);
    });

    updateCount();
}

// Update note count
function updateCount() {
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}

// Get notes matching the search
function getFilteredNotes() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === "") {
        return notes;
    }

    return notes.filter((note) =>
        note.text.toLowerCase().includes(searchTerm)
    );
}

// Add a note
noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    // Validate empty note
    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    // Validate character limit
    if (text.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
        return;
    }

    // Clear error
    errorMessage.textContent = "";

    // Create note object
    const note = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    // Add note
    notes.push(note);

    // Save notes
    saveNotes();

    // Display notes
    render(getFilteredNotes());

    // Clear input
    noteInput.value = "";
});

// Search notes as the user types
searchInput.addEventListener("input", () => {
    render(getFilteredNotes());
});

// Load saved notes
loadNotes();

// Display notes
render();