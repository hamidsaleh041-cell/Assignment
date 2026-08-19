const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backTop = document.getElementById("backTop");
const progress = document.getElementById("scrollProgress");

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

backTop?.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

function updateProgress() {
  const top = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height ? (top / height) * 100 : 0}%`;
}
window.addEventListener("scroll", updateProgress, {passive:true});
updateProgress();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const offset = window.innerWidth < 701 ? 72 : 80;
    window.scrollTo({top: target.getBoundingClientRect().top + window.scrollY - offset, behavior:"smooth"});
  });
});
