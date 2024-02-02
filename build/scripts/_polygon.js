(function ($) {

    $(window).on('load', drawPolygons);
    $(window).on('resize', drawPolygons);

    function drawPolygons() {

        const userScreen = window.matchMedia('(min-width: 1500px)').matches ? 'monitor' : window.matchMedia('(max-width: 739px)').matches ? 'smartphone' : 'notebook';

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


            if ($this.hasClass('session__info')) {
                angleWidth = (userScreen === 'smartphone') ? 38 : (userScreen === 'monitor') ? 54 : 47; /* Читать справа-налево, чтобы было laptop first (как в стилях) */
                angleHeight = (userScreen === 'smartphone') ? 32 : (userScreen === 'monitor') ? 44 : 38; /* Читать справа-налево, чтобы было laptop first (как в стилях) */
                stroke = 2;
            }

            if ($this.hasClass('docs__link')) {
                angleWidth = (userScreen === 'smartphone') ? 22 : (userScreen === 'monitor') ? 54 : 47; /* Читать справа-налево, чтобы было laptop first (как в стилях) */
                angleHeight = (userScreen === 'smartphone') ? 34 : (userScreen === 'monitor') ? 44 : 38; /* Читать справа-налево, чтобы было laptop first (как в стилях) */
                stroke = 2;
            }

            if ($this.hasClass('pagination__item')) {
                angleWidth = (userScreen === 'smartphone') ? 6 : (userScreen === 'monitor') ? 10 : 9; /* Читать справа-налево, чтобы было laptop first (как в стилях) */
                angleHeight = (userScreen === 'smartphone') ? 11 : (userScreen === 'monitor') ? 13 : 12; /* Читать справа-налево, чтобы было laptop first (как в стилях) */
                stroke = 1;
            }

            if ($this.hasClass('sub-nav__link')) {
                angleWidth = (userScreen === 'smartphone') ? 15 : (userScreen === 'monitor') ? 17 : 16; /* Читать справа-налево, чтобы было laptop first (как в стилях) */
                angleHeight = (userScreen === 'smartphone') ? 15 : (userScreen === 'monitor') ? 17 : 16; /* Читать справа-налево, чтобы было laptop first (как в стилях) */
                stroke = 2;
            }

            if ($this.hasClass('button')) {
                angleWidth = (userScreen === 'smartphone') ? 15 : (userScreen === 'monitor') ? 21 : 18; /* Читать справа-налево, чтобы было laptop first (как в стилях) */
                angleHeight = (userScreen === 'smartphone') ? 20 : (userScreen === 'monitor') ? 26 : 23; /* Читать справа-налево, чтобы было laptop first (как в стилях) */
                stroke = 0;
            }

            if ($this.hasClass('button--outline')) {
                stroke = 1;
            }

            if ($this.hasClass('slideshow__control')) {
                angleWidth = (userScreen === 'smartphone') ? 9 : (userScreen === 'monitor') ? 10 : 9; /* Читать справа-налево, чтобы было laptop first (как в стилях) */
                angleHeight = (userScreen === 'smartphone') ? 14 : (userScreen === 'monitor') ? 15 : 14; /* Читать справа-налево, чтобы было laptop first (как в стилях) */
                stroke = 1;
            }

            if ($this.hasClass('day')) {
                angleWidth = (userScreen === 'smartphone') ? 15 : (userScreen === 'monitor') ? 17 : 15; /* Читать справа-налево, чтобы было laptop first (как в стилях) */
                angleHeight = (userScreen === 'smartphone') ? 12 : (userScreen === 'monitor') ? 14 : 12; /* Читать справа-налево, чтобы было laptop first (как в стилях) */
                stroke = 1;
            }


            if ($this.hasClass('panel__body')) {

                /* Отступы между карточкой и кнопкой: */
                const topPadding = (userScreen === 'smartphone') ? 10 : (userScreen === 'monitor') ? 12 : 11; /* Читать справа-налево, чтобы было laptop first (как в стилях) */;
                const leftPadding = (userScreen === 'smartphone') ? 8 : (userScreen === 'monitor') ? 10 : 9; /* Читать справа-налево, чтобы было laptop first (как в стилях) */;

                /* Размеры кнопки + отступы: */
                angleWidth = parseInt($this.parents('.panel').find('.panel__action').outerWidth(), 10) + topPadding;
                angleHeight = parseInt($this.parents('.panel').find('.panel__action').outerHeight(), 10) + leftPadding;
                stroke = 2;
            }


            /* Линия, по которой будет обрезаться полигон и рисоваться бордюр */

            let path = '';

            // M 0,7.5
            // C0 3.35787 3.35786,0 7.5,0
            // L115.43,0
            // C117.955,0 120.311,1.27115 121.698,3.38199
            // L132.768,20.2331
            // C133.572,21.4562 134,22.8876 134,24.3511
            // L134,46.5
            // C134,50.6421 130.642,54 126.5,54
            // L7.5,54
            // C3.35786,54 0,50.6421 0,46.5
            // L0,39.375
            // L0,7.5
            // Z


            /*
              В коде ниже, две строчки помеченные "→" -- слабое место. Здесь скругление углов как бы захардкожено цифрами 1,2,3,6::
              M ${0} ${radius}
              C ${0} ${radius / 2}   ${radius / 2} ${0}   ${radius} ${0}
              L ${width - angleWidth} ${0}
           →  C ${width - angleWidth + 3}  ${0}   ${width - angleWidth + 5}  ${1} ${width - angleWidth + 6} ${2}
              L ${width - 1.25}  ${angleHeight - 5}
           →  C ${width - 0.5}  ${angleHeight - 3}      ${width}  ${angleHeight - 1.5}      ${width}   ${angleHeight}
              L ${width} ${height - radius}
              C ${width} ${height - radius / 2}   ${width - radius / 2} ${height}   ${width - radius} ${height}
              L ${radius} ${height}
              C ${radius / 2} ${height}    ${0} ${height - radius / 2}    ${0} ${height - radius}
              L ${0} ${radius}
            */
            if ($this.hasClass('polygon--trapezoid')) {
                path = `
                    M ${0} ${radius}
                    C ${0} ${radius / 2}   ${radius / 2} ${0}   ${radius} ${0}
                    L ${width - angleWidth} ${0}
                    C ${width - angleWidth + 3}  ${0}   ${width - angleWidth + 5}  ${1} ${width - angleWidth + 6} ${2}
                    L ${width - 1.25}  ${angleHeight - 5}
                    C ${width - 0.5}  ${angleHeight - 3}      ${width}  ${angleHeight - 1.5}      ${width}   ${angleHeight}
                    L ${width} ${height - radius}
                    C ${width} ${height - radius / 2}   ${width - radius / 2} ${height}   ${width - radius} ${height}
                    L ${radius} ${height}
                    C ${radius / 2} ${height}    ${0} ${height - radius / 2}    ${0} ${height - radius}
                    L ${0} ${radius}
                    Z
                `;
            }

            if ($this.hasClass('polygon--card')) {
                path = `
                    M ${radius} ${0}
                    L ${width - radius} ${0}
                    C ${width - radius / 2} ${0}   ${width} ${radius / 2}     ${width} ${radius}
                    L ${width} ${height - angleHeight - radius}
                    C ${width} ${height - angleHeight - radius / 2}    ${width - radius / 2} ${height - angleHeight}    ${width - radius} ${height - angleHeight}
                    L ${width - angleWidth + radius} ${height - angleHeight}
                    C ${width - angleWidth + radius / 2} ${height - angleHeight}    ${width - angleWidth} ${height - angleHeight + radius / 2}    ${width - angleWidth} ${height - angleHeight + radius}
                    L ${width - angleWidth} ${height - radius}
                    C ${width - angleWidth} ${height - radius / 2}   ${width - angleWidth - radius / 2} ${height}   ${width - angleWidth - radius} ${height}
                    L ${radius} ${height}
                    C ${radius / 2}  ${height}     ${0} ${height - radius / 2}     ${0} ${height - radius}
                    L ${0} ${radius}
                    C ${0} ${radius / 2}    ${radius / 2} ${0}    ${radius} ${0}
                    Z
                `;
            }

            /* Удаляем форматирование (переносы строки и табуляции) */
            path = path.replace(/\s\s+/g, ' ');

            /* Вырезаем нужную форму: */
            $this.attr('style', `clip-path: path('${path}')`);

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
