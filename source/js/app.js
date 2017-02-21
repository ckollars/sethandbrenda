(function($) {

  /*
    Define global scope
  */
  var app = window.app || {};

  app.$el = {
    body: $('body'),
    navHamburger: $('.js-nav-toggle'),
    nav: $('.main-nav-wrapper')
  }

  app.bp = {
    xs: 420,
    s: 700,
    m: 880,
    l: 1100
  }

  /*
    jQuery document ready
  */
  $(function() {

    if($('iframe').length) {
      console.log('true');


      $('iframe').wrap( '<div class="embed-container"></div>' );
    }

    // Sidebar quote carousel
    if($('.section__sidebar .quote').length > 1) {

      $('.quote-wrapper').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'linear'
      });

    }

    $('.carousel').on('init', function(){
      // remove loading class
      $('.carousel').removeClass('loading');
    });

    if($('.carousel').length >= 1) {

      $('.carousel').slick({
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        speed: 0,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'linear',
        responsive: [
          {
            breakpoint: app.bp.m,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: app.bp.s,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: app.bp.xs,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }

    // Menu trigger
    app.$el.navHamburger.on('click', function(event){
      event.preventDefault();
      $(this).toggleClass('is-open');

      app.$el.body.toggleClass('main-nav--is-visible');
    });
  });

})( jQuery );
