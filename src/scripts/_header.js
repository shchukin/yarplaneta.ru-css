(function($) {

    const $html = $('html');

    $(window).on('scroll', isDocumentScrolled);
    $(document).ready(isDocumentScrolled);

    function isDocumentScrolled() {
        if( $(window).scrollTop() > 10 ) {
            $html.addClass('document-scrolled');
        } else {
            $html.removeClass('document-scrolled');
        }
    }

})(jQuery);
