import React, { useEffect, useState } from 'react';

export default function RemoteLogo({ src, color = '#2563eb', className = '', width = null, height = null }) {
    const [svgContent, setSvgContent] = useState('');

    useEffect(() => {
        fetch(src)
            .then(res => res.text())
            .then(svg => {
                let cleanedSvg = svg.replace(/(width|height)="[^"]*"/g, '');
                cleanedSvg = cleanedSvg.replace(/fill="[^"]*"/g, `fill="${color}"`);
                cleanedSvg = cleanedSvg.replace(/style="[^"]*fill:[^;"}]+;?[^"]*"/g, `style="fill:${color};"`);
                cleanedSvg = cleanedSvg.replace(/<svg([^>]*)/, `<svg$1 fill="${color}"`);
                if (width !== null) {
                    cleanedSvg = cleanedSvg.replace(/<svg([^>]*)/, `<svg$1 width=\"${width}\"`);
                }
                if (height !== null) {
                    cleanedSvg = cleanedSvg.replace(/<svg([^>]*)/, `<svg$1 height=\"${height}\"`);
                }
                setSvgContent(cleanedSvg);
            });
    }, [src, color, width, height]);

    return (
        <span
            className={className}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
}
