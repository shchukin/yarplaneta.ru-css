(function($) {

    const $html = $('html');

    $(window).on('scroll', $.throttle(250, isPageScrolled));
    $(document).ready(isPageScrolled);

    function isPageScrolled() {
        if( $(window).scrollTop() > 10 ) {
            $html.addClass('page-scrolled');
        } else {
            $html.removeClass('page-scrolled');
        }
    }

})(jQuery);
