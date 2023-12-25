(function ($) {

    $(window).on('load', drawPolygons);
    $(window).on('resize', drawPolygons);

    function drawPolygons() {

        $('.polygon').each(function () {

            const $this = $(this);

            $this.find('.polygon__background').remove();

            /* Ширина/высота всегда по размерам родителя */
            const width = $this.outerWidth();
            const height = $this.outerHeight();

            /* Значения по умолчанию -- подходит для кнопок */
            let angleWidth = 17;
            let angleHeight = 24;
            let stroke = 1;

            /* Значения для .subnav */
            if ( $this.hasClass('subnav__link') ) {
                angleWidth = 13;
                angleHeight = 13;
                stroke = 2;
            }

            const offset = stroke / 2; /* Делаем stroke чтобы был inside */
            const radius = parseInt($this.css('border-top-left-radius')) - offset;
            const id = 'contur-' + (Math.random() + 1).toString(36).substring(7);

            /*
            * Черновик оригинального path со скруглёнными углами вокруг среза.
              offset ещё не установлен. Захардкоженные числа слишком сложно обобщить:
              <path id="ld2" d="
                M ${0} ${radius}
                C ${0} ${radius/2} ${radius/2} ${0} ${radius} ${0}
                L ${width - angleWidth - radius/2} ${0}
                C${width - angleWidth} ${0}

                  566 8.5
                  575 22.61
                L 631.75 109.076705
                C 637.130039 117.264245

                ${width} ${angleHeight + radius / 2} ${width} ${angleHeight + radius}
                L ${width} ${height - radius}
                C ${width} ${height - radius/2} ${width - radius/2} ${height} ${width - radius} ${height}
                L ${radius} ${height}
                C ${radius / 2} ${height} ${0} ${height - radius/2} ${0} ${height - radius}
                L ${0} ${radius}
                Z
            ">
            */


            $this.prepend(
                `<svg class="polygon__background" width="${width}" height="${height}">
                    <defs>
                        <path id="${id}" d="
                            M ${0 + offset} ${radius + offset} 
                            C ${0 + offset} ${radius / 2 + offset}   ${radius / 2 + offset} ${0 + offset}   ${radius + offset} ${0 + offset} 
                            L ${width - angleWidth - offset} ${0 + offset} 
                            L ${width - offset} ${angleHeight + offset}
                            L ${width - offset} ${height - radius - offset}
                            C ${width - offset} ${height - radius / 2 - offset}   ${width - radius / 2 - offset} ${height - offset}   ${width - radius - offset} ${height - offset}
                            L ${radius + offset} ${height - offset}
                            C ${radius / 2 + offset} ${height - offset}    ${0 + offset} ${height - radius / 2 - offset}    ${0 + offset} ${height - radius - offset}
                            L ${0 + offset} ${radius + offset} 
                            Z
                        ">
                        <clipPath>
                            <use xlink:href="${id}"/>
                        </clipPath>
                    </defs>
                    <g>
                        <use id="polygon__body" xlink:href="#${id}" stroke-width="${stroke}"/>
                    </g>
                </svg>`
            );

            $this.addClass('polygon--applied');
        });
    }

})(jQuery);
