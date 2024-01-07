(function($) {

    $(document).ready(init);
    $(window).on('resize', init);

    let isUserScreenMobile = false;

    function init() {
        isUserScreenMobile = window.matchMedia('(max-width: 739px)').matches;
    }

    $('.nav--header .nav__heading').on('click', function (event) {
        // if(isUserScreenMobile) {
            event.preventDefault();
            $(this).parents('.nav__column').toggleClass('nav__column--expanded');
        // }
    });


})(jQuery);
