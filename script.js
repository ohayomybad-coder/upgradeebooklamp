/* ---------------- SUPABASE CONFIG ---------------- */
const SUPABASE_URL = "https://xynifkjnvxcybhnkfqka.supabase.co"; //
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5bmlma2pudnhjeWJobmtmcWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NDczNTYsImV4cCI6MjA5NDMyMzM1Nn0.DIcLUpP5XtTTTmBCLveZ-sxUyIwRd9QBPct79LTmXQk";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ---------------- AUTHENTICATION ---------------- */
async function handleLogin() {
  const email = document.querySelector('input[type="email"]')?.value; //
  const password = document.querySelector('input[type="password"]')?.value; //

  if (!email || !password) return alert("Please enter your details.");

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert("Error: " + error.message);
  } else {
    window.location.href = "index.html"; 
  }
}

/* ---------------- READING PROGRESS ---------------- */
const progressBar = document.querySelector('.reading-progress'); //
if (progressBar) {
  window.addEventListener('scroll', () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.width = progress + '%';
  });
}

/* ---------------- SEARCH & FILTERS ---------------- */
const searchBar = document.querySelector(".search-bar"); //
if (searchBar) {
  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".book-link").forEach(book => {
      const title = book.querySelector("h3").innerText.toLowerCase();
      book.style.display = title.includes(query) ? "block" : "none";
    });
  });
}
