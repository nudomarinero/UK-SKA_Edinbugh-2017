(function($) {

    'use strict';

    (function($) {
        $.fn.toggleDisabled = function() {
            return this.each(function() {
                var $this = $(this);
                if ($this.attr('disabled')) $this.removeAttr('disabled');
                else $this.attr('disabled', 'disabled');
            });
        };
    })(jQuery);


    /**
     * =====================================
     * Function for windows height and width
     * =====================================
     */
    function windowSize(el) {
        var result = 0;
        if ("height" == el)
            result = window.innerHeight ? window.innerHeight : $(window).height();
        if ("width" == el)
            result = window.innerWidth ? window.innerWidth : $(window).width();

        return result;
    }


    /**
     * =====================================
     * Function for windows height and width
     * =====================================
     */
    function deviceControll() {
        if (windowSize('width') < 768) {
            $('body').removeClass('desktop').removeClass('tablet').addClass('mobile');
        } else if (windowSize('width') < 992) {
            $('body').removeClass('mobile').removeClass('desktop').addClass('tablet');
        } else {
            $('body').removeClass('mobile').removeClass('tablet').addClass('desktop');
        }
    }

    function contributionReadonlyCheck() {
        if($("#id_contribution").is(':checked')) {
                $('#id_title').prop('readonly', false);
                $('#id_abstract').prop('readonly', false);
                $('#id_link').prop('readonly', false);
            } else {
                $('#id_title').prop('readonly', true);
                $('#id_abstract').prop('readonly', true);
                $('#id_link').prop('readonly', true);
            }
    }


    $(window).on('resize', function() {

        deviceControll();

    });



    $(document).on('ready', function() {

        deviceControll();

        if($("#id_p_update").length) {
            $('#id_email').prop('readonly', true);
        }

        contributionReadonlyCheck();

        $('#id_contribution').click(function() {
            contributionReadonlyCheck();
        });

        /**
         * =======================================
         * Top Navigaion Init
         * =======================================
         */
        // var navigation = $('#js-navbar-menu').okayNav({
        //     toggle_icon_class: "okayNav__menu-toggle",
        //     toggle_icon_content: "<span /><span /><span /><span /><span />"
        // });



        /**
         * =======================================
         * Top Fixed Navbar
         * =======================================
         */
        $(document).on('scroll', function() {
            var activeClass = 'navbar-home',
                ActiveID = '.main-navbar-top',
                scrollPos = $(this).scrollTop();

            if (scrollPos > 10) {
                $(ActiveID).addClass(activeClass);
            } else {
                $(ActiveID).removeClass(activeClass);
            }
        });




        /**
         * =======================================
         * NAVIGATION SCROLL
         * =======================================
         */

        // Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });


    });


}(jQuery));