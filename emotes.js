/* -------------------------------------------------
   Dynamically load every file in the emotes/ folder
   using GitHub’s REST API, then render the grid.

   ► CHANGE the OWNER, REPO and BRANCH constants once.
   ------------------------------------------------- */

/* 1️⃣  YOUR SETTINGS */
const OWNER  = 'Anzhc';     // GitHub username or org
const REPO   = 'emotes-gallery-for-chat';     // Repository name
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

  const img = document.createElement('img');
  img.src = src;
  img.alt = name;

  const cap = document.createElement('figcaption');
  cap.textContent = name;

  fig.append(img, cap);
  gallery.append(fig);
}

/* -------------- Kick things off ---------------- */
loadEmotes();
