// 1. SUPABASE CONNECTION
const SUPABASE_URL = "https://bbixsobnhcoyikvodxdg.supabase.co";
const SUPABASE_ANON_KEY = "EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiaXhzb2JuaGNveWlrdm9keGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njc2MTQsImV4cCI6MjA5NDM0MzYxNH0.Ogx2agY-KVRKoRnl4kYhJy5G4_da0rqzRgIxqRr52TM";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentShine = 0;

// 2. INITIALIZE PAGE
async function init() {
    // Check if a user is actually logged in
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        // If not logged in, send them back to login page
        window.location.href = "login.html";
        return;
    }

    // UPDATE PROFILE IMAGES
    // This puts your GitHub/User photo in the Nav and the "YOU" story circle
    if (user.user_metadata.avatar_url) {
        const userImg = user.user_metadata.avatar_url;
        document.getElementById('avatarImg').src = userImg;
        document.getElementById('storyAvatar').src = userImg;
    }

    // Load your saved Shine points from the database
    loadUserData(user.id);
}

// 3. DATABASE: LOAD DATA
async function loadUserData(userId) {
    let { data, error } = await supabase
        .from('profiles')
        .select('shine_points')
        .eq('id', userId)
        .single();

    if (data) {
        currentShine = data.shine_points;
        updateUI();
    } else {
        // If it's a brand new user, create their row in the database
        await supabase.from('profiles').insert({ id: userId, shine_points: 0 });
    }
}

// 4. UI: UPDATE DISPLAY
function updateUI() {
    const display = document.getElementById('shineDisplay');
    if (display) {
        display.innerText = currentShine;
    }
}

// 5. ACTION: INCREASE & SAVE SHINE
document.getElementById('increaseShine').onclick = async () => {
    currentShine++;
    updateUI();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        // This saves the number to your Supabase table instantly
        await supabase
            .from('profiles')
            .update({ shine_points: currentShine })
            .eq('id', user.id);
    }
};

// 6. ACTION: LOGOUT
document.getElementById('logoutBtn').onclick = async () => {
    await supabase.auth.signOut();
    window.location.href = "login.html";
};

// Start the script
init();
