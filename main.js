/* =========================================================
   BHUMIK KUNDU — PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menuButton = document.getElementById("menu-btn");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".navbar a");
    const sections = document.querySelectorAll("main section[id]");
    const header = document.getElementById("header");

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (menuButton && navbar) {

        menuButton.addEventListener("click", () => {

            const isOpen = navbar.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            const icon = menuButton.querySelector("i");

            if (icon) {
                icon.className = isOpen
                    ? "bx bx-x"
                    : "bx bx-menu";
            }
        });


        // Close menu when a navigation link is clicked
        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navbar.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuButton.querySelector("i");

                if (icon) {
                    icon.className = "bx bx-menu";
                }
            });

        });


        // Close menu when clicking outside
        document.addEventListener("click", (event) => {

            if (
                navbar.classList.contains("open") &&
                !navbar.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                navbar.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuButton.querySelector("i");

                if (icon) {
                    icon.className = "bx bx-menu";
                }
            }

        });

    }


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    const typingElement =
        document.getElementById("typing-text");

    if (typingElement) {

        const roles = [
            "AI/ML Engineer",
            "Machine Learning Enthusiast",
            "Computer Vision Developer",
            "Problem Solver"
        ];

        let roleIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        const typeSpeed = 85;
        const deleteSpeed = 45;
        const pauseAfterTyping = 1500;
        const pauseAfterDeleting = 350;


        function typeRole() {

            const currentRole = roles[roleIndex];


            // Typing
            if (!deleting) {

                characterIndex++;

                typingElement.textContent =
                    currentRole.substring(
                        0,
                        characterIndex
                    );


                // Finished typing
                if (
                    characterIndex ===
                    currentRole.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeRole,
                        pauseAfterTyping
                    );

                    return;
                }


                setTimeout(
                    typeRole,
                    typeSpeed
                );

            }


            // Deleting
            else {

                characterIndex--;

                typingElement.textContent =
                    currentRole.substring(
                        0,
                        characterIndex
                    );


                // Finished deleting
                if (characterIndex === 0) {

                    deleting = false;

                    roleIndex =
                        (roleIndex + 1) %
                        roles.length;

                    setTimeout(
                        typeRole,
                        pauseAfterDeleting
                    );

                    return;
                }


                setTimeout(
                    typeRole,
                    deleteSpeed
                );
            }
        }


        // Respect reduced-motion preference
        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (reducedMotion) {

            typingElement.textContent =
                roles[0];

        } else {

            typingElement.textContent = "";

            typeRole();
        }
    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function setActiveLink(sectionId) {

        navLinks.forEach((link) => {

            const target =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === `#${sectionId}`
            );

        });
    }


    if (
        sections.length > 0 &&
        navLinks.length > 0
    ) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    const visibleSections =
                        entries
                            .filter(
                                (entry) =>
                                    entry.isIntersecting
                            )
                            .sort(
                                (a, b) =>
                                    b.intersectionRatio -
                                    a.intersectionRatio
                            );


                    if (
                        visibleSections.length > 0
                    ) {

                        setActiveLink(
                            visibleSections[0]
                                .target.id
                        );
                    }

                },
                {
                    root: null,

                    rootMargin:
                        "-30% 0px -55% 0px",

                    threshold: [
                        0,
                        0.15,
                        0.3,
                        0.5
                    ]
                }
            );


        sections.forEach((section) => {

            sectionObserver.observe(section);

        });
    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }


        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }
    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".about-content, " +
            ".stat-card, " +
            ".skill-card, " +
            ".project-card, " +
            ".achievement-card, " +
            ".education-card, " +
            ".contact-content, " +
            ".contact-form-container"
        );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -45px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contact-form"
        );

    const formStatus =
        document.getElementById(
            "form-status"
        );


    if (
        contactForm &&
        formStatus
    ) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                // Validate form
                if (
                    !contactForm.checkValidity()
                ) {

                    contactForm.reportValidity();

                    return;
                }


                formStatus.textContent =
                    "Thanks! Your message is ready to be connected to an email service.";

                formStatus.style.color =
                    "#a78bfa";


                contactForm.reset();

            }
        );
    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    // Ignore empty # links
                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            href
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       EXTERNAL LINK SECURITY
    ===================================================== */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach((link) => {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        });


    /* =====================================================
       ESCAPE KEY — CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                navbar &&
                navbar.classList.contains("open")
            ) {

                navbar.classList.remove(
                    "open"
                );


                if (menuButton) {

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        menuButton.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.className =
                            "bx bx-menu";

                    }
                }
            }

        }
    );


    /* =====================================================
       JS SUPPORT STYLES
       These make the scroll reveal/header effect work
       without requiring another CSS file.
    ===================================================== */

    const revealStyle =
        document.createElement("style");


    revealStyle.textContent = `

        .reveal {
            opacity: 0;
            transform: translateY(24px);
            transition:
                opacity 650ms ease,
                transform 650ms ease;
        }

        .reveal.revealed {
            opacity: 1;
            transform: translateY(0);
        }

        .header.scrolled {
            background: rgba(5, 8, 18, 0.92);
            border-bottom-color:
                rgba(139, 92, 246, 0.16);
            box-shadow:
                0 10px 40px rgba(0, 0, 0, 0.20);
        }

        @media (prefers-reduced-motion: reduce) {

            .reveal {
                opacity: 1;
                transform: none;
                transition: none;
            }

        }

    `;


    document.head.appendChild(
        revealStyle
    );

});