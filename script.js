const booksListContainer = document.querySelector(".books-list");
const form = document.querySelector(".form");

let books = [];
if (localStorage.getItem("books")) {
  books = JSON.parse(localStorage.getItem("books"));
}

function loadItems(booksArr) {
  const booksList = booksArr.map(
    (bk) => `<li class="book">
<p>${bk.title}</p>
 <p>${bk.author}</p>
 <button class="btn btn-remove" data-id="${bk.id}">Remove</button>
<hr />
</li>`,
  );

  booksListContainer.innerHTML = booksList;
}

loadItems(books);

function appendBook(bookObj) {
  const listItem = `<li class="book">
<p>${bookObj.title}</p>
 <p>${bookObj.author}</p>
 <button class="btn btn-remove" data-id="${bookObj.id}">Remove</button>
<hr />
</li>`;

  booksListContainer.insertAdjacentHTML("beforeend", listItem);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {};
  const title = e.target.title.value;
  const author = e.target.author.value;

  formData.title = title.trim();
  formData.author = author.trim();
  formData.id = `${new Date().getTime().toString()}${Math.trunc(Math.random() * 100)}`;

  if (!title || !author) return;

  //   Clear inputs
  e.target.title.value = "";
  e.target.author.value = "";

  //   Add book
  books.push(formData);

  //   Save to local storage
  //   console.log(JSON.stringify(books));
  localStorage.setItem("books", JSON.stringify(books));

  //   Append book UI
  appendBook(formData);
});

booksListContainer.addEventListener("click", (e) => {
  const clickedButton = e.target.closest(".btn-remove");

  if (!clickedButton) return;

  const { id } = clickedButton.dataset;

  books = books.filter((book) => book.id !== id);

  //   Save to local
  localStorage.setItem("books", JSON.stringify(books));

  //   Load Items UI
  loadItems(books);
});
