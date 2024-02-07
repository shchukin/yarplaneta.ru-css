(function($) {


    $(window).on('load', function () {
        $('.filter__handler').each(function () {
            $(this).css('max-width', $(this).outerWidth());
        });
    });


    $('.filter__option').on('click', function (){
        const $this = $(this);
        const value = $this.html();
        $this.parents('.filter').find('.filter__handler').html(value);
        $this.parents('.filter').removeClass('filter--expanded').addClass('filter--selected');

        $this.siblings('.filter__option--selected').removeClass('filter__option--selected')
        $this.addClass('filter__option--selected');
    });




    $('.filter__handler').on('click', function () {
        const $filter = $(this).parents('.filter');
        $('.filter').not($filter).removeClass('filter--expanded'); /* Закрываем все, кроме тещуего */
        $filter.toggleClass('filter--expanded');
    });


    /* Закрытие по клику вне */

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.filter').length) {
            $('.filter').removeClass('filter--expanded');
        }
    });


    /* Закрытие по Esc */

    $(document).on('keyup', function(event) {
        if (event.keyCode === 27) {
            $('.filter').removeClass('filter--expanded');
        }
    });



})(jQuery);
