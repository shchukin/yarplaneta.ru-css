(function($) {

    /* Инициализируем Swiper */

    let scheduleDayList;

    function initScheduleDayList() {

        if(scheduleDayList) { /* Если это не первая инициализация */
            scheduleDayList.destroy();
        }

        if( window.matchMedia('(min-width: 740px)').matches ) { /* Только на десктопах */

            scheduleDayList = new Swiper(".project__calendar .swiper", {
                navigation: {
                    prevEl: '.project__control--prev',
                    nextEl: '.project__control--next',
                },
                mousewheel: {
                    forceToAxis: true,
                },
                slidesPerView: 6,
                slidesPerGroup: 5,
                spaceBetween: 20,
            });
        }
    }


    $(document).ready(initScheduleDayList);

    $(window).on('resize', function () {
        setTimeout(initScheduleDayList, 1000)
    });

})(jQuery);
