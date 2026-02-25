(function() {
  const container = document.getElementById('reacties-widget');
  if (!container) return;

  container.innerHTML = `
    <style>
      .rw-feed { font-family: 'Flama', Arial, sans-serif; max-width: 420px; width: 100%; }
      .rw-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 2px solid #D10A10; }
      .rw-header .rw-icon { font-size: 20px; }
      .rw-header h2 { font-size: 15px; color: #222; margin: 0; }
      .rw-header .rw-count { margin-left: auto; font-size: 12px; color: #999; }
      .rw-window { position: relative; overflow: hidden; }
      .rw-reaction { display: flex; gap: 10px; padding: 12px 0; border-bottom: 1px solid #eee; animation: rwFadeIn 0.5s ease forwards; }
      @keyframes rwFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      .rw-reaction.rw-fading { animation: rwFadeOut 0.4s ease forwards; }
      @keyframes rwFadeOut { from { opacity: 1; max-height: 200px; } to { opacity: 0; max-height: 0; padding: 0; margin: 0; overflow: hidden; } }
      .rw-avatar { width: 32px; height: 32px; border-radius: 50%; background: #f0f0f0; display: flex; align-items: center; justify-content: center; font-size: 13px; color: #999; flex-shrink: 0; font-weight: 600; }
      .rw-bubble { flex: 1; }
      .rw-bubble .rw-name { font-size: 12px; font-weight: 700; color: #555; margin-bottom: 2px; }
      .rw-bubble .rw-text { font-size: 13px; color: #222; line-height: 1.45; background: #f7f7f7; padding: 8px 12px; border-radius: 4px 12px 12px 12px; }
      .rw-bubble .rw-meta { display: flex; gap: 12px; margin-top: 4px; font-size: 10px; color: #aaa; }
      .rw-bubble .rw-meta .rw-likes { color: #D10A10; font-weight: 600; }
    </style>
    <div class="rw-feed">
      <div class="rw-header">
        <span class="rw-icon">💬</span>
        <h2>Reacties op aanstelling Jaimi van Essen</h2>
        <span class="rw-count" id="rw-counter">0 / 7</span>
      </div>
      <div class="rw-window" id="rw-window"></div>
    </div>
  `;

  const reactions = [
    { name: "Jan", text: "Nul ervaring, nul verstand en nooit een echte baan gehad! Lachwekkend!", time: "2 min.", likes: 34 },
    { name: "Henk", text: "Alweer zo'n onervaren zelfingenomen bureaucraat waarvan iedereen weet dat dit op drama uitloopt.", time: "3 min.", likes: 52 },
    { name: "Peter", text: "Hoe kan hij nou bijdragen aan natuurherstel als hij daar helemaal geen verstand van heeft. Dat is hetzelfde als Hugo de Jonge die de prikken promootte.", time: "5 min.", likes: 41 },
    { name: "Marieke", text: "Wat een vreselijke foto, iemand die zo lacht wantrouw ik meteen...", time: "6 min.", likes: 18 },
    { name: "Willem", text: "Nou, deze mag van mij meteen weer weg. Wat een droeftoeter. Nooit iets gehoord, gezien en maar zwijgen. Onder welke steen komt deze vandaan.", time: "8 min.", likes: 67 },
    { name: "Frank", text: "Is zijn CV al doorgelicht?", time: "10 min.", likes: 23 },
    { name: "Gerard", text: "Op naar het wachtgeld 💰", time: "12 min.", likes: 89 }
  ];

  const win = document.getElementById('rw-window');
  const counter = document.getElementById('rw-counter');
  const total = reactions.length;
  let index = 0;

  function createEl(r) {
    const div = document.createElement('div');
    div.className = 'rw-reaction';
    div.innerHTML = `
      <div class="rw-avatar">${r.name.charAt(0)}</div>
      <div class="rw-bubble">
        <div class="rw-name">${r.name}</div>
        <div class="rw-text">${r.text}</div>
        <div class="rw-meta">
          <span>${r.time}</span>
          <span class="rw-likes">❤️ ${r.likes}</span>
        </div>
      </div>
    `;
    return div;
  }

  function showNext() {
    const children = win.querySelectorAll('.rw-reaction:not(.rw-fading)');
    if (children.length >= 2) {
      const oldest = children[0];
      oldest.classList.add('rw-fading');
      oldest.addEventListener('animationend', () => oldest.remove());
    }
    const r = reactions[index % total];
    win.appendChild(createEl(r));
    index++;
    counter.textContent = `${((index - 1) % total) + 1} / ${total}`;
    setTimeout(showNext, 2500);
  }

  setTimeout(showNext, 600);
})();
