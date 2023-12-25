(function ($) {

    $(window).on('load', stick);
    $(window).on('resize', stick);

    function stick() {
        $('.sticky').each(function () {
            const $this = $(this);
            if($this.outerHeight() + 2 * parseInt($this.css('top'), 10) < $(window).outerHeight() ) {
                $this.addClass('sticky--possible');
            } else {
                $this.removeClass('sticky--possible');
            }
        });
    }

})(jQuery);

