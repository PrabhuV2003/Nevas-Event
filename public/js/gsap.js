gsap.registerPlugin(ScrollTrigger); // Corrected typo: 'resgisterPlugin' to 'registerPlugin'

$(document).ready(function () {
    // Initial setup for the section
    gsap.set('.youtubeVideoSection', {
        marginTop: '-140vh', // This pushes the section up initially
    });

    // Main timeline for the overall section movement
    let tl = gsap.timeline({
        scrollTrigger: { // Corrected: 'ScrollTrigger' to 'scrollTrigger'
            trigger: '.youtubeVideoSection',
            start: 'top bottom', // When the top of the section hits the bottom of the viewport
            end: '200% top', // Ends when the section's top is 200% past the viewport's top
            scrub: true,
            // markers: true // Uncomment for debugging scroll trigger points
        }
    });

    // This timeline handles the pinning and the video card animation
    let pinTl = gsap.timeline({
        scrollTrigger: { // Corrected: 'ScrollTrigger' to 'scrollTrigger'
            trigger: '.youtubeVideoSection',
            start: 'top -10%', // When the top of the section hits the top of the viewport
            end: '+=2000', // Pins for a duration of 2000 pixels. Adjust as needed.
            scrub: 1.5,
            pin: true, // This is what pins the section
            // markers: true // Uncomment for debugging scroll trigger points
        }
    });

    // Animation for the video cards
    // Moved the transform properties from CSS to GSAP 'from' to ensure GSAP controls them
    pinTl.from('.vdCard', {
        yPercent: 150, // Starts 150% below its natural position
        stagger: 0.5, // Staggers the animation of each card
        ease: 'power1.out', // Smoother easing
        // Also animate the transform properties (translateX and rotate)
        // Ensure these are removed from the CSS classes if you want GSAP to fully control
        // or set their initial state in GSAP.
        // For now, let's keep them in CSS as they define the final resting position.
    });


    // Hover effect for video playback
    $('.vdCard').hover(
        function () {
            $(this).find('video')[0].play();
        },
        function () {
            $(this).find('video')[0].pause();
        }
    );

    // To ensure videos start paused on page load if they have 'autoplay' attribute
    $('.vdCard video').each(function() {
        if (this.hasAttribute('autoplay')) {
            this.pause();
        }
    });
});