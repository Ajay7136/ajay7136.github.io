// GSAP Scroll Animations — Ajay R Manga Portfolio
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    // ── 1. HERO ENTRANCE ──
    const heroTL = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTL
        .from(".hero-name-tag", {
            x: -60,
            opacity: 0,
            rotation: -15,
            duration: 0.5
        })
        .from(".hero-title", {
            x: -80,
            opacity: 0,
            duration: 0.8
        }, "-=0.3")
        .from(".hero-subtitle", {
            x: -40,
            opacity: 0,
            duration: 0.5
        }, "-=0.5")
        .from(".btn-hero", {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(2)"
        }, "-=0.3")
        .from(".bg-keyboard", {
            scale: 0.5,
            opacity: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: "back.out(1.5)"
        }, "-=0.6")
        .from(".main-char", {
            y: 80,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4")
        .from(".speech-bubble", {
            scale: 0,
            transformOrigin: "bottom left",
            duration: 0.6,
            ease: "back.out(1.5)"
        }, "-=0.5");

    // ── 2. SCROLL REVEAL FOR PROJECT CARDS ──
    gsap.utils.toArray(".project-card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 60,
            opacity: 0,
            rotation: gsap.utils.random(-2, 2),
            duration: 0.6,
            delay: i % 2 * 0.15,
            ease: "power2.out"
        });
    });

    // ── 3. SECTION TITLES — Slam in ──
    gsap.utils.toArray(".section-title-container").forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            scale: 0.8,
            opacity: 0,
            rotation: gsap.utils.random(-3, 3),
            duration: 0.5,
            ease: "back.out(1.5)"
        });
    });

    // ── 4. SFX BANNERS SLIDE ──
    gsap.utils.toArray(".sfx-left, .sfx-left-2").forEach(sfx => {
        gsap.from(sfx, {
            scrollTrigger: {
                trigger: sfx.parentElement,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            x: -200,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        });
    });

    gsap.utils.toArray(".sfx-right, .sfx-right-2").forEach(sfx => {
        gsap.from(sfx, {
            scrollTrigger: {
                trigger: sfx.parentElement,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            x: 200,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        });
    });

    // ── 5. SKILL BARS FILL ON SCROLL ──
    ScrollTrigger.create({
        trigger: ".skills-section",
        start: "top 75%",
        once: true,
        onEnter: () => {
            document.querySelectorAll(".progress-fill").forEach((bar, i) => {
                const target = bar.getAttribute("data-width");
                gsap.to(bar, {
                    width: target,
                    duration: 1.5,
                    ease: "power4.out",
                    delay: i * 0.2
                });
            });

            // Pop the badges
            gsap.from(".progress-badge", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                stagger: 0.2,
                ease: "back.out(2)",
                delay: 0.8
            });
        }
    });

    // ── 6. PROJECT CARD HOVER EFFECTS ──
    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            gsap.to(card, { scale: 1.02, duration: 0.2, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
            gsap.to(card, { scale: 1, duration: 0.2, ease: "power1.in" });
        });
    });

    // ── 7. TECH TAGS STAGGER ──
    gsap.utils.toArray(".project-tech-tags").forEach(container => {
        gsap.from(container.children, {
            scrollTrigger: {
                trigger: container,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: 15,
            opacity: 0,
            stagger: 0.08,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    // ── 8. CONTACT SECTION ──
    gsap.from(".contact-heading", {
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        scale: 0.7,
        rotation: -8,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.5)"
    });

    gsap.from(".contact-form", {
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        x: 60,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out"
    });

    // ── 9. JOJO FOOTER — "To Be Continued" ──
    const jojoTL = gsap.timeline({
        scrollTrigger: {
            trigger: ".jojo-footer",
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });

    jojoTL
        .from(".tbc-arrow", {
            x: -100,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out"
        })
        .from(".tbc-main", {
            x: -60,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3")
        .from(".tbc-arrow-icon", {
            x: -30,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out"
        }, "-=0.2")
        .from(".footer-credit", {
            y: 20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out"
        }, "-=0.1");

    // ── 10. NAVBAR SCROLL EFFECT ──
    ScrollTrigger.create({
        trigger: ".hero-panel",
        start: "top top",
        end: "bottom top",
        onLeave: () => {
            gsap.to(".navbar", { boxShadow: "0 10px 20px rgba(0,0,0,0.2)", duration: 0.3 });
        },
        onEnterBack: () => {
            gsap.to(".navbar", { boxShadow: "none", duration: 0.3 });
        }
    });

    // ── 10. SMOOTH SCROLL FOR NAV LINKS ──
    document.querySelectorAll('.nav-links a, .btn-hero').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ── 12. ACTIVE NAV LINK ON SCROLL ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = 'home';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        // If near the bottom of the page, force "contact" active
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 50) {
            current = 'contact';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});
