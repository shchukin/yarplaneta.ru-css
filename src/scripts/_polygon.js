(function ($) {

    $(window).on('load', function () {
        $('.sharp-polygon').each(function () {
            const $this = $(this);

            const width = $this.outerWidth();
            const height = $this.outerHeight();
            const angleWidth = 50;
            const angleHeight = 100;
            const stroke = 10;

            $this.prepend(
                `<svg class="sharp-polygon__background" width="${width}" height="${height}">` +
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


        $('.polygon').each(function () {
            const $this = $(this);

            const width = 640;
            const height = 552;
            const angleWidth = 82;
            const angleHeight = 107;
            const stroke = 10;
            const radius = 50;

            const path = `<path d="
                M0,50 
                C0,22 22,0 50,0 
                L533,0 
                C550,0 566,8.49753818 575,22.6107982 
                L631.745255,109.076705 
                C637.130039,117.264245 640,127 640,137 
                L640,502 
                C640,530 618,552 590,552 
                L50,552 C22,552 0,530 0,502 
                L0,50 
                Z
            "> 
            </path>
            <path id="ld2" d="
                M ${stroke} ${stroke}
                L ${width - angleWidth} ${stroke}
                L ${width - stroke} ${angleHeight}
                L ${width - stroke} ${height - stroke}
                L 10  ${height - stroke}
                Z
            ">
            `;


            $this.prepend(
                `<svg class="polygon__background" width="${width}" height="${height}"> +
                    <defs>
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
                        <clipPath id="clip">
                            <use xlink:href="#ld2"/>
                        </clipPath>
                    </defs>
                    <g>
                        <use id="hover" xlink:href="#ld2" stroke="#0081C6" stroke-width="${stroke * 2}" fill="#00D2B8" clip-path="url(#clip2)"/>
                    </g>
                </svg>`
            )
        });
    });

})(jQuery);
