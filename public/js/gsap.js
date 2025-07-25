gsap.registerPlugin(ScrollTrigger);

$(document).ready(function () {
    gsap.set('.youtubeVideoSection', {
        marginTop: '-140vh',
    });


    let pinTl = gsap.timeline({
        scrollTrigger: { 
            trigger: '.youtubeVideoSection',
            start: 'top -10%', 
            end: '+=1000',
            scrub: 1.5,
            pin: true, 
        }
    });

    pinTl.from('.vdCard', {
        yPercent: 150,
        stagger: 0.5, 
        ease: 'power1.out', 
    });



    $('.vdCard').hover(
        function () {
            $(this).find('video')[0].play();
        },
        function () {
            $(this).find('video')[0].pause();
        }
    );

    $('.vdCard video').each(function() {
        if (this.hasAttribute('autoplay')) {
            this.pause();
        }
    });
});