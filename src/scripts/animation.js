import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animeRotateIn } from "./textAnimations";

gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll(".container article");
const mask = document.querySelector(".mask");



export function navAnime() {
  const button1 = document.querySelector(".menu-text");
  const button2 = document.querySelector(".menu-icon");
  const tl = gsap.timeline();

  tl.from(
    "ul",
    {
      y: "-1050%",
      duration: 1,
      ease: "power2.out",
    },
    "one"
  )
    .from("ul a", {
      y: 50,
      stagger: 0.6,
      duration: 0.3,
      ease: "power2.out",
    })
    .to(
      ".menu-text i",
      {
        rotateZ: "180deg",
        ease: "power2.out",
      },
      "one"
    )
    .to(
      ".menu-icon i",
      {
        rotateZ: "180deg",
        ease: "power2.out",
      },
      "one"
    );
  tl.pause();
[button1, button2].forEach((button) => {
    button.addEventListener("click", () => {
        if (button.dataset.stage === "open") {
            tl.reverse();
            button.dataset.stage = "close";
        } else {
            tl.play();
            button.dataset.stage = "open";
        }
        console.log(button.dataset.stage);
    });
});
}

function aboutTimeline(){
  const scrollTween = gsap.to(sections,{
    xPercent : -100 * (sections.length - 1),
    ease:"none",
    scrollTrigger : {
      trigger: ".container",
      pin:true,
      scrub: 1,
      start : "top 2%",
      end: "+=3000",
      markers:true
    }
  })
  gsap.to(mask, {
  width: "110%",
  scrollTrigger: {
    trigger: ".wrapper",
    start: "top left",
    scrub: 1
  }
});

sections.forEach((section) => {
  // grab the scoped text
  let text = section.querySelectorAll(".anim");
  
  // bump out if there's no items to animate
  if(text.length === 0)  return 
  
  // do a little stagger
  gsap.from(text, {
    y: -130,
    opacity: 0,
    duration: 2,
    ease: "elastic",
    stagger: 0.1,
    scrollTrigger: {
      trigger: section,
      containerAnimation: scrollTween,
      start: "left center",
      markers: true,
    }

  });
});
}

aboutTimeline()
