(function($) {

    $('.question__submit .button').on('click', function (event) {
        event.preventDefault();
        const $this = $(this);
        const $form = $this.parents('.question');
        const $inputs = $form.find('.input__widget');
        const $alert = Math.random() < 0.5 ? $form.siblings('.inner-alert--success') : $form.siblings('.inner-alert--danger');
        let formWidth = $form.outerWidth();
        let formHeight = $form.outerHeight();

        if ( !$this.hasClass('button--loading') ) {
            $this.addClass('button--loading');
            $inputs.attr('disabled', true);
            setTimeout(function () {
                $this.removeClass('button--loading');
                $inputs.attr('disabled', false);
                $form.hide();
                $alert.show();
                $alert.css('width', formWidth);
                $alert.css('height', formHeight);
            }, 1500);
        }
    });

    $('.inner-alert__action').on('click', function () {
        $(this).parents('.inner-alert').hide();
        $(this).parents('.inner-alert').siblings('.question').show();
    });

    $('.mfp-close').on('click', function () {
        setTimeout(function (){
            $('.question').show();
            $('.inner-alert').hide();
        }, 1000);
    });




})(jQuery);
