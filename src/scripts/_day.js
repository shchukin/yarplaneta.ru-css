(function($) {

    $('.day').on('click', function () {
        const $this = $(this)
        $('.day').not($this).removeClass('day--selected'); /* Закрываем все, кроме тещуего */
        $this.toggleClass('day--selected');
    });



})(jQuery);
