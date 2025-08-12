gsap.registerPlugin(ScrollTrigger);$(document).ready(function(){gsap.set('.youtubeVideoSection',{marginTop:'-140vh',});let pinTl=gsap.timeline({scrollTrigger:{trigger:'.youtubeVideoSection',start:'top -10%',end:'+=1000',scrub:1.5,pin:!0,}});pinTl.from('.vdCard',{yPercent:150,stagger:0.5,ease:'power1.out',});$('.vdCard').hover(function(){$(this).find('video')[0].play()},function(){$(this).find('video')[0].pause()});$('.vdCard video').each(function(){if(this.hasAttribute('autoplay')){this.pause()}})})

$(document).ready(function() {
    var mainLogo = "./assets/images/logo.png";
    var scrollLogo = "./assets/images/logo.png";
    
    var isScrolled = false;

    $(window).on('scroll', function() {
      if ($(this).scrollTop() > 50) {
        if (!isScrolled) {
          isScrolled = true;
          $('.logo-main').fadeOut(200, function() {
            $(this).attr('src', scrollLogo).fadeIn(200);
          });
        }
      } else {
        if (isScrolled) {
          isScrolled = false;
          $('.logo-main').fadeOut(200, function() {
            $(this).attr('src', mainLogo).fadeIn(200);
          });
        }
      }
    });
  });