const SUPABASE_URL = "https://xynifkjnvxcybhnkfqka.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_337gZQxl2pqu6OvNkoeDOQ_lG0xgdc9";

// Check if supabase loaded correctly from the CDN
const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

/* ---------------- LOGIN ---------------- */
async function handleLogin() {
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');

  if (!emailInput || !passwordInput) return;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Welcome back!");
    window.location.href = "index.html";
  }
}

/* ---------------- SEARCH ---------------- */
const searchBar = document.querySelector(".search-bar");
if (searchBar) {
  searchBar.addEventListener("input", () => {
    const searchValue = searchBar.value.toLowerCase();
    document.querySelectorAll(".book-link").forEach((book) => {
      const title = book.querySelector("h3")?.textContent?.toLowerCase() || "";
      book.style.display = title.includes(searchValue) ? "block" : "none";
    });
  });
}

/* ---------------- GENRE FILTER ---------------- */
const genreButtons = document.querySelectorAll(".genre-btn");
genreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    genreButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    
    const genre = button.textContent.toLowerCase();
    document.querySelectorAll(".book-link").forEach((book) => {
      const title = book.querySelector("h3")?.textContent?.toLowerCase() || "";
      if (genre === "all" || title.includes(genre)) {
        book.style.display = "block";
      } else {
        // Simple logic for your specific titles
        if (genre === "fantasy" && title.includes("lantern")) book.style.display = "block";
        else if (genre === "horror" && title.includes("rain")) book.style.display = "block";
        else book.style.display = "none";
      }
    });
  });
});
