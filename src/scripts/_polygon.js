(function ($) {

    $(window).on('load', function () {
        $('.polygon').each(function () {
            const $this = $(this);

            const width = $this.outerWidth();
            const height = $this.outerHeight();
            const angleWidth = 50;
            const angleHeight = 100;
            const stroke = 10;

            $this.prepend(
                `<svg class="polygon__background" width="${width}" height="${height}">` +
                    `<defs>` +
                        `<path id="ld" d="M ${stroke} ${stroke}` +
                            `L ${width - angleWidth} ${stroke}` +
                            `L ${width - stroke} ${angleHeight}` +
                            `L ${width - stroke} ${height - stroke}` +
                            `L 10  ${height - stroke}` +
                            `Z"` +
                        `>` +
                            `<clipPath id="clip">` +
                                `<use xlink:href="#ld"/>` +
                            `</clipPath>` +
                    `</defs>` +
                    `<g>` +
                        `<use id="hover" xlink:href="#ld" stroke="#0081C6" stroke-width="${stroke * 2}" fill="#00D2B8" clip-path="url(#clip)"/>` +
                    `</g>` +
                `</svg>`
            )
        });
    });

})(jQuery);
