// INITIALIZATION
const SUPABASE_URL = "https://xynifkjnvxcybhnkfqka.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_337gZQxl2pqu6OvNkoeDOQ_lG0xgdc9";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// SESSION CHECK - Runs on every page load
async function checkUser() {
  const { data: { session } } = await supabase.auth.getSession();
  
  const authOnlyLinks = document.querySelectorAll('.auth-only');
  const loginLink = document.getElementById('login-link');
  const logoutBtn = document.getElementById('logout-btn');

  if (session) {
    // User is logged in
    authOnlyLinks.forEach(link => link.style.display = 'block');
    if (loginLink) loginLink.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'block';
    console.log("Logged in as:", session.user.email);
  } else {
    // User is logged out
    authOnlyLinks.forEach(link => link.style.display = 'none');
    if (loginLink) loginLink.style.display = 'block';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
}

checkUser();

// LOGIN LOGIC
async function handleLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert("Error: " + error.message);
  } else {
    window.location.href = "index.html";
  }
}

// GITHUB LOGIN (GitHub Pages Fix)
async function loginWithGitHub() {
  // This detects if you are in a subfolder on GitHub Pages
  const redirectUrl = window.location.origin + window.location.pathname.replace('login.html', 'index.html');
  
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: redirectUrl }
  });

  if (error) alert(error.message);
}

// LOGOUT
async function logout() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}

// SEARCH FILTER
const searchBar = document.querySelector(".search-bar");
if (searchBar) {
  searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    document.querySelectorAll(".book-link").forEach(card => {
      const title = card.querySelector("h3").innerText.toLowerCase();
      card.style.display = title.includes(query) ? "block" : "none";
    });
  });
}
