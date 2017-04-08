'use strict';

var slider = $('.slider');

/**
 * Document ready functions
 */

//

(function ($) {
  $(document).ready(function () {

        //slider page initialization
        function initializeSlider() {
          if (slider.length) {
            slider.slick({
              vertical: true,
              verticalSwiping: true,
              accessibility: true,
              centerPadding: '0',
              centerMode: false,
              dots: true,
              arrows: false,
              useTransform: false,
              speed: 500,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: "unslick"
                }
              ]
            });
          }

          //toggle key up slider
          slider.keyup(function (e) {
            if (e.keyCode === 38) $(this).slick('slickPrev');     // enter
            if (e.keyCode === 40) $(this).slick('slickNext');   // esc
          });
        }

        initializeSlider();
        /*open/close form popap*/
        var btn = $('.btn--open-popap');
        var overlay = $('.overlay');
        var close = $('.form__close');
        var popap = $('.form');

        btn.on('click', function () {
          event.preventDefault ? event.preventDefault() : (event.returnValue = false);
          popap.addClass('form--show');
          overlay.addClass('overlay--show ');
        });

        overlay.mouseup(function (e) {
          if (popap.has(e.target).length === 0) {
            overlay.removeClass('overlay--show');
            popap.removeClass('form--show');
          }
        });

        close.on('click', function () {
          event.preventDefault ? event.preventDefault() : (event.returnValue = false);
          overlay.removeClass('overlay--show');
          popap.removeClass('form--show');
        });


        //Toggle mobile menu
        var burger = $('.toggle-menu');
        var header = $('.header__top');
        var menu = $('.menu__inner');

        burger.on('click', function () {
          $(this).toggleClass('active');
          header.toggleClass('js-menu-show');
          menu.toggleClass('fadeInDownt');
        });

        //Sticky header
        if (header.length) {
          $(window).on('scroll', function () {
            if ($(this).scrollTop() > 1) {
              header.addClass("header__top--scroll-bg");
            }
            else {
              header.removeClass("header__top--scroll-bg");
            }
          });
        }


      }
  );
})(jQuery);


//Slick resize
$(window).resize(function () {
  slider.slick('resize');
});

$(window).on('orientationchange', function () {
  slider.slick('resize');
});


//Animate number and Progress bar
function animateNumberAndProgress() {
  if ($('.benefits').length) {
    $('.fun-level').animateNumber(
        {
          easing: 'easeInQuad', // require jquery.easing
          // optional custom step function
          // using here to keep '%' sign after number
          numberStep: function (now, tween) {
            var floored_number = Math.floor(now),
                target = $(tween.elem);

            target.text(floored_number);
          }
        }
    );
    $('.fun-level-1').animateNumber(
        {
          number: 25
        },
        2000
    );
    $('.fun-level-2').animateNumber(
        {
          number: 18
        },
        2000
    );
    $('.fun-level-3').animateNumber(
        {
          number: 24
        },
        2000
    );
    $('.circle').circleProgress({
      size: 212,
      startAngle: -Math.PI / 4 * 2,
      animation: ({
        duration: 2000
      }),
      fill: {
        color: '#77a736'
      }
    });

  }
}

//Interval start and stop animation circle
var circle = $('.benefits__percent');
if ($('.benefits').length) {
  setInterval(function () {
    circle.toggleClass('paused');
  }, 4000);
}
animateNumberAndProgress();

//Start animation circle in viewport
$(document).on('scroll resize ready', function () {
  if ($('.benefits').length) {
    var el = $('.benefits__percents'),
        bodyScroll = $('body').scrollTop(),
        wh = $(window).outerHeight(),
        elHeight = el.outerHeight(),
        elHeightHalf = elHeight / 4,
        pos = el.offset().top - wh + elHeightHalf;

    if (bodyScroll >= pos) {
      animateNumberAndProgress();
      el.addClass('js-animate-circle');
      $(document).off('scroll resize ready');
    }
  }

});
