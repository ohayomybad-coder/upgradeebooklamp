const SUPABASE_URL = "https://bbixsobnhcoyikvodxdg.supabase.co";
const SUPABASE_ANON_KEY = "EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiaXhzb2JuaGNveWlrdm9keGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njc2MTQsImV4cCI6MjA5NDM0MzYxNH0.Ogx2agY-KVRKoRnl4kYhJy5G4_da0rqzRgIxqRr52TM";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentShine = 0;

async function init() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Set Header Avatar from GitHub if available
    if (user.user_metadata.avatar_url) {
        document.getElementById('avatarImg').src = user.user_metadata.avatar_url;
    }

    renderStories(user);
    loadUserData(user.id);
}

function renderStories(user) {
    const userAvatar = user.user_metadata.avatar_url || "https://via.placeholder.com/150";
    
    // THE 3 STORIES + YOU
    const stories = [
        { name: "Your Story", img: userAvatar, active: true },
        { name: "The Void", img: "https://images.unsplash.com/photo-1519681393784-d120267953ba?w=150" },
        { name: "Neon", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=150" },
        { name: "Ethereal", img: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=150" }
    ];

    const list = document.getElementById('storyList');
    list.innerHTML = stories.map(s => `
        <div class="story-item">
            <div class="story-circle">
                <img src="${s.img}" alt="${s.name}">
            </div>
            <p class="story-name">${s.name.toUpperCase()}</p>
        </div>
    `).join('');
}

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
        // Create profile if first login
        await supabase.from('profiles').insert({ id: userId, shine_points: 0 });
    }
}

function updateUI() {
    document.getElementById('shineDisplay').innerText = currentShine;
}

document.getElementById('increaseShine').onclick = async () => {
    currentShine++;
    updateUI();
    const { data: { user } } = await supabase.auth.getUser();
    // Update Supabase
    await supabase.from('profiles').update({ shine_points: currentShine }).eq('id', user.id);
};

document.getElementById('logoutBtn').onclick = async () => {
    await supabase.auth.signOut();
    window.location.href = "login.html";
};

init();
