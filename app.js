const site = window.SITE;

const el = (tag, className, html) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
};

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function renderHero() {
  const root = document.querySelector("#hero");
  root.innerHTML = `
    <div class="hero-copy card">
      <span class="eyebrow">Available for technical roles & collaborations</span>
      <h1>${escapeHtml(site.name)}</h1>
      <p class="lede">${escapeHtml(site.tagline)}</p>
      <div class="actions">
        <a class="button primary" href="${site.cvPath}" target="_blank" rel="noreferrer">Download CV</a>
        <a class="button" href="#contact">Contact me</a>
      </div>
    </div>
    <aside class="profile-card card" aria-label="Profile summary">
      <div class="profile-inner">
        <img class="profile-image" src="${site.profileImage}" alt="Portrait of ${escapeHtml(site.name)}" />
        <div class="stat-grid">
          ${site.stats.map(stat => `
            <div class="stat"><strong>${escapeHtml(stat.value)}</strong><span>${escapeHtml(stat.label)}</span></div>
          `).join("")}
        </div>
      </div>
    </aside>
  `;
}

function renderAbout() {
  document.querySelector("#about").innerHTML = `
    <div>
      <div class="section-label">About</div>
      <h2>${escapeHtml(site.title)}</h2>
    </div>
    <div class="panel card">
      ${site.summary.map(p => `<p>${escapeHtml(p)}</p>`).join("")}
      <div class="lab" aria-label="Theme lab">
        <button data-theme-button="linear">Linear violet</button>
        <button data-theme-button="ocean">Ocean blue</button>
        <button data-theme-button="ember">Ember orange</button>
        <button data-density-button>Toggle density</button>
      </div>
    </div>
  `;
}

function renderExperience() {
  document.querySelector("#experience").innerHTML = `
    <div class="section-label">Experience</div>
    <h2>Research and software work</h2>
    <div class="timeline">
      ${site.experience.map(item => `
        <article class="timeline-item card">
          <time>${escapeHtml(item.period)}</time>
          <div>
            <h3>${escapeHtml(item.role)}</h3>
            <p><strong>${escapeHtml(item.place)}</strong> · ${escapeHtml(item.detail)}</p>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderSkills() {
  document.querySelector("#skills").innerHTML = `
    <div class="section-label">Skills</div>
    <h2>Things I can work with</h2>
    <div class="skills-grid">
      ${site.skills.map(group => `
        <article class="skill-card card">
          <h3>${escapeHtml(group.title)}</h3>
          <div class="chips">
            ${group.items.map(item => `<span class="chip">${escapeHtml(item)}</span>`).join("")}
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderCv() {
  document.querySelector("#cv").innerHTML = `
    <div class="section-label">CV</div>
    <h2>Latest curriculum vitae</h2>
    <p class="lede">Embedded PDF preview. If the preview does not load on your device, use the download button.</p>
    <div class="actions" style="margin-bottom: 16px">
      <a class="button primary" href="${site.cvPath}" target="_blank" rel="noreferrer">Open PDF</a>
      <a class="button" href="${site.cvPath}" download>Download</a>
    </div>
    <iframe class="cv-frame" src="${site.cvPath}" title="CV PDF preview"></iframe>
  `;
}

function renderContact() {
  document.querySelector("#contact").innerHTML = `
    <div>
      <div class="section-label">Contact</div>
      <h2>Let’s talk</h2>
      <p class="lede">For research, software, mathematical modeling, or AI-related projects.</p>
    </div>
    <div class="link-grid">
      ${site.links.map(link => `
        <a class="contact-link" href="${link.href}" target="_blank" rel="noreferrer">
          <strong>${escapeHtml(link.label)}</strong>
          <small>${escapeHtml(link.note)}</small>
        </a>
      `).join("")}
    </div>
  `;
}

function enableThemeLab() {
  const savedTheme = localStorage.getItem("theme") || "linear";
  const savedDensity = localStorage.getItem("density") || "comfortable";
  if (savedTheme !== "linear") document.documentElement.dataset.theme = savedTheme;
  if (savedDensity === "compact") document.documentElement.dataset.density = "compact";

  document.querySelectorAll("[data-theme-button]").forEach(button => {
    button.addEventListener("click", () => {
      const theme = button.dataset.themeButton;
      if (theme === "linear") delete document.documentElement.dataset.theme;
      else document.documentElement.dataset.theme = theme;
      localStorage.setItem("theme", theme);
    });
  });

  document.querySelector("[data-density-button]").addEventListener("click", () => {
    const compact = document.documentElement.dataset.density !== "compact";
    if (compact) document.documentElement.dataset.density = "compact";
    else delete document.documentElement.dataset.density;
    localStorage.setItem("density", compact ? "compact" : "comfortable");
  });
}

renderHero();
renderAbout();
renderExperience();
renderSkills();
renderCv();
renderContact();
enableThemeLab();
document.querySelector("#year").textContent = new Date().getFullYear();
