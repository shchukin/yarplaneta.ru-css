(function ($) {

    $(window).on('load', drawPolygons);
    $(window).on('resize', drawPolygons);

    function drawPolygons() {

        $('.polygon').each(function () {

            const $this = $(this);

            /* 1) Ширина/высота всегда по размерам родителя. Неизменна. */
            const width = $this.outerWidth();
            const height = $this.outerHeight();


            /* 2) Оригинальный, стилевой border-radius нужен на кнопке, чтобы задать фон. Он там остаётся.
             * SVG рисующая контур внутри напрямую зависит от этого border-radius, забираем его.
             */
            const radius = parseInt($this.css('border-bottom-left-radius'));
            /* Возможно правильным вариантом будет:
             * const radius = parseInt($this.css('border-bottom-left-radius')) - stroke / 2;
             * но зависит от ситуации. Если, например, stroke будет как inner в фигме, но сейчас не так.
             */


            /* 3) Параметрические значения -- для каждой фигуры свои.
             * stroke (толщина бордюра), по-идее, надо бы извелкать из box-shadow в стилях,
             * но парсить его сложно и ненадёжно. Теоретически там может быть несколько box-shadow.
             */

            let angleWidth = 0;
            let angleHeight = 0;
            let stroke = 0;


            if ($this.hasClass('subnav__link')) {
                angleWidth = 13;
                angleHeight = 13;
                stroke = 2;
            }

            if ($this.hasClass('button--primary')) {
                angleWidth = 17;
                angleHeight = 24;
                stroke = 0;
            }

            if ($this.hasClass('button--secondary')) {
                angleWidth = 17;
                angleHeight = 24;
                stroke = 0;
            }

            if ($this.hasClass('button--outline')) {
                angleWidth = 17;
                angleHeight = 24;
                stroke = 1;
            }


            if ($this.hasClass('announcement__background')) {
                angleWidth = 186;
                angleHeight = 62;
                stroke = 2;
            }


            /* Линия, по которой будет обрезаться полигон и рисоваться бордюр */

            let path = '';

            if ($this.hasClass('polygon--trapezoid')) {
                path = `
                    M ${0} ${radius} 
                    C ${0} ${radius / 2}   ${radius / 2} ${0}   ${radius} ${0} 
                    L ${width - angleWidth} ${0} 
                    L ${width} ${angleHeight}
                    L ${width} ${height - radius}
                    C ${width} ${height - radius / 2}   ${width - radius / 2} ${height}   ${width - radius} ${height}
                    L ${radius} ${height}
                    C ${radius / 2} ${height}    ${0} ${height - radius / 2}    ${0} ${height - radius}
                    L ${0} ${radius} 
                    Z
                `;
            }

            // w = 686
            // h = 315
            // r = 6
            // angleWidth 186
            // angleHeight 62


            // width:
            // 500 503 506

            // heights:
            // 246 249 252 255 258

            if ($this.hasClass('polygon--card')) {
                path = `
                    M ${radius} ${0} 
                    L ${width - radius} ${0} 
                    C ${width - radius/2} ${0}   ${width} ${radius/2}     ${width} ${radius}  
                    L ${width} 246 
                    C ${width} 249    ${width - radius / 2} 252    ${width - radius} 252 
                    L 506 252 
                    C 503 252    500 255    500 258 
                    L 500 ${height - radius} 
                    C 500 ${height - radius/2}   497 ${height}   494 ${height} 
                    L ${radius} ${height} 
                    C ${radius/2}  ${height}     ${0} ${height - radius/2}     ${0} ${height-radius} 
                    L ${0} ${radius} 
                    C ${0} ${radius/2}    ${radius/2} ${0}    ${radius} ${0}
                    Z
                `;
            }

            /* Удаляем форматирование (переносы строки и табуляции) */
            path = path.replace(/\s\s+/g, ' ')

            /* Вырезаем нужную форму: */
            $this.attr('style', `clip-path: path('${path}')`)

            /* Опциональный контур в виде такой же формы: */
            if (stroke) {

                $this.find('.polygon__border').remove(); /* Если с прошлого раза остался .polygon__border (например при перерисовки, при ресайзе) */

                $this.prepend(`
                    <svg class="polygon__border" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                        <path id="polygon__path" stroke-width="${stroke * 2}" d="${path}" fill="none"/>
                    </svg>
                `);
            }

            /* Даём стилям понять, что алгоритм отработан и новый контур отрисован (чтобы они выключили старый) */
            $this.addClass('polygon--applied');

        });
    }

})(jQuery);


/*
  Черновик оригинального path со скруглёнными углами вокруг среза.
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

/* Черновик варианта, когда за счёт параметра offset достигался stroke по типу inner:
function generatePath(offset) {
    return `
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
    `.replace(/\s\s+/g, ' ');
}
*/
