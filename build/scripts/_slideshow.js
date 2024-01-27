(function($) {

    const $slideshowsAll = $('.slideshow');
    const $slideshowsWithAutoscroll = $('.slideshow--autoscroll');

    /* Слайд к любому айтему по индексу (для использования в кликах по точкам навигации и других функциях) */

    function slideByIndex($slideshow, slideTo) {
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


    /* Слайд к следующему айтему (для использования в стрелках и свайпах) */

    function slideNext($slideshow) {
        const current = $slideshow.find('.slideshow__item--current').index();
        const total = $slideshow.find('.slideshow__item').length;
        const slideTo = (current + 1 !== total) ? current + 1 : 0;
        slideByIndex( $slideshow, slideTo);
    }


    /* Слайд к предыдущему айтему (для использования в стрелках и свайпах) */

    function slidePrev($slideshow) {
        const current = $slideshow.find('.slideshow__item--current').index();
        const total = $slideshow.find('.slideshow__item').length;
        let slideTo = (current !== 0) ? current - 1 : total - 1;
        slideByIndex( $slideshow, slideTo);
    }



    /* Навигация точками */

    $('.slideshow__dot').on('click', function () {
        const $this = $(this);
        const $slideshow = $this.parents('.slideshow');
        slideByIndex( $slideshow, $this.index());
        stopAutoScroll($slideshow);
    });



    /* Навигация стрелками */

    $('.slideshow__control--next').on('click', function () {
        const $slideshow = $(this).parents('.slideshow');
        slideNext($slideshow);
        stopAutoScroll($slideshow);
    });

    $('.slideshow__control--prev').on('click', function () {
        const $slideshow = $(this).parents('.slideshow');
        slidePrev($slideshow);
        stopAutoScroll($slideshow);
    });


    /* Навигация клавиатурой */

    $(document).on('keyup', function(event) {
        if(event.key === "ArrowRight") {
            $slideshowsAll.each(function () {
                slideNext($(this));
                stopAutoScroll($(this));

            })
        }
        if(event.key === "ArrowLeft") {
            $slideshowsAll.each(function () {
                slidePrev($(this));
                stopAutoScroll($(this));
            })
        }
    });



    /* Навигация свайпами (Библиотека Hammer.js) */

    $slideshowsAll.each(function () {
        const mc = new Hammer( $(this)[0] );
        mc.on("swipeleft", function (event) {
            const $slideshow = $(event.target).parents('.slideshow');
            slideNext($slideshow);
            stopAutoScroll($slideshow);
        });
        mc.on("swiperight", function () {
            const $slideshow = $(event.target).parents('.slideshow');
            slidePrev($slideshow);
            stopAutoScroll($slideshow);
        });
    });



    /* Навигация временем (autoScrollInterval -- один для всех) */

    let autoScrollInterval = setInterval(function () {

        $slideshowsWithAutoscroll.each(function () {

            let $slideshow = $(this);

            if( ! $slideshow.hasClass('slideshow--stop-autoscroll') ) {
                slideNext($slideshow);
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
