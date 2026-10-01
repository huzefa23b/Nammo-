```javascript
/* =====================================================
   NAMIRA SECRET UNIVERSE
   Interactive Experience
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const loader = document.getElementById("loader");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const enterBtn = document.getElementById("enterBtn");

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const menuClose = document.getElementById("menuClose");

const navLine = document.getElementById("navLine");

const starsCanvas = document.getElementById("stars");
const ctx = starsCanvas.getContext("2d");

const starButtons = document.querySelectorAll(".star");
const starMessage = document.getElementById("starMessage");
const starText = document.getElementById("starText");
const closeStar = document.getElementById("closeStar");

const bigHeart = document.getElementById("bigHeart");
const heartPercent = document.getElementById("heartPercent");
const holdText = document.getElementById("holdText");

const sorryBtn = document.getElementById("sorryBtn");
const sorryResult = document.getElementById("sorryResult");
const sorryClose = document.getElementById("sorryClose");

const restartBtn = document.getElementById("restartBtn");

const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");


/* =====================================================
   LOADER
===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {
        loader.classList.add("hide");

        setTimeout(() => {
            document.querySelectorAll(".hero .reveal")
                .forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add("visible");
                    }, index * 180);
                });
        }, 500);

    }, 2300);

});


/* =====================================================
   SMOOTH ENTER
===================================================== */

enterBtn.addEventListener("click", () => {

    document.getElementById("letter").scrollIntoView({
        behavior: "smooth"
    });

    createHeartExplosion(
        window.innerWidth / 2,
        window.innerHeight / 2
    );

});


/* =====================================================
   MUSIC
===================================================== */

let musicPlaying = false;

musicBtn.addEventListener("click", toggleMusic);

async function toggleMusic() {

    try {

        if (!musicPlaying) {

            await music.play();

            musicPlaying = true;
            musicBtn.classList.add("playing");

            showToast("Our little soundtrack is playing ♥");

        } else {

            music.pause();

            musicPlaying = false;
            musicBtn.classList.remove("playing");

            showToast("Music paused");

        }

    } catch (error) {

        showToast("Add assets/music.mp3 to enable music ♥");

    }

}


/* =====================================================
   MENU
===================================================== */

menuBtn.addEventListener("click", () => {
    menu.classList.add("open");
});

menuClose.addEventListener("click", () => {
    menu.classList.remove("open");
});

document.querySelectorAll(".menu-content a").forEach(link => {

    link.addEventListener("click", () => {
        menu.classList.remove("open");
    });

});


/* =====================================================
   SCROLL PROGRESS
===================================================== */

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    navLine.style.width = `${progress}%`;

});


/* =====================================================
   REVEAL ON SCROLL
===================================================== */

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

document.querySelectorAll(".reveal")
    .forEach(element => observer.observe(element));


/* =====================================================
   STAR SYSTEM
===================================================== */

starButtons.forEach(star => {

    star.addEventListener("click", () => {

        const message = star.dataset.message;

        starText.textContent = message;

        starMessage.classList.add("open");

        createHeartExplosion(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

    });

});

closeStar.addEventListener("click", () => {
    starMessage.classList.remove("open");
});

starMessage.addEventListener("click", event => {

    if (event.target === starMessage) {
        starMessage.classList.remove("open");
    }

});


/* =====================================================
   HEART HOLD SYSTEM
===================================================== */

let holding = false;
let heartValue = 0;
let heartTimer = null;

function startHeart() {

    if (holding) return;

    holding = true;

    bigHeart.classList.add("holding");
    holdText.textContent = "KEEP HOLDING ♥";

    heartTimer = setInterval(() => {

        heartValue += 1.2;

        if (heartValue >= 100) {

            heartValue = 100;

            clearInterval(heartTimer);

            holding = false;

            bigHeart.classList.remove("holding");

            holdText.textContent =
                "STILL NOT ENOUGH. ♥";

            showToast(
                "100%... and somehow that still feels too small ♥"
            );

            createHeartRain();

        }

        heartPercent.textContent =
            Math.floor(heartValue);

    }, 35);

}


function stopHeart() {

    if (!holding) return;

    holding = false;

    clearInterval(heartTimer);

    bigHeart.classList.remove("holding");

    holdText.textContent = "HOLD ♥";

}


bigHeart.addEventListener("mousedown", startHeart);
bigHeart.addEventListener("mouseup", stopHeart);
bigHeart.addEventListener("mouseleave", stopHeart);

bigHeart.addEventListener("touchstart", event => {

    event.preventDefault();

    startHeart();

}, { passive: false });

bigHeart.addEventListener("touchend", stopHeart);


/* =====================================================
   APOLOGY
===================================================== */

sorryBtn.addEventListener("click", () => {

    sorryResult.classList.add("open");

    createHeartExplosion(
        window.innerWidth / 2,
        window.innerHeight / 2
    );

});

sorryClose.addEventListener("click", () => {

    sorryResult.classList.remove("open");

    showToast("Smile detected? Maybe? 🥺♥");

});


/* =====================================================
   RESTART
===================================================== */

restartBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    heartValue = 0;
    heartPercent.textContent = "0";
    holdText.textContent = "HOLD ♥";

});


/* =====================================================
   TOAST
===================================================== */

let toastTimeout;

function showToast(message) {

    toastText.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3200);

}


/* =====================================================
   STAR CANVAS
===================================================== */

let canvasWidth;
let canvasHeight;

const starParticles = [];

function resizeCanvas() {

    canvasWidth = starsCanvas.width =
        window.innerWidth * window.devicePixelRatio;

    canvasHeight = starsCanvas.height =
        window.innerHeight * window.devicePixelRatio;

    starsCanvas.style.width =
        `${window.innerWidth}px`;

    starsCanvas.style.height =
        `${window.innerHeight}px`;

    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


function createStars() {

    const amount =
        Math.min(
            180,
            Math.floor(window.innerWidth / 6)
        );

    starParticles.length = 0;

    for (let i = 0; i < amount; i++) {

        starParticles.push({

            x: Math.random() * window.innerWidth,

            y: Math.random() * window.innerHeight,

            size:
                Math.random() * 1.4 + .2,

            speed:
                Math.random() * .12 + .02,

            alpha:
                Math.random() * .6 + .1,

            phase:
                Math.random() * Math.PI * 2

        });

    }

}

createStars();


function animateStars(time) {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    starParticles.forEach(star => {

        star.y -= star.speed;

        if (star.y < -5) {
            star.y = window.innerHeight + 5;
        }

        const twinkle =
            star.alpha +
            Math.sin(time * .001 + star.phase) * .18;

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${Math.max(.05, twinkle)})`;

        ctx.fill();

    });

    requestAnimationFrame(animateStars);

}

requestAnimationFrame(animateStars);


/* =====================================================
   HEART EXPLOSION
===================================================== */

const floatingHearts = [];

function createHeartExplosion(x, y) {

    for (let i = 0; i < 35; i++) {

        const heart = document.createElement("span");

        heart.textContent =
            Math.random() > .35
                ? "♥"
                : "✦";

        heart.style.position = "fixed";
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.zIndex = "5000";
        heart.style.pointerEvents = "none";
        heart.style.color =
            Math.random() > .5
                ? "#ff477e"
                : "#ffffff";

        heart.style.fontSize =
            `${Math.random() * 15 + 8}px`;

        heart.style.transition =
            `transform ${Math.random() * .8 + .8}s ease,
             opacity ${Math.random() * .8 + .8}s ease`;

        document.body.appendChild(heart);

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            Math.random() * 180 + 60;

        const dx =
            Math.cos(angle) * distance;

        const dy =
            Math.sin(angle) * distance;

        requestAnimationFrame(() => {

            heart.style.transform =
                `translate(${dx}px, ${dy}px) rotate(${Math.random() * 360}deg)`;

            heart.style.opacity = "0";

        });

        setTimeout(() => {
            heart.remove();
        }, 1800);

    }

}


/* =====================================================
   HEART RAIN
===================================================== */

function createHeartRain() {

    for (let i = 0; i < 80; i++) {

        setTimeout(() => {

            const heart = document.createElement("span");

            heart.textContent =
                Math.random() > .2
                    ? "♥"
                    : "✦";

            heart.style.position = "fixed";

            heart.style.left =
                `${Math.random() * 100}%`;

            heart.style.top = "-30px";

            heart.style.zIndex = "5000";

            heart.style.pointerEvents = "none";

            heart.style.color =
                Math.random() > .4
                    ? "#ff477e"
                    : "#fff";

            heart.style.fontSize =
                `${Math.random() * 18 + 8}px`;

            const duration =
                Math.random() * 3 + 3;

            heart.style.transition =
                `transform ${duration}s linear,
                 opacity ${duration}s linear`;

            document.body.appendChild(heart);

            requestAnimationFrame(() => {

                heart.style.transform =
                    `translateY(${window.innerHeight + 100}px)
                     rotate(${Math.random() * 720}deg)`;

                heart.style.opacity = "0";

            });

            setTimeout(() => {
                heart.remove();
            }, duration * 1000 + 200);

        }, i * 35);

    }

}


/* =====================================================
   CURSOR HEART TRAIL — DESKTOP
===================================================== */

let lastMouseTime = 0;

document.addEventListener("mousemove", event => {

    const now = Date.now();

    if (now - lastMouseTime < 80) {
        return;
    }

    lastMouseTime = now;

    if (Math.random() > .65) {

        const particle =
            document.createElement("span");

        particle.textContent = "·";

        particle.style.position = "fixed";
        particle.style.left = `${event.clientX}px`;
        particle.style.top = `${event.clientY}px`;

        particle.style.color =
            "rgba(255,71,126,.6)";

        particle.style.pointerEvents = "none";
        particle.style.zIndex = "4000";
        particle.style.fontSize = "12px";

        particle.style.transition =
            "transform .7s ease, opacity .7s ease";

        document.body.appendChild(particle);

        requestAnimationFrame(() => {

            particle.style.transform =
                `translateY(-20px)`;

            particle.style.opacity = "0";

        });

        setTimeout(() => {
            particle.remove();
        }, 800);

    }

});


/* =====================================================
   KEYBOARD SECRET
===================================================== */

let secretCode = "";

document.addEventListener("keydown", event => {

    secretCode += event.key.toLowerCase();

    if (secretCode.length > 20) {
        secretCode = secretCode.slice(-20);
    }

    if (secretCode.includes("namira")) {

        createHeartRain();

        showToast(
            "Secret unlocked — Namira ♥"
        );

        secretCode = "";

    }

});


/* =====================================================
   ESC CLOSE
===================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        menu.classList.remove("open");
        starMessage.classList.remove("open");

    }

});


/* =====================================================
   IMAGE FALLBACK
===================================================== */

document.querySelectorAll(".memory-image img")
    .forEach(img => {

        img.addEventListener("error", () => {

            img.style.display = "none";

        });

    });


/* =====================================================
   PARALLAX
===================================================== */

window.addEventListener("scroll", () => {

    const hero =
        document.querySelector(".hero-content");

    if (!hero) return;

    const y = window.scrollY;

    if (y < window.innerHeight) {

        hero.style.transform =
            `translateY(${y * .12}px)`;

        hero.style.opacity =
            `${1 - y / (window.innerHeight * .9)}`;

    }

});


/* =====================================================
   FINAL INITIALIZATION
===================================================== */

console.log(
    "%c♥ NAMIRA SECRET UNIVERSE ♥",
    "color:#ff477e;font-size:18px;font-weight:bold"
);

console.log(
    "Made with love."
);
```
