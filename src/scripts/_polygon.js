(function ($) {

    $(window).on('load', function () {

        $('.polygon').each(function () {
            const $this = $(this);

            const width = $this.outerWidth();
            const height = $this.outerHeight();
            const angleWidth = 19;
            const angleHeight = 24;
            const stroke = 2;
            const offset = stroke / 2; /* Делаем stroke чтобы был inside */
            const radius = 8 - stroke;

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
                `<svg class="polygon__background" width="${width}" height="${height}"> +
                    <defs>
                        <path id="contur" d="
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
                            <use xlink:href="#contur"/>
                        </clipPath>
                    </defs>
                    <g>
                        <use id="polygon__body" xlink:href="#contur" stroke-width="${stroke}"/>
                    </g>
                </svg>`
            );

            $this.addClass('polygon--applied');
        });
    });

})(jQuery);
