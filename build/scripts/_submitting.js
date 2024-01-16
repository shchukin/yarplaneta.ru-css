(function($) {

    $('.submitting-handler').on('click', function (event) {
        event.preventDefault();
        const $this = $(this);
        const $form = $this.parents('.submitting').find('.submitting__form');
        const $response = $this.parents('.submitting').find('.submitting__response');
        const $inputs = $form.find('.input__widget');
        const formWidth = $form.outerWidth();
        const formHeight = $form.outerHeight();
        const randomZeroOrOne = (Math.random() >= 0.5 ) ? 1 : 0;

        if ( !$this.hasClass('button--loading') ) {
            $this.addClass('button--loading');
            $inputs.attr('disabled', true);
            setTimeout(function () {
                $this.removeClass('button--loading');
                $inputs.attr('disabled', false);
                $form.hide();
                $response.show(); /* Здесь можно добавлять в DOM */
                $response.css('width', formWidth);
                $response.css('height', formHeight);

                /* Показываем один из двух вариантов (успех или нет): */
                $response.find('.inner-alert').eq( randomZeroOrOne ).hide();
                $response.find('.inner-alert').eq( 1 - randomZeroOrOne ).show();
            }, 1500);
        }
    });

    $('.inner-alert__action').on('click', function () {
        $(this).parents('.submitting__response').hide();
        $(this).parents('.submitting').find('.submitting__form').show();
    });

    $('.mfp-close').on('click', function () {
        setTimeout(function (){
            $('.submitting__form').show();
            $('.submitting__response').hide();
        }, 1000);
    });

})(jQuery);
