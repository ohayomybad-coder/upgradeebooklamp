/* ---------------- SUPABASE CONFIG ---------------- */
const SUPABASE_URL = "https://xynifkjnvxcybhnkfqka.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5bmlma2pudnhjeWJobmtmcWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NDczNTYsImV4cCI6MjA5NDMyMzM1Nn0.DIcLUpP5XtTTTmBCLveZ-sxUyIwRd9QBPct79LTmXQk";

// Initialize Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ---------------- LOGIN LOGIC ---------------- */
async function handleLogin() {
  // These IDs must match the ones in your login.html
  const email = document.getElementById('login-email')?.value;
  const password = document.getElementById('login-password')?.value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  console.log("Attempting to enter Noctara...");

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    alert("Login Error: " + error.message);
  } else {
    alert("Welcome back to Noctara!");
    window.location.href = "index.html"; 
  }
}

/* ---------------- GITHUB LOGIN ---------------- */
async function loginWithGitHub() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      // This fix ensures it works on GitHub Pages subfolders
      redirectTo: window.location.origin + window.location.pathname.replace('login.html', 'index.html')
    }
  });
  
  if (error) alert(error.message);
}

/* ---------------- THE SHINE (SEARCH FILTER) ---------------- */
const searchBar = document.querySelector(".search-bar");
if (searchBar) {
  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const books = document.querySelectorAll(".book-link");
    
    books.forEach(book => {
      const title = book.querySelector("h3").innerText.toLowerCase();
      if (title.includes(query)) {
        book.style.display = "block";
      } else {
        book.style.display = "none";
      }
    });
  });
}

/* ---------------- THE SHINE (GENRE FILTER) ---------------- */
const genreBtns = document.querySelectorAll(".genre-btn");
genreBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active class from all and add to clicked
    genreBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    const selectedGenre = btn.innerText.toLowerCase();
    const books = document.querySelectorAll(".book-link");

    books.forEach(book => {
      const title = book.querySelector("h3").innerText.toLowerCase();
      if (selectedGenre === "all") {
        book.style.display = "block";
      } else if (selectedGenre === "fantasy" && title.includes("lantern")) {
        book.style.display = "block";
      } else if (selectedGenre === "horror" && title.includes("rain")) {
        book.style.display = "block";
      } else if (selectedGenre === "philosophy" && title.includes("fragments")) {
        book.style.display = "block";
      } else {
        book.style.display = "none";
      }
    });
  });
});
