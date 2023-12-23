(function ($) {

    $(window).on('load', function () {
        $('.polygon').each(function () {
            const $this = $(this)
            const width = $this.outerWidth();
            const height = $this.outerHeight();

            $this.prepend(
                `<svg class="polygon__background" width="${width}" height="${height}">` +
                    `<path d="M   0   0` +
                        `L ${width - 100}   0` +
                        `L ${width} ${100}` +
                        `L ${width} ${height}` +
                        `L 0  ${height}` +
                        `Z"` +
                        ` stroke="red" stroke-width="10" fill="transparent"/>` +
                `</svg>`
            )
        });
    });

})(jQuery);
