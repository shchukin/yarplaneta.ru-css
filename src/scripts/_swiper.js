(function($) {

    let scheduleDayList;

    function initScheduleDayList() {

        if(scheduleDayList) { /* Если это не первая инициализация */
            scheduleDayList.destroy();
        }

        if( window.matchMedia('(min-width: 740px)').matches ) { /* Только на десктопах */
            scheduleDayList = new Swiper(".swiper", {
                navigation: {
                    prevEl: '.date-picker__control--prev',
                    nextEl: '.date-picker__control--next',
                },
                mousewheel: {
                    forceToAxis: true,
                },
                slidesPerView: 4,
                slidesPerGroup: 3,
                spaceBetween: 16,
                breakpoints: {
                    1500: {
                        slidesPerView: 5,
                        slidesPerGroup: 4,
                        spaceBetween: 20,
                    },
                }
            });
        }
    }


    $(document).ready(initScheduleDayList);

    $(window).on('resize', function () {
        setTimeout(initScheduleDayList, 1000)
    });


})(jQuery);

