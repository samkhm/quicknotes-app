# QuickNotes

QuickNotes is a simple browser-based note-taking application built with HTML, CSS, and vanilla JavaScript. It allows users to create and organize notes under Personal, Work, and Study categories, search through saved notes, delete notes, and keep their notes stored in the browser using localStorage.

## Features

* Add notes with Personal, Work, or Study categories
* Display notes as individual cards
* Delete individual notes
* Validate notes before adding them
* Limit notes to 200 characters
* Search notes in real time
* Case-insensitive note searching
* Display the total number of notes
* Save notes to localStorage
* Load saved notes after refreshing the page
* Responsive layout for smaller screens
* Category-specific styling

## How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/samkhm/quicknotes-app.git
```

2. Navigate into the project:

```bash
cd quicknotes-app
```

3. Open `index.html` in your web browser.

No external dependencies or package installation are required.

## What I Learned

* I learned how to use semantic HTML elements to create a well-structured web page.
* I learned how to use CSS Flexbox and media queries to create responsive layouts.
* I learned how to manipulate the DOM using JavaScript `createElement()`, `appendChild()`, and `textContent`.
* I learned how to store arrays of objects in localStorage using `JSON.stringify()` and retrieve them using `JSON.parse()`.
* I learned how to use JavaScript array methods such as `forEach()`, `filter()`, and `findIndex()` to manage application data.
