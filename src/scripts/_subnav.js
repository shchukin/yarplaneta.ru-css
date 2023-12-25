(function ($) {

    $('.subnav__handler').on('click', function () {
        $(this).parents('.subnav').toggleClass('subnav--expanded');
        drawPolygons();
    });

})(jQuery);

