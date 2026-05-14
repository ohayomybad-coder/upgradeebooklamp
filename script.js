// SEARCH + FILTER SYSTEM

const searchBar = document.querySelector(".search-bar");

const genreButtons =
  document.querySelectorAll(".genre-btn");

const bookLinks =
  document.querySelectorAll(".book-link");

// SEARCH

searchBar.addEventListener("input", () => {

  const searchValue =
    searchBar.value.toLowerCase();

  bookLinks.forEach((book) => {

    const title =
      book.querySelector("h3")
      .textContent
      .toLowerCase();

    if(title.includes(searchValue)){

      book.style.display = "block";

    } else {

      book.style.display = "none";

    }

  });

});

// GENRE FILTER

genreButtons.forEach((button) => {

  button.addEventListener("click", () => {

    genreButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const genre =
      button.textContent.toLowerCase();

    bookLinks.forEach((book) => {

      const title =
        book.querySelector("h3")
        .textContent
        .toLowerCase();

      if(
        genre === "all" ||

        (genre === "fantasy" &&
          title.includes("lantern")) ||

        (genre === "horror" &&
          title.includes("rain")) ||

        (genre === "philosophy" &&
          title.includes("fragments")) ||

        (genre === "romance" &&
          title.includes("fragments")) ||

        (genre === "sci-fi" &&
          title.includes("lantern"))

      ){

        book.style.display = "block";

      } else {

        book.style.display = "none";

      }

    });

  });

});
// SCROLL REVEAL ANIMATION

const hiddenElements =
  document.querySelectorAll(
    ".book-card, .continue-reading, .hero-content, .chapter-container"
  );

const observer =
  new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if(entry.isIntersecting){

        entry.target.classList.add("show");

      }

    });

  });

hiddenElements.forEach((el) => {

  el.classList.add("hidden");

  observer.observe(el);

});
