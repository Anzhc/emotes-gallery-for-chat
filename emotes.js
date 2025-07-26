/* -------------------------------------------------
   Dynamically load every file in the emotes/ folder
   using GitHub’s REST API, then render the grid.

   ► CHANGE the OWNER, REPO and BRANCH constants once.
   ------------------------------------------------- */

/* 1️⃣  YOUR SETTINGS */
const OWNER  = 'your-username';     // GitHub username or org
const REPO   = 'emote-gallery';     // Repository name
const BRANCH = 'main';              // Branch GitHub Pages deploys from

/* 2️⃣  API URL built from the settings above */
const API = `https://api.github.com/repos/${OWNER}/${REPO}/contents/emotes?ref=${BRANCH}`;

/* 3️⃣  Where we’ll inject the <figure> elements */
const gallery = document.getElementById('gallery');

/* ---------------- Main loader ------------------ */
async function loadEmotes() {
  try {
    const response = await fetch(API);
    if (!response.ok) throw new Error(`GitHub API error ${response.status}`);

    const items = await response.json();           // Array of directory entries

    items
      .filter(item => item.type === 'file')        // ignore folders, if any
      .forEach(({ download_url, name }) => {
        const emoteName = stripExtension(name);
        addEmote(download_url, emoteName);
      });

  } catch (err) {
    console.error(err);
    gallery.textContent = '⚠️ Could not load emotes';
  }
}

/* -------------- Helper functions --------------- */
function stripExtension(filename) {
  return filename.replace(/\.[^.]+$/, '');         // remove .gif / .png / .webp …
}

function addEmote(src, name) {
  const fig = document.createElement('figure');

  /* image ------------------------------------------------ */
  const img = document.createElement('img');
  img.src = src;
  img.alt = name;

  /* caption row: “:name:” + copy button ------------------ */
  const cap   = document.createElement('figcaption');
  const label = document.createElement('span');
  label.textContent = `:${name}:`;

  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.type = 'button';
  btn.setAttribute('aria-label', `Copy :${name}:`);
  btn.innerHTML = '&#128203;';          // 📋 clipboard emoji

  btn.addEventListener('click', () => {
    const text = `:${name}:`;
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');      // green flash
      setTimeout(() => btn.classList.remove('copied'), 1000);
    });
  });

  cap.append(label, btn);
  fig.append(img, cap);
  gallery.append(fig);
}

/* -------------- Kick things off ---------------- */
loadEmotes();
