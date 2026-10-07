// Select elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");

// Store notes in an array
const notes = [];

// Render notes
function render() {
    notesList.textContent = "";

    notes.forEach((note) => {
        const listItem = document.createElement("li");
        listItem.classList.add("note-card");

        // Add category class
        const categoryClass = `category-${note.category.toLowerCase()}`;
        listItem.classList.add(categoryClass);

        // Note category
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
            const noteIndex = notes.findIndex(
                (item) => item.id === note.id
            );

            if (noteIndex !== -1) {
                notes.splice(noteIndex, 1);
                render();
            }
        });

        // Add elements to note card
        listItem.appendChild(categoryLabel);
        listItem.appendChild(noteText);
        listItem.appendChild(date);
        listItem.appendChild(deleteButton);

        // Add note card to list
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

    // Validate note length
    if (text.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
        return;
    }

    // Clear previous error
    errorMessage.textContent = "";

    // Create note object
    const note = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    // Add note to array
    notes.push(note);

    // Re-render notes
    render();

    // Clear input
    noteInput.value = "";
});

// Initial render
render();