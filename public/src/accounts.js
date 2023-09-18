// Create a function that takes in 2 args
// - An array of account objects.
// - A string ID of a single account object.
// return the object with the matching string(ID)


const findAccountById = (accounts, id) => {
  let found = accounts.find((account) => account.id === id);
  return found;
}

// create a function that takes in 1 arg
// - An array of objects
// SORT thru the array to find the last names 
// arrange the last names alphabetically 
// return the array Sorted

const sortAccountsByLastName = (accounts) => {
  accounts.sort((accountA, accountB) => {
    const lastNameA = accountA.name.last;
    const lastNameB = accountB.name.last;

    if (lastNameA < lastNameB) return -1;
    if (lastNameA > lastNameB) return 1;
    return 0;
  });

  return accounts;
}

// Create a function that takes in 2 args
// - An account object.
// - An array of all book objects.
// Loop through each book in the array of books
// Access the borrows property of each book
// Loop through the borrows array of each book
// Check if the id of the account matches the id in the borrow record
// If there is a match, increment the totalBorrows counter
// Return the final total of borrows for the account

const getTotalNumberOfBorrows = (account, books) => {
  let totalBorrows = 0;
   
  for (const bookIndex in books) {
    const borrows = books[bookIndex].borrows;

    for (const borrowIndex in borrows) {
      if (borrows[borrowIndex].id === account.id) {
        totalBorrows++;
      }
    }
  }

  return totalBorrows;
}        

// Creat a function that takes in 3 args
// - An account object.
// - An array of all book objects.
// - An array of all author objects.
// Create an empty array to store the checked-out books.
// Loop over the books array using a for/in loop.
// Check if the book has the "borrows" property.
// Check if there are any borrow records for this book.
// Get the most recent borrow record (the first one in the array).
// Check if the book is currently checked out by the given account.
// Find the author information for this book.
// Create a new book object with author information and push it to the result array.

function getBooksPossessedByAccount(account, books, authors) {
  
  const checkedOutBooks = [];

  for (const bookIndex in books) {
    const book = books[bookIndex];
    
    if (book.hasOwnProperty("borrows")) {
      const { borrows } = book;

      if (borrows && borrows.length > 0) {
        const mostRecentBorrow = borrows[0];

        if (mostRecentBorrow.id === account.id && !mostRecentBorrow.returned) {
          const author = authors.find((author) => author.id === book.authorId);

          const checkedOutBook = {
            ...book, 
            author,
          };

          checkedOutBooks.push(checkedOutBook);
        }
      }
    }
  }

  return checkedOutBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
