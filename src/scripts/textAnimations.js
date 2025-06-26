import SplitType from 'split-type'
import { gsap } from "gsap";
import Typed from 'typed.js';


    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function scrollIndicator(){
    const indicator =  document.querySelectorAll('a i');
    gsap.from(indicator,{
        y : 5,
        repeat: -1,
        yoyo: true,

    })
}

function createScrollTriger(triggerElemnet, timeline){
  ScrollTrigger.create({
    trigger: triggerElemnet,
    start : "top bottom",
    markers:true,
    onLeave : () =>{
      timeline.progress(0).paused()
    }      
  });
  ScrollTrigger.create({
    trigger: triggerElemnet,
    start : "top 80%",
    markers:true,
    onEnter : () =>{
      timeline.play();
    }
  })
}

export function animeRotateIn(type, onScroll= true){
  document.querySelectorAll(`[${type}-rotate-in]`).forEach((el) => {
    let tl = gsap.timeline({ paused : true});
    tl.from(el.querySelectorAll(`.${type}`), {
      transformPerspective : 1000
    });

    tl.from(el.querySelectorAll(`.${type}`), {
      opacity: 0,
      rotateX : -90,
      duration: 0.3,
      ease: "Power2.out",
      stagger: {amount : .3}
    });
    if(onScroll){
      createScrollTriger(el, tl);
    }else{
        tl.play();
    }
  })
}

export function split(){
   document.querySelectorAll('[text-split]').forEach((el) => {
        new SplitType(el, {
            type : "words, char",
            tagName : "span"
        })
    });
}

document.fonts.ready.then(() => {
   split();

   setTimeout(() => {
     const typed = new Typed('#name', {
        strings: ['Abhinandan Bhatti.', 'ABHI.','Abhinandan Bhatti.', 'ABHI.','Abhinandan Bhatti.', 'ABHI.','Abhinandan Bhatti.', 'ABHI.','Abhinandan Bhatti.'],
        typeSpeed: 50,
    });
   },3000);

    document.querySelectorAll('[char-type]').forEach((el) => {
        gsap.from(el.querySelectorAll('.char'), {
            scale: 1.1,
            opacity: 0,
            duration : .1,
            stagger: .1
        })
    });
    scrollIndicator();
    
});