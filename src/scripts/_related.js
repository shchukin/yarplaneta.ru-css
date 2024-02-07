(function($) {

    /* Инициализируем Swiper */

    let relatedCarousel = [];

    function initRelatedCarousel() {

        if(relatedCarousel.length) { /* Если это не первая инициализация */
            relatedCarousel.destroy();
        }

        $('.related__carousel .swiper').each(function () {

            const amountOfSlides = $(this).data('slides') ? $(this).data('slides') : 3;

            const swiperInstance = new Swiper($(this)[0], {
                navigation: {
                    prevEl: '.swiper__control--prev',
                    nextEl: '.swiper__control--next',
                },
                mousewheel: {
                    forceToAxis: true,
                },
                pagination: {
                    el: '.swiper__pagination',
                    clickable: true,
                },

                /* Смартфоны: */
                slidesPerView: 1, /* на смартфонах всегда один слайд */
                slidesPerGroup: 1,
                spaceBetween: 16,

                /* Десктопы: */
                breakpoints: {
                    740: {
                        slidesPerView: amountOfSlides, /* на десктопах столько, сколько передали */
                        slidesPerGroup: amountOfSlides,
                        spaceBetween: 24,
                    },
                }
            });

            relatedCarousel.push(swiperInstance);

        });

    }


    $(document).ready(initRelatedCarousel);

    $(window).on('resize', function () {
        setTimeout(initRelatedCarousel, 1000)
    });

})(jQuery);
