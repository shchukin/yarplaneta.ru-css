(function($) {


    $(window).on('load', function () {
        $('.filter__handler').each(function () {
            $(this).css('width', $(this).outerWidth());
        });
    });


    $('.filter__option').on('click', function (){
        const $this = $(this);
        const value = $this.html();
        $this.parents('.filter').find('.filter__handler').html(value);
        $this.parents('.filter').removeClass('filter--expanded');
    });




    $('.filter__handler').on('click', function () {
        const $filter = $(this).parents('.filter');
        $('.filter').not($filter).removeClass('filter--expanded'); /* Закрываем все, кроме тещуего */
        $filter.toggleClass('filter--expanded');
    });


    /* hide popup by overlay click ( goo.gl/SJG2Hw ) */

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.filter').length) {
            $('.filter').removeClass('filter--expanded');
        }
    });


    /* hide popup by Esc press */

    $(document).on('keyup', function(event) {
        if (event.keyCode === 27) {
            $('.filter').toggleClass('filter--expanded');
        }
    });



})(jQuery);
