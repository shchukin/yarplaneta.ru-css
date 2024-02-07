(function($) {

    /* Инициализируем Swiper */

    let scheduleDayList;

    function initScheduleDayList() {

        if(scheduleDayList) { /* Если это не первая инициализация */
            scheduleDayList.destroy();
        }

        scheduleDayList = new Swiper(".related__carousel--all-screens .swiper", {
            navigation: {
                prevEl: '.swiper__control--prev',
                nextEl: '.swiper__control--next',
            },
            mousewheel: {
                forceToAxis: true,
            },
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 16,
            breakpoints: {
                740: {
                    pagination: {
                        el: '.swiper__pagination',
                        clickable: true,
                    },
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 24,
                },
            }
        });
    }


    $(document).ready(initScheduleDayList);

    $(window).on('resize', function () {
        setTimeout(initScheduleDayList, 1000)
    });



    //
    // let scheduleDayList;
    //
    // function initScheduleDayList() {
    //
    //     if(scheduleDayList) { /* Если это не первая инициализация */
    //         scheduleDayList.destroy();
    //     }
    //
    //     if( window.matchMedia('(min-width: 740px)').matches ) { /* Только на десктопах */
    //         scheduleDayList = new Swiper(".related__carousel--all-screens .swiper", {
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
    // $(document).ready(initScheduleDayList);
    //
    // $(window).on('resize', function () {
    //     setTimeout(initScheduleDayList, 1000)
    // });

})(jQuery);
