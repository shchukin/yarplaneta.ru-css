(function($) {

    $(document).ready(init);
    $(window).on('resize', init);

    let isUserScreenMobile = false;

    function init() {
        isUserScreenMobile = window.matchMedia('(max-width: 739px)').matches;
    }

    /* Если у айтема есть подменю, то его открываем по клику. Остальные айтемы не трогаем, там пусть срабатывает href */
    $('.nav--header .nav__heading').on('click', function (event) {
        if($(this).parents('.nav__item').find('.nav__menu').length && isUserScreenMobile) {
            event.preventDefault();
            $(this).parents('.nav__item').toggleClass('nav__item--expanded');
        }
    });


})(jQuery);
