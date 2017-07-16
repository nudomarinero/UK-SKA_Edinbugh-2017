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




    $(window).on('resize', function() {

        deviceControll();

    });



    $(document).on('ready', function() {

        deviceControll();

        $('.js-toggle-contribution').click(function() {
            $('.js-field-contribution').toggleDisabled();
        });

        /**
         * =======================================
         * Top Navigaion Init
         * =======================================
         */
        var navigation = $('#js-navbar-menu').okayNav({
            toggle_icon_class: "okayNav__menu-toggle",
            toggle_icon_content: "<span /><span /><span /><span /><span />"
        });



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
        var TopOffsetId = '.navbar-brand';
        $('#js-navbar-menu').onePageNav({
            currentClass: 'active',
            scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
            scrollSpeed: 1000,
            scrollOffset: Math.abs($(TopOffsetId).outerHeight() - 1)
        });

        $('.btn-scroll a, a.btn-scroll').on('click', function(e) {
            e.preventDefault();

            var target = this.hash,
                scrollOffset = Math.abs($(TopOffsetId).outerHeight()),
                $target = ($(target).offset() || { "top": NaN }).top;

            $('html, body').stop().animate({
                'scrollTop': $target - scrollOffset
            }, 900, 'swing', function() {
                window.location.hash = target;
            });

        });


    });


}(jQuery));