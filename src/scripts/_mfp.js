(function($) {

    const $fixedHeader = $('.header__desktop-panel, .header__mobile-panel');
    const scrollWidth = $(window).outerWidth() - $(window).width();

    $('.mfp-handler').magnificPopup({
        type: 'inline',
        removalDelay: 200,
        showCloseBtn: false,
        callbacks: {
            open: function() {
                $fixedHeader.css({'margin-right': scrollWidth});
            },
            close: function() {
                $fixedHeader.css({'margin-right': '0'});
            }
        }
    });

})(jQuery);
