// Select elements
const noteText = document.getElementById('note-text');
const charCount = document.getElementById('char-count');
const wordCount = document.getElementById('word-count');
const clearBtn = document.getElementById('clear-btn');
const themeToggle = document.getElementById('theme-toggle');

// Update character and word counts + apply warning classes
function updateCounts() {
  const text = noteText.value;
  const numChars = text.length;

  // Calculate words (trim spaces and split by whitespace)
  const trimmed = text.trim();
  const numWords = trimmed === '' ? 0 : trimmed.split(/\s+/).length;

  // Update text output
  charCount.textContent = `${numChars} / 200 characters`;
  wordCount.textContent = `${numWords} ${numWords === 1 ? 'word' : 'words'}`;

  // Reset classes on character counter
  charCount.classList.remove('warning', 'over');

  // Apply appropriate warning classes
  if (numChars > 200) {
    charCount.classList.add('over');
  } else if (numChars > 180) {
    charCount.classList.add('warning');
  }
}

// Clear textarea, reset counts, and remove saved draft
function clearAll() {
  noteText.value = '';
  localStorage.removeItem('noteDraft');
  updateCounts();
}

// Event Listeners

// Input event on textarea
noteText.addEventListener('input', () => {
  updateCounts();
  localStorage.setItem('noteDraft', noteText.value);
});

// Keydown event on textarea (Clear on Escape key)
noteText.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    clearAll();
  }
});

// Clear button click
clearBtn.addEventListener('click', clearAll);

// Theme toggle click
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  
  themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Restore saved data on load
document.addEventListener('DOMContentLoaded', () => {
  // Restore draft
  const savedDraft = localStorage.getItem('noteDraft');
  if (savedDraft !== null) {
    noteText.value = savedDraft;
  }

  // Restore theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = 'Light mode';
  } else {
    document.body.classList.remove('dark');
    themeToggle.textContent = 'Dark mode';
  }

  // Initial count update
  updateCounts();
});