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


    /* Навигация временем */

    /* This may need extra work if more than one autoscroll slideshow will appear on the page.
     * Now we have one Interval for all slideshow and it should be rewritten the way
     * each slideshow has it's own interval. But there is a problem that we don't
     * have such thing as slideshow in JavaScript, they are just in DOM.
     * So need to connect  "var timeout = setInterval"  with DOM so it can be
     * clearInterval(timeout)  by clicking arrows or dots in DOM.
     */

    const timeout = setInterval(function () {
        $('.slideshow--autoscroll').each(function () {
            const $slideshow = $(this);
            const current = $slideshow.find('.slideshow__item--current').index();
            const total = $slideshow.find('.slideshow__item').length;

            if (current + 1 === total) {
                slide($slideshow, 0);
            } else {
                slide($slideshow, current + 1);
            }
        });
    }, 5000);



    /* Навигация точками */

    $('.slideshow__dot').on('click', function () {
        slide( $(this).parents('.slideshow'), $(this).index());
        clearInterval(timeout);
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
        clearInterval(timeout);
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
            clearInterval(timeout);
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
            clearInterval(timeout);
        });
    });


})(jQuery);
