// Starting data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. searchNotes(word)
// Returns notes whose text contains word, ignoring case
function searchNotes(word) {
  const searchTerm = word.toLowerCase();
  return notes.filter((note) => note.text.toLowerCase().includes(searchTerm));
}

// 2. longestNote()
// Returns the note object with the most characters, or null if empty
function longestNote() {
  if (notes.length === 0) return null;
  
  let longest = notes[0];
  for (const note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }
  return longest;
}

// 3. countByCategory()
// Returns an object counting notes per category
function countByCategory() {
  const counts = { personal: 0, work: 0, study: 0 };
  for (const note of notes) {
    if (counts[note.category] !== undefined) {
      counts[note.category]++;
    } else {
      counts[note.category] = 1;
    }
  }
  return counts;
}

// 4. getSummary()
// Returns a summary sentence using countByCategory
function getSummary() {
  const total = notes.length;
  const word = total === 1 ? "note" : "notes";
  const counts = countByCategory();
  return `${total} ${word}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
}

// 5. isDuplicate(text)
// Returns true if text exists (ignoring case and extra spaces)
function isDuplicate(text) {
  const cleaned = text.trim().toLowerCase();
  return notes.some((note) => note.text.trim().toLowerCase() === cleaned);
}

// 6. addNote(text, category)
// Adds a note if valid, non-duplicate, and has valid category
function addNote(text, category) {
  const cleanedText = text.trim();
  const validCategories = ["personal", "work", "study"];

  if (cleanedText.length < 1 || cleanedText.length > 200) {
    console.log("❌ Rejected: Note must be between 1 and 200 characters.");
    return false;
  }

  if (isDuplicate(cleanedText)) {
    console.log("❌ Rejected: Duplicate note text.");
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log("❌ Rejected: Invalid category.");
    return false;
  }

  const newNote = {
    id: Date.now(),
    text: cleanedText,
    category: category,
  };

  notes.push(newNote);
  console.log(`✅ Added: "${newNote.text}"`);
  return true;
}

// --- TESTS ---

// 1. searchNotes
console.log("searchNotes ('day'):", searchNotes("day")); 
// Expected output: Array with 1 item: [{ id: 2, text: "Finish the Day 3 assignment", category: "study" }]
console.log("searchNotes ('xyz'):", searchNotes("xyz")); 
// Expected output: []

// 2. longestNote
console.log("longestNote():", longestNote()); 
// Expected output: Object { id: 2, text: "Finish the Day 3 assignment", category: "study" }
notes = []; // Temporary clear to test edge case
console.log("longestNote (empty):", longestNote()); 
// Expected output: null

// Restore original notes for remaining tests
notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 3. countByCategory
console.log("countByCategory():", countByCategory()); 
// Expected output: { personal: 2, work: 1, study: 2 }
const emptyCountsNotes = [];
console.log("countByCategory (initial):", countByCategory()); 
// Expected output: { personal: 2, work: 1, study: 2 }

// 4. getSummary
console.log("getSummary():", getSummary()); 
// Expected output: "5 notes: 2 personal, 1 work, 2 study."
const singleNoteBackup = [...notes];
notes = [{ id: 1, text: "Solo note", category: "work" }];
console.log("getSummary (1 note):", getSummary()); 
// Expected output: "1 note: 0 personal, 1 work, 0 study."
notes = [...singleNoteBackup]; // Restore

// 5. isDuplicate
console.log("isDuplicate ('Call mum'):", isDuplicate("Call mum")); 
// Expected output: true
console.log("isDuplicate ('Buy coffee'):", isDuplicate("Buy coffee")); 
// Expected output: false

// 6. addNote
console.log("addNote (normal):", addNote("Buy coffee", "personal")); 
// Expected output: ✅ Added: "Buy coffee", returns true
console.log("addNote (duplicate):", addNote("Call mum", "personal")); 
// Expected output: ❌ Rejected: Duplicate note text., returns false
console.log("addNote (invalid category):", addNote("Gym", "fitness")); 
// Expected output: ❌ Rejected: Invalid category., returns false