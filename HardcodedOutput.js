import React from 'react';

export default function RGBOutput({colors, width=400, height=600}) {
    const colorsStr = '';
    for(let i = 0; i < colors.length; i += 1){
        const c = colors[i];
        const curStr = `(${c[0]}, ${c[1]}, ${c[2]}), `;
    }
    const actualText = `const palettes = [${colorsStr}];`
    return (
      <textarea
        value={actualText}
        disabled
        style={{ width: props.width, height: props.height }}
      />
    );
  }