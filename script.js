const SUPABASE_URL = "https://bbixsobnhcoyikvodxdg.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_337gZQxl2pqu6OvNkoeDOQ_lG0xgdc9";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

/* ---------------- SEARCH (SAFE) ---------------- */

const searchBar = document.querySelector(".search-bar");

if (searchBar) {
  searchBar.addEventListener("input", () => {

    const searchValue = searchBar.value.toLowerCase();

    document.querySelectorAll(".book-link").forEach((book) => {

      const title = book.querySelector("h3")?.textContent?.toLowerCase() || "";

      if (title.includes(searchValue)) {
        book.style.display = "block";
      } else {
        book.style.display = "none";
      }

    });

  });
}

/* ---------------- GENRE FILTER (SAFE) ---------------- */

const genreButtons = document.querySelectorAll(".genre-btn");

if (genreButtons.length > 0) {

  genreButtons.forEach((button) => {

    button.addEventListener("click", () => {

      genreButtons.forEach((btn) => btn.classList.remove("active"));

      button.classList.add("active");

      const genre = button.textContent.toLowerCase();

      document.querySelectorAll(".book-link").forEach((book) => {

        const title = book.querySelector("h3")?.textContent?.toLowerCase() || "";

        if (
          genre === "all" ||
          (genre === "fantasy" && title.includes("lantern")) ||
          (genre === "horror" && title.includes("rain")) ||
          (genre === "philosophy" && title.includes("fragments")) ||
          (genre === "romance" && title.includes("fragments")) ||
          (genre === "sci-fi" && title.includes("lantern"))
        ) {
          book.style.display = "block";
        } else {
          book.style.display = "none";
        }

      });

    });

  });

}

/* ---------------- SCROLL REVEAL (SAFE) ---------------- */

const hiddenElements = document.querySelectorAll(
  ".book-card, .continue-reading, .hero-content, .chapter-container"
);

if (hiddenElements.length > 0) {

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }

    });

  });

  hiddenElements.forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });

}

/* ---------------- LOGIN ---------------- */

async function loginUser(email, password) {

  console.log("Login Clicked");

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password
    });

  if (error) {
    alert(error.message);
  } else {
    alert("Login successful!");
    window.location.href = "index.html";
  }

}

function handleLogin() {

  const email = document.querySelector('input[type="email"]')?.value;
  const password = document.querySelector('input[type="password"]')?.value;

  loginUser(email, password);

}

/* ---------------- GITHUB LOGIN ---------------- */

async function loginWithGitHub() {

  const { data, error } =
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://127.0.0.1:5500/index.html"
      }
    });

  if (error) {
    alert(error.message);
  }

}
