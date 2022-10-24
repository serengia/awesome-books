const booksListContainer = document.querySelector(".books-list");
const form = document.querySelector(".form");

let removeButtons;
let removeButtonsArr;
let updatedArr = [];

let books = [
  {
    id: "1",
    title: "book1",
    author: "auth1",
  },
  {
    id: "2",
    title: "book2",
    author: "auth2",
  },
  {
    id: "3",
    title: "book3",
    author: "auth3",
  },
  {
    id: "4",
    title: "book4",
    author: "auth4",
  },
];

const addBook = (formData) => {
  books.push(formData);

  injectList(books);
};

const removeBook = (id) => {
  books = books.filter((book) => book.id !== id);

  console.log(JSON.stringify(books));

  injectList(books);
};

function injectList(passedArr) {
  if (passedArr.length > 0) {
    const listItems = books
      .map(
        (bk) => ` <li class="book">
        <p>${bk.title}</p>
         <p>${bk.author}</p>
         <button class="btn btn-remove" data-id="${bk.id}">Remove</button>
        <hr />
</li>`
      )
      .join("");

    // Inject to dom
    booksListContainer.innerHTML = listItems;
  }

  eventListenerHandler();
}

injectList(books);

const getAndDisplay = () => {
  // Step 1: Get and prepare data
  const formData = {};

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formDataRow = new FormData(form);

    for (const [key, value] of formDataRow) {
      formData[key] = value;
    }

    formData.id =
      new Date().getTime().toString() + `${Math.trunc(Math.random() * 1000)}`;

    console.log(JSON.stringify(formData));

    //   Step 2: Display
    addBook(formData);
  });
};

getAndDisplay();

function eventListenerHandler() {
  booksListContainer.addEventListener("click", (e) => {
    const clickedButton = e.target.closest(".btn-remove");

    if (!clickedButton) return;

    const id = e.target.dataset.id;

    removeBook(id);
  });
}
