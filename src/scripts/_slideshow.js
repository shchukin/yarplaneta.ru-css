(function($) {

    function slide($slideshow, slideTo) {
        const $items = $slideshow.find('.slideshow__item')
        const $itemCurrent = $slideshow.find('.slideshow__item--current');
        const $next = $slideshow.find('.slideshow__control--next');
        const $prev = $slideshow.find('.slideshow__control--prev');
        const $dots = $slideshow.find('.slideshow__dot');
        const $dotCurrent = $slideshow.find('.slideshow__dot--current');
        const current = $itemCurrent.index();
        const total = $items.length;

        $itemCurrent.removeClass('slideshow__item--current');
        $slideshow.find('.slideshow__item').eq(slideTo).addClass('slideshow__item--current');

        $dotCurrent.removeClass('slideshow__dot--current');
        $slideshow.find('.slideshow__dot').eq(slideTo).addClass('slideshow__dot--current');

    }


    /* Навигация точками */

    $('.slideshow__dot').on('click', function () {
        const $this = $(this);
        const $slideshow = $this.parents('.slideshow');
        slide( $slideshow, $this.index());
        stopAutoScroll($slideshow);
    });



    /* Навигация стрелками */

    $('.slideshow__control').on('click', function () {
        const $this = $(this);
        const $slideshow = $this.parents('.slideshow');
        const current = $slideshow.find('.slideshow__item--current').index();
        const total = $slideshow.find('.slideshow__item').length;
        let slideTo = 0;

        if( $this.hasClass('slideshow__control--next') ) {
            if (current + 1 === total) {
                slideTo = 0;
            } else {
                slideTo = current + 1;
            }
        }

        if( $this.hasClass('slideshow__control--prev') ) {
            if (current === 0) {
                slideTo = total - 1;
            } else {
                slideTo = current - 1;
            }
        }

        slide( $(this).parents('.slideshow'), slideTo);
        stopAutoScroll($slideshow);
    });



    /* Навигация свайпами (Библиотека Hammer.js) */

    $('.slideshow').each(function () {
        const mc = new Hammer( $(this)[0] );
        mc.on("swipeleft", function (event) {

            const $slideshow = $(event.target).parents('.slideshow');
            const current = $slideshow.find('.slideshow__item--current').index();
            const total = $slideshow.find('.slideshow__item').length;
            let slideTo = 0;

            if (current + 1 === total) {
                slideTo = 0;
            } else {
                slideTo = current + 1;
            }

            slide( $slideshow, slideTo);
            stopAutoScroll($slideshow);
        });
        mc.on("swiperight", function () {
            const $slideshow = $(event.target).parents('.slideshow');
            const current = $slideshow.find('.slideshow__item--current').index();
            const total = $slideshow.find('.slideshow__item').length;
            let slideTo = 0;
            if (current === 0) {
                slideTo = total - 1;
            } else {
                slideTo = current - 1;
            }
            slide( $slideshow, slideTo);
            stopAutoScroll($slideshow);
        });
    });




    /* Навигация временем -- интервал autoScrollInterval -- один для всех */

    const $slideshowsWithAutoscroll = $('.slideshow--autoscroll');

    let autoScrollInterval = setInterval(function () {

        $slideshowsWithAutoscroll.each(function () {

            let $slideshow = $(this);

            if( ! $slideshow.hasClass('slideshow--stop-autoscroll') ) {
                let current = $slideshow.find('.slideshow__item--current').index();
                let total = $slideshow.find('.slideshow__item').length;

                if (current + 1 === total) {
                    slide($slideshow, 0);
                } else {
                    slide($slideshow, current + 1);
                }
            }

        });

    }, 5000);


    function stopAutoScroll($slideshow) {

        $slideshow.addClass('slideshow--stop-autoscroll');

        /* Если выключили все автоскроллы, то можно и глобальный интервал отменить: */
        if( $slideshowsWithAutoscroll.length === $('.slideshow--stop-autoscroll').length) {
            clearInterval(autoScrollInterval);
        }
    }


})(jQuery);
