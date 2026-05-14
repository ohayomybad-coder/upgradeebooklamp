/* ---------------- SUPABASE CONFIG ---------------- */
const SUPABASE_URL = "https://xynifkjnvxcybhnkfqka.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5bmlma2pudnhjeWJobmtmcWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NDczNTYsImV4cCI6MjA5NDMyMzM1Nn0.DIcLUpP5XtTTTmBCLveZ-sxUyIwRd9QBPct79LTmXQk";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ---------------- GITHUB LOGIN ---------------- */
async function loginWithGitHub() {
    console.log("Connecting to GitHub...");
    
    // This auto-detects your current URL to handle the redirect correctly
    const redirectUrl = window.location.origin + window.location.pathname.replace('login.html', 'index.html');

    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: redirectUrl
        }
    });

    if (error) alert("GitHub Error: " + error.message);
}

/* ---------------- EMAIL LOGIN ---------------- */
async function handleLogin() {
    const email = document.getElementById('login-email')?.value;
    const password = document.getElementById('login-password')?.value;

    if (!email || !password) return alert("Enter credentials");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) alert(error.message);
    else window.location.href = "index.html";
}

/* ---------------- SEARCH & FILTERS (THE SHINE) ---------------- */
const searchBar = document.querySelector(".search-bar");
if (searchBar) {
    searchBar.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll(".book-link").forEach(book => {
            const title = book.querySelector("h3").innerText.toLowerCase();
            book.style.display = title.includes(query) ? "block" : "none";
        });
    });
}
