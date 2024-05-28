import gsap from "gsap";

const tl = gsap.timeline();

export const preLoaderAnim = () => {
    tl.to("body", {
        duration: 0.1,
        css: {overflowY: "hidden"},
        ease: "power3.inOut",
    })
    .to(".landing", {
        duration: 0.05,
        css: {overflowY: "hidden", height: "90vh"},
       
    })
    .to(".texts-container", {
        duration: 0,
        opacity: 1,
        ease: "power3.inOut",
    })
    .from(".texts-container span", {
        duration: 1.5,
        delay: 1,
        y: 70,
        skewY : 10,
        stagger: 0.4,
        ease: "power3.inOut",
    })
    .to(".texts-container span", {
        duration: 1,
        y: 70,
        skewY : 10,
        stagger: 0.4,
        ease: "power3.inOut",
    })
    .to(".preLoader", {
        duration: 1.5,
        height: "0vh",
        ease: "power3.inOut",
      
    })
}