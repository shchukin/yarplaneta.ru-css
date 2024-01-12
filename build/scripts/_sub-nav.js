(function ($) {

    $('.sub-nav__handler').on('click', function () {
        $(this).parents('.sub-nav').toggleClass('sub-nav--expanded');
    });

})(jQuery);

