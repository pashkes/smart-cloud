'use strict';

//slider page initialization
var slider = $('.slider');
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
          breakpoint: 1025,
          settings: "unslick"
        }
      ]
    });
  }

  //autoplay slider what it is position in viewport
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
//resize slider
$(window).on('orientationchange', function () {
  if (slider.length) {
    slider.slick('resize');
  }
});
initializeSlider();

$(function () {

  //show table-row pricing
  if ($('.pricing').length) {
    $('.pricing__option-more').on('click', function () {
      $(this).text(function (i, text) {
        return text === "More" ? "Hide" : "More";
      });

      $(this).parents('.pricing__group').toggleClass('js-row-show');
    });
  }

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
  var burger = $('.burger');
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
});

//Animate number and Progress bar
function animateNumberAndProgress() {
  if ($('.benefits').length) {
    $('.fun-level').animateNumber(
        {
          easing: 'easeInQuad',
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


//ANIMATION ON SCROLL
document.addEventListener('DOMContentLoaded', function () {
  var trigger = new ScrollTrigger({
    toggle: {
      visible: 'show-element'
    },
    offset: {
      x: 0,
      y: 200
    },
    once: true
  }, document.body, window);
});

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

$(function () {
  if($('.customers').length) {
    $('.js-review-full').on('click', function () {
        $(this).parents('.customers__review').toggleClass('customers__review--show');
        $(this).toggleClass('customers__btn--active');
    });
    $('.js-hide-review').on('click', function () {
      $(this).parents('.customers__review').removeClass('customers__review--show');
      $(this).removeClass('customers__btn--active');
      var  posReview = $(this).parents('.customers__review');
      console.log(posReview);
      $('body,html').animate({
        scrollTop: posReview.offset().top - 90
      }, 800);
      return false;
    });
  }
});