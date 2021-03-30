(() => {
  const e = {
    138: (e, t, n) => {
      const a = n(494); const o = n(712); const r = n(384); const
        c = document.getElementsByName('tabGroup1'); for (radio in c)c[radio].onclick = function () { this.id === 'tab1' ? a() : this.id === 'tab2' ? o() : this.id === 'tab3' && r(); };
    },
    494: (e) => {
      e.exports = function () {
        const e = document.getElementById('content'); e.innerHTML = ''; const t = document.createElement('h3'); const
          n = document.createElement('h3'); t.textContent = 'Tab 2 - Menu', n.textContent = 'Tab 3 - Contact', e.appendChild(t), e.appendChild(n);
      };
    },
    384: (e) => {
      e.exports = function () {
        const e = document.getElementById('content'); e.innerHTML = ''; const t = document.createElement('h3'); const n = document.createElement('p'); const a = document.createElement('h3'); const
          o = document.createElement('p'); t.textContent = 'Phone', a.textContent = 'Address', n.innerText = '1-555-123-4567', o.innerText = '123 Main St\nAnytown, USA  45678', e.appendChild(t), e.appendChild(n), e.appendChild(a), e.appendChild(o);
      };
    },
    712: (e) => { e.exports = function () { const e = document.getElementById('content'); e.innerHTML = ''; const t = document.createElement('img'); t.src = 'https://www.thedailymeal.com/sites/default/files/2019/09/11/HERO_Iconic_Breakfasts_shutterstock.jpg', t.height = '300'; const n = document.createElement('p'); n.textContent = 'Cinnamon Rolls'; const a = document.createElement('img'); a.src = 'https://www.spoonforkbacon.com/wp-content/uploads/2020/07/easy-baked-eggs-recipe-card.jpg', a.height = '300'; const o = document.createElement('p'); o.textContent = 'Breakfast Hash'; const r = document.createElement('img'); r.src = 'https://media.self.com/photos/5f189b76c58e27c99fbef9e3/4:3/w_400%2Cc_limit/blackberry-vanilla-french-toast.jpg', r.height = '300'; const c = document.createElement('p'); c.textContent = 'French Toast', e.appendChild(t), e.appendChild(n), e.appendChild(a), e.appendChild(o), e.appendChild(r), e.appendChild(c); }; },
  }; const
    t = {}; function n(a) { if (t[a]) return t[a].exports; const o = t[a] = { exports: {} }; return e[a](o, o.exports, n), o.exports; }n(138), n(494), n(712), n(384);
})();
