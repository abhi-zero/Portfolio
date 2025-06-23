import { gsap } from "gsap";

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
