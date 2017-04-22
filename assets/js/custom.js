'use strict';

/**
 * Document ready functions
 */

$.fn.isOnScreen = function () {
  //Window Object
  var win = $(window);
  //Object to Check
  var obj = $(this);
  //the top Scroll Position in the page
  var scrollPosition = win.scrollTop();
  //the end of the visible area in the page, starting from the scroll position
  var visibleArea = win.scrollTop() + win.height();
  //the end of the object to check
  var objEndPos = (obj.offset().top + obj.outerHeight());
  return (visibleArea >= objEndPos && scrollPosition <= objEndPos ? true : false)
};
//slider page initialization
function initializeSlider() {
  if (slider.length) {
    slider.slick({
      vertical: true,
      verticalSwiping: true,
      accessibility: true,
      centerPadding: '0px',
      infinite: true,
      centerMode: true,
      dots: true,
      arrows: false,
      useTransform: false,
      adaptiveHeight: true,
      autoplay: false,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1024,
          settings: "unslick"
        }
      ]
    });
  }
  //

  var played = false;

  $(window).on('scroll load ready resize', function () {
    if (slider.length) {
      var windowHeight = $(window).height();
      var sliderOffsetTop = slider.offset().top;
      var sliderHeight = slider.height() / 2;
      slider.slick('resize');
      if ($('body').scrollTop() > sliderOffsetTop - windowHeight + (sliderHeight * 2) && $('body').scrollTop() < sliderOffsetTop + sliderHeight) {
        if (!played) {
          slider.slick('slickPlay');
          played = true;
        }
      } else {
        slider.slick('slickPause');
        played = false;
      }
    }


  });


  //toggle key up slider
  slider.keyup(function (e) {
    if (e.keyCode === 38) $(this).slick('slickPrev');     // enter
    if (e.keyCode === 40) $(this).slick('slickNext');   // esc
  });
}
$(window).on('orientationchange', function () {
  if (slider.length) {
    slider.slick('resize');
  }
});
var slider = $('.slider');

initializeSlider();
(function ($) {
  $(document).ready(function () {

    $('.pricing__more-item').hide();

    $('.pricing__option-more').on('click', function () {
          $(this).text(function (i, text) {
            return text === "more" ? "hide" : "more";
          });
          $('.pricing__more-item').toggle();
          $('.pricing__group1').toggleClass('pricing__group--active');
          $('.pricing__more-item').toggleClass('pricing__more-item--show')
        });

        //open-close help pricing
        if ($('.pricing__what').length) {
          $('.pricing__what').on('click', function () {
            $(this).toggleClass('pricing__what--active');
            $('.pricing__help').toggleClass('js-help-show')
          });
        }
        $(document).mouseup(function (e) {
          if ($('.pricing__what').has(e.target).length === 0) {
            $('.pricing__help').removeClass('js-help-show');
            $('.pricing__what').removeClass('pricing__what--active');
          }
        });


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
animateNumberAndProgress();

var isMobile = navigator.userAgent.match(/Mobile/i) == "Mobile";


//Start animation in viewport
(function ($) {

  $(window).on('scroll load resize ready', function () {
    var animateElements = [
          $('.intro__subject'),
          $('.intro__subtitle'),
          $('.intro__btn-visible'),
          $('.banner'),
          $('.features__title'),
          $('.subscribe__title'),
          $('.subscribe__subtitle'),
          $('.subscribe__item '),
          $('.platforms__icon'),
          $('.platforms__title'),
          $('.platforms__text')
        ],
        visibleClass = "show-element";

    $.each(animateElements, function (key, selector) {
      if (selector.length && !selector.hasClass(visibleClass)) {
        if (selector.isOnScreen() || isMobile) {
          selector.addClass(visibleClass);
        }
      }
    });

  });
})(jQuery);


//Start animation circle in viewport
$(document).on('load scroll resize ready', function () {
  if ($('.benefits').length) {
    var circle = $('.benefits__percents'),
        circleHeight = circle.outerHeight(),
        bodyScrollTop = $('body').scrollTop(),
        elHeightHalfCircle = circleHeight / 4,
        whWindow = $(window).outerHeight(),
        posCircle = circle.offset().top - whWindow + elHeightHalfCircle;
    if (bodyScrollTop >= posCircle) {
      animateNumberAndProgress();
      circle.addClass('js-animate-circle');
      $(document).off('scroll resize ready');
    }
  }

});