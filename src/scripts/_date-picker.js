(function($) {


    $('.date-picker__handler').on('click', function () {
        const $thisDatePicker = $(this).parents('.date-picker');
        $('.date-picker').not($thisDatePicker).removeClass('date-picker--expanded'); /* Закрываем все, кроме тещуего */
        $thisDatePicker.toggleClass('date-picker--expanded');
    });


    /* hide popup by overlay click ( goo.gl/SJG2Hw ) */

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.date-picker').length) {
            $('.date-picker').removeClass('date-picker--expanded');
        }
    });


    /* hide popup by Esc press */

    $(document).on('keyup', function(event) {
        if (event.keyCode === 27) {
            $('.date-picker').toggleClass('date-picker--expanded');
        }
    });



})(jQuery);
