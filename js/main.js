// script.js
gsap.registerPlugin(ScrollTrigger);

// Custom cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
    
    gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
    });
});

// Noise effect
const canvas = document.getElementById('noise');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function noise(ctx) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const idata = ctx.createImageData(w, h);
    const buffer32 = new Uint32Array(idata.data.buffer);
    const len = buffer32.length;

    for(let i = 0; i < len; i++) {
        if(Math.random() < 0.5) {
            buffer32[i] = 0xff000000;
        }
    }

    ctx.putImageData(idata, 0, 0);
}

function loop() {
    noise(ctx);
    requestAnimationFrame(loop);
}

loop();

// Scroll animations
gsap.from('.nav-wrapper', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
});

gsap.utils.toArray('.project-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'top center',
            scrub: 1
        },
        y: 100,
        opacity: 0
    });
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-bar');

skillBars.forEach(bar => {
    const percentage = bar.dataset.percentage;
    
    gsap.to(bar, {
        scrollTrigger: {
            trigger: bar,
            start: 'top bottom',
            end: 'bottom center',
            scrub: 1
        },
        width: `${percentage}%`,
        duration: 1.5,
        ease: 'power2.out'
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: target,
                offsetY: 70
            },
            ease: 'power2.inOut'
        });
    });
});