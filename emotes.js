/* --- Add each emote here --- */
const emotes = [
    { file: 'emotes/monkaS.gif',      name: 'monkaS'      },
    { file: 'emotes/peepoHappy.png',  name: 'peepoHappy'  },
    // { file: 'emotes/whatever.webp', name: 'whatever'  },
  ];
  
  /* ---- build the grid ---- */
  const gallery = document.getElementById('gallery');
  
  emotes.forEach(({file, name}) => {
    const fig = document.createElement('figure');
  
    const img = document.createElement('img');
    img.src = file;
    img.alt = name;
  
    const cap = document.createElement('figcaption');
    cap.textContent = name;
  
    fig.append(img, cap);
    gallery.append(fig);
  });
  