(function($) {

    /* Инициализируем Swiper */

    let relatedCarousel;

    function initRelatedCarousel() {

        if(relatedCarousel) { /* Если это не первая инициализация */
            relatedCarousel.destroy();
        }

        relatedCarousel = new Swiper(".related__carousel .swiper", {
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
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 16,
            breakpoints: {
                740: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 24,
                },
            }
        });
    }


    $(document).ready(initRelatedCarousel);

    $(window).on('resize', function () {
        setTimeout(initRelatedCarousel, 1000)
    });

})(jQuery);
