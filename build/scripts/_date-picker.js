(function($) {

    /* Открытие выпадайки */

    $('.date-picker__handler').on('click', function () {
        const $thisDatePicker = $(this).parents('.date-picker');
        $('.date-picker').not($thisDatePicker).removeClass('date-picker--expanded'); /* Закрываем все, кроме тещуего */
        $thisDatePicker.toggleClass('date-picker--expanded');
    });



    /* Закрытие выпадайки  */

    /* hide popup by overlay click ( goo.gl/SJG2Hw ) */

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.date-picker__handler, .date-picker__dropdown, i').length) { /* Здесь тег <i> как часть датапикера внутри .air-datepicker-nav--title -- почему-то не регистрирует клик как часть .date-picker__dropdown */
            $('.date-picker').removeClass('date-picker--expanded');
        }
    });


    /* hide popup by Esc press */

    $(document).on('keyup', function(event) {
        if (event.keyCode === 27) {
            $('.date-picker').toggleClass('date-picker--expanded');
        }
    });



    /* Инициализируем AirDatepicker */

    new AirDatepicker('.date-picker__inner', {
        'inline': true,
        'onSelect': function (element) {
            $(element.datepicker.$el).parents('.date-picker').removeClass('date-picker--expanded').addClass('date-picker--selected');
        }
    });


    /* Инициализируем Swiper */

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
