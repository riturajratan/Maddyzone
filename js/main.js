"use strict";

// Content and project links remain usable without JavaScript.
document.documentElement.classList.add("has-js");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

function closeNavigation({ restoreFocus = false } = {}) {
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
  navMenu.classList.remove("is-open");
  if (restoreFocus) navToggle.focus();
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation" : "Close navigation",
  );
  navMenu.classList.toggle("is-open", !isOpen);
});

navMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeNavigation();
});

document.querySelector(".site-header .brand").addEventListener("click", () => {
  closeNavigation();
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    navToggle.getAttribute("aria-expanded") === "true"
  ) {
    closeNavigation({ restoreFocus: true });
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeNavigation();
});

window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
  if (event.matches) closeNavigation();
});

const filters = [...document.querySelectorAll("[data-filter]")];
const projects = [...document.querySelectorAll("[data-category]")];
const filterStatus = document.getElementById("filterStatus");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    filters.forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle("is-active", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });
    let visibleCount = 0;
    projects.forEach((project) => {
      const visible =
        category === "all" || project.dataset.category === category;
      project.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    filterStatus.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "project" : "projects"}.`;
  });
});

// Preserve the older Tools anchor, including when a filter has hidden its card.
function revealTools() {
  if (window.location.hash === "#tools") filters[0].click();
}
window.addEventListener("hashchange", revealTools);
revealTools();

if ("IntersectionObserver" in window) {
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = navLinks.find(
          (item) => item.hash === `#${entry.target.id}`,
        );
        if (link) {
          link.classList.toggle("is-current", entry.isIntersecting);
          if (entry.isIntersecting)
            link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        }
      });
    },
    { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
  );
  ["projects", "blog", "author"].forEach((id) =>
    observer.observe(document.getElementById(id)),
  );
}

document.getElementById("currentYear").textContent = String(
  new Date().getFullYear(),
);

// A fixed, labelled example illustrates the product without sending visitor data.
const aiExamples = {
  frontend: {
    experience: "Built responsive React dashboards and connected REST APIs.",
    role: "Frontend developer",
    skills: ["React", "Responsive UI", "REST APIs"],
    summary:
      "Frontend developer experienced in building responsive React dashboards and integrating REST APIs to deliver practical, connected interfaces.",
  },
  fullstack: {
    experience:
      "Built Node.js APIs, modelled PostgreSQL data, and shipped React screens.",
    role: "Full stack developer",
    skills: ["Node.js", "PostgreSQL", "React"],
    summary:
      "Full stack developer with experience building Node.js APIs, modelling PostgreSQL data, and delivering React interfaces across the application stack.",
  },
};
const aiDemo = document.getElementById("aiDemo");
const aiRun = document.getElementById("aiRun");
const aiSampleButtons = [...document.querySelectorAll("[data-ai-example]")];
const aiOutput = document.getElementById("aiOutput");
const aiOutputText = document.getElementById("aiOutputText");
const aiOutputStatus = document.getElementById("aiOutputStatus");
const aiFlowCaption = document.getElementById("aiFlowCaption");
const aiAnnouncement = document.getElementById("aiAnnouncement");
let aiExample = "frontend";
let aiTimers = [];

function resetAiExample(key) {
  aiTimers.forEach((timer) => window.clearTimeout(timer));
  aiTimers = [];
  aiExample = key;
  const example = aiExamples[key];
  document.getElementById("aiExperience").textContent = example.experience;
  document.getElementById("aiRole").textContent = example.role;
  document.getElementById("aiSkills").replaceChildren(
    ...example.skills.map((skill) => {
      const tag = document.createElement("span");
      tag.textContent = skill;
      return tag;
    }),
  );
  aiSampleButtons.forEach((button) => {
    const selected = button.dataset.aiExample === key;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  aiDemo.dataset.state = "idle";
  aiOutput.setAttribute("aria-busy", "false");
  aiOutputText.textContent =
    "See how the same experience can be presented for a specific role.";
  aiOutputStatus.textContent = "Ready when you are";
  aiFlowCaption.textContent = "A little context. A clearer story.";
  aiAnnouncement.textContent = "";
  aiRun.disabled = false;
  aiRun.firstChild.textContent = "Tailor this sample ";
}

aiSampleButtons.forEach((button) => {
  button.addEventListener("click", () =>
    resetAiExample(button.dataset.aiExample),
  );
});

aiRun.addEventListener("click", () => {
  if (aiRun.disabled) return;
  aiDemo.dataset.state = "processing";
  aiOutput.setAttribute("aria-busy", "true");
  aiOutputStatus.textContent = "Reading the example…";
  aiFlowCaption.textContent = "Start with the experience.";
  aiRun.disabled = true;
  aiRun.firstChild.textContent = "Tailoring sample… ";
  aiAnnouncement.textContent = "Preparing the sample summary.";
  aiTimers.push(
    window.setTimeout(() => {
      aiOutputStatus.textContent = "Matching the role…";
      aiFlowCaption.textContent = "Bring the relevant details forward.";
    }, 750),
  );
  aiTimers.push(
    window.setTimeout(() => {
      const example = aiExamples[aiExample];
      aiDemo.dataset.state = "complete";
      aiOutput.setAttribute("aria-busy", "false");
      aiOutputText.textContent = example.summary;
      aiOutputStatus.textContent = "Sample ready to review ✓";
      aiFlowCaption.textContent = "Same experience. A clearer story.";
      aiRun.disabled = false;
      aiRun.firstChild.textContent = "Run again ";
      aiAnnouncement.textContent = `Sample ready. ${example.summary}`;
      aiTimers = [];
    }, 1850),
  );
});

// The visitor can pause ambient animation; respect system motion preferences.
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const motionToggle = document.getElementById("motionToggle");
const motionToggleLabel = document.getElementById("motionToggleLabel");
let userPausedMotion = false;
function updateMotion() {
  const paused =
    userPausedMotion || motionPreference.matches || document.hidden;
  document.documentElement.classList.toggle("motion-paused", paused);
  motionToggle.setAttribute("aria-pressed", String(paused));
  motionToggle.setAttribute(
    "aria-label",
    paused ? "Resume animations" : "Pause animations",
  );
  motionToggleLabel.textContent = paused ? "Resume motion" : "Pause motion";
}
motionToggle.addEventListener("click", () => {
  userPausedMotion = !userPausedMotion;
  updateMotion();
});
motionPreference.addEventListener("change", updateMotion);
document.addEventListener("visibilitychange", updateMotion);
updateMotion();
