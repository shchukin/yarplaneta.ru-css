(function($) {

    $('.filter__handler').on('click', function () {
        const $filter = $(this).parents('.filter');
        $('.filter').not($filter).removeClass('filter--expanded'); /* Закрываем все, кроме тещуего */
        $filter.toggleClass('filter--expanded');
    });


    /* hide popup by overlay click ( goo.gl/SJG2Hw ) */

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.filter').length) {
            $('.filter').toggleClass('filter--expanded');
        }
    });


    /* hide popup by Esc press */

    $(document).on('keyup', function(event) {
        if (event.keyCode === 27) {
            $('.filter').toggleClass('filter--expanded');
        }
    });


})(jQuery);
