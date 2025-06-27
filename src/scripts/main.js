import { navAnime } from "./animation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { mouse } from "./canvas";
import { animeRotateIn } from "./textAnimations";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on("scroll", ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

const bugMemes = [
  "Used 'New Yrok' instead of 'New York'—API crashed immediately. 🌆💥",
  "Spent 3 hours debugging... forgot to save the file. 💾🤦‍♂️",
  "Fixed a bug and created 5 new ones. Productivity level: 100. 🐛➕5️⃣",
  "'It works on my machine!' – The beginning of every argument. 🖥️⚔️",
  "Forgot a semicolon; broke the entire app. 🚫;",
  "Accidentally centered the div... now everything is off-center. 🎯↔️",
  "Changed 'true' to 'false'—everything exploded. 💣🔄",
  "Declared a variable, forgot to use it. Classic me. 📝❌",
  "Console.log saved my life again... and again... and again. 🖨️❤️",
  "Misspelled a function name. Blamed JavaScript for an hour. 📛⌨️",
  "Tried to fix an alignment issue. Ended up deleting the element. 🪛❌",
  "Commented out the wrong line—spent hours wondering why nothing worked. 💬🤔",
  "Deployed to production without testing... instant regret. 🚀😱",
  "Used '==' instead of '===' and unleashed chaos. ❓💥",
  "Forgot to close a tag. Everything became bold and italic. Everything. 🏷️😬",
  "Refactored code to make it 'better.' Broke the whole app instead. 🔄❌",
  "Infinite loop created. Computer sounded like it was going to launch into space. ♾️🚀",
  "Added a 'quick fix'—now the app won't start. 🛠️❌",
  "Turned off the linter to 'fix' the error. Feels illegal but works. 🚨✅",
  "Fixed a bug by deleting the feature entirely. 🐞🗑️",
];

const skills = [
  { name: "HTML", level: 80, dataAttr: "html" },
  { name: "CSS", level: 70, dataAttr: "css" },
  { name: "JavaScript", level: 60, dataAttr: "js" },
  { name: "GSAP", level: 50, dataAttr: "gsap" },
  { name: "API", level: 55, dataAttr: "api" },
  { name: "Git", level: 50, dataAttr: "git" },
];

navAnime();

const chartSec = document.querySelector(".chart");

const cursorBg = document.querySelector(".cursor-bg");
const bgWidth = cursorBg.offsetWidth;
const bgHeight = cursorBg.offsetHeight;

chartSec.addEventListener("mousemove", (dets) => {
  const rect = chartSec.getBoundingClientRect();
  const x = dets.clientX - rect.left - bgWidth / 2;
  const y = dets.clientY - rect.top - bgHeight / 2;
  gsap.to(cursorBg, {
    x: x,
    y: y,
    ease: "power2.out",
  });
});

export function createElement(
  tag,
  className = null,
  id = null,
  dataAttr = null
) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (id) element.id = id;
  if (dataAttr) element.setAttribute(`data-${dataAttr}`, "");
  return element;
}

function generateSkillSection() {
  const skillSection = document.querySelector(".skills-section");
  if (!skillSection) return;

  skills.forEach((skill) => {
    const skillDiv = createElement("div", "skill");
    const skillName = createElement("h3", "skill-name", null, skill.dataAttr);
    skillName.textContent = skill.name;

    const progressBar = createElement("div", null, "progressBar");
    const barFill = createElement("div", null, "bar", skill.dataAttr);
    barFill.style.width = `${skill.level}%`;

    const skillValue = createElement("h3", "skill-value", null, skill.dataAttr);
    skillValue.textContent = `${skill.level}%`;

    progressBar.appendChild(barFill);
    skillDiv.appendChild(skillName);
    skillDiv.appendChild(progressBar);
    skillDiv.appendChild(skillValue);
    skillSection.appendChild(skillDiv);
  });
}

function displayMemes() {
  const button = document.querySelector(".bug-btn");
  const memetext = document.querySelector(".meme-text");

  button.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * bugMemes.length);
    const meme = bugMemes[randomIndex];
    memetext.textContent = meme;
    gsap.fromTo(
      memetext,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  });
}

function accordian() {
  const accordianBtns = document.querySelectorAll(".accord-toggle");
  const accordianContents = document.querySelectorAll(".article-content");

  accordianBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const content = accordianContents[index];
      const isClose = content.classList.contains("close");
      if (isClose) {
        gsap.to(content, {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            content.classList.remove("close");
          },
        });
        gsap.to(btn.querySelector("i"), {
          rotateZ: "180deg",
        });
      } else {
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            content.classList.add("close");
          },
        });
        gsap.to(btn.querySelector("i"), {
          rotateZ: "0deg",
        });
      }
    });
  });
}

function displayControls() {
  const toggleControlBtn = document.querySelector(".open-control");
  const controls = document.querySelector(".controls");

  toggleControlBtn.addEventListener("click", () => {
    const isClose = controls.classList.contains("close");
    if (isClose) {
      gsap.to(controls, {
        height: "100%",
        paddingTop: "20px",
        paddingBottom: "20px",
        ease: "power2.out",
        onComplete: () => {
          controls.classList.add("open");
          controls.classList.remove("close");
        },
      });
    } else {
      gsap.to(controls, {
        height: "0%",
        paddingTop: "0px",
        paddingBottom: "0px",
        ease: "power2.out",
        onComplete: () => {
          controls.classList.add("close");
          controls.classList.remove("open");
        },
      });
    }
  });
}
displayControls();
accordian();
displayMemes();
generateSkillSection();

document.querySelectorAll('a[href^="#"]').forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const id = el.getAttribute("href")?.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.querySelector("#seeProjects").addEventListener("click", () => {
  const projetsSection = document.querySelector("#projectSection");
  if (projetsSection) {
    projetsSection.scrollIntoView({ behavior: "smooth" });
  }
});
