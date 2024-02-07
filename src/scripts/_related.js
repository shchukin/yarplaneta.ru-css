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



    //
    // let relatedCarousel;
    //
    // function initRelatedCarousel() {
    //
    //     if(relatedCarousel) { /* Если это не первая инициализация */
    //         relatedCarousel.destroy();
    //     }
    //
    //     if( window.matchMedia('(min-width: 740px)').matches ) { /* Только на десктопах */
    //         relatedCarousel = new Swiper(".related__carousel--all-screens .swiper", {
    //             navigation: {
    //                 prevEl: '.related__control--prev',
    //                 nextEl: '.related__control--next',
    //             },
    //             mousewheel: {
    //                 forceToAxis: true,
    //             },
    //             slidesPerView: 2,
    //             slidesPerGroup: 2,
    //             spaceBetween: 16,
    //             breakpoints: {
    //                 1500: {
    //                     slidesPerView: 3,
    //                     slidesPerGroup: 3,
    //                     spaceBetween: 24,
    //                 },
    //             }
    //         });
    //     }
    // }
    //
    //
    // $(document).ready(initRelatedCarousel);
    //
    // $(window).on('resize', function () {
    //     setTimeout(initRelatedCarousel, 1000)
    // });

})(jQuery);
