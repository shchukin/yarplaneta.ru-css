(function ($) {


    const $areas = $('.areas');

    $('#museum, #museum-link').on('mouseenter', function () {
        $areas.addClass('areas--museum');
    }).on('mouseleave', function () {
        $areas.removeClass('areas--museum');
    });

    $('#observatory, #observatory-link').on('mouseenter', function () {
        $areas.addClass('areas--observatory');
    }).on('mouseleave', function () {
        $areas.removeClass('areas--observatory');
    });

    $('#shuttle-5d, #shuttle-5d-link').on('mouseenter', function () {
        $areas.addClass('areas--shuttle-5d');
    }).on('mouseleave', function () {
        $areas.removeClass('areas--shuttle-5d');
    });

    $('#interactive-gallery, #interactive-gallery-link').on('mouseenter', function () {
        $areas.addClass('areas--interactive-gallery');
    }).on('mouseleave', function () {
        $areas.removeClass('areas--interactive-gallery');
    });

    $('#star-hall, #star-hall-link').on('mouseenter', function () {
        $areas.addClass('areas--star-hall');
    }).on('mouseleave', function () {
        $areas.removeClass('areas--star-hall');
    });

    $('#interactive-classroom, #interactive-classroom-link').on('mouseenter', function () {
        $areas.addClass('areas--interactive-classroom');
    }).on('mouseleave', function () {
        $areas.removeClass('areas--interactive-classroom');
    });


    /* Здесь адреса страниц: */
    $('#museum').on('click', function () {
        window.location.href = "areas-item.html";
    });

    $('#observatory').on('click', function () {
        window.location.href = "areas-item.html";
    });

    $('#shuttle-5d').on('click', function () {
        window.location.href = "areas-item.html";
    });

    $('#interactive-gallery').on('click', function () {
        window.location.href = "areas-item.html";
    });

    $('#star-hall').on('click', function () {
        window.location.href = "areas-item.html";
    });

    $('#interactive-classroom').on('click', function () {
        window.location.href = "areas-item.html";
    });


})(jQuery);
