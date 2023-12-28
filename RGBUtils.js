function Clamp(value, min, max){
    return Math.max(min, Math.min(value, max));
}

/**
 * Converts RGB to HSL color format.
 * 
 * @param {Array<number>} color - RGB(A) color [R, G, B, (optional) A], R/G/B as 0-255, A as 0-1.
 * @param {Boolean} return01 - keeps values in p0, 1] range
 * @returns {Array<number>} HSL color [H, S, L], H in degrees (0-360), S and L in (0-100)
 */
export function RGBtoHSL(color, return01=false) {
    let [r, g, b, a] = [...color];
    (r /= 255), (g /= 255), (b /= 255);
    const vmax = Math.max(r, g, b),
        vmin = Math.min(r, g, b);
    let h,
        s,
        l = (vmax + vmin) / 2;

    if (vmax === vmin) {
        return [0, 0, l]; // achromatic
    }

    const d = vmax - vmin;
    s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);
    if (vmax === r) h = (g - b) / d + (g < b ? 6 : 0);
    if (vmax === g) h = (b - r) / d + 2;
    if (vmax === b) h = (r - g) / d + 4;
    h /= 6;

    if (!return01){
        return [h*360, s*100, l*100];
    }
    else{
        return [h, s, l];
    }
}

/** 
 * Converts an HSL color value to RGB
 * Assumes h range = [0, 360]  s and l range = [0, 100]
 * returns r, g, and b in the set [0, 255].
 * 
 * @param {Number} h 
 * @param {Number} s 
 * @param {Number} l 
 */
export function HSLtoRGB(h, s, l){
    const [h2, s2, l2] = [h/360.0, s/100.0, l/100.0];
    return HSLtoRGB(h2, s2, l2);
}


/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from https://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h range = [0, 360]  s and l range = [0, 100]
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
export function HSLtoRGB01(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

/**
 *
 * @param {Array<Int>} color an array of 4 or 5
 * @param {Number} hueMod from -360 to 360
 * @param {Number} saturateMod from -100 to 100
 * @param {Number} lightnessMod from -100 to 100
 */
export function HSLMod(color, hueMod = 0, saturateMod = 0, lightnessMod = 0) {
    let [r, g, b, a] = [...color];
    let [h, s, l] = RGBtoHSL([r, g, b], true);

    h = Math.clamp(h + hueMod);
    s = Math.clamp(s + saturateMod);
    l = Math.clamp(l + lightnessMod);

    let [r2, g2, b2] = HSLtoRGB01([h, s, l]);

    if (a) {
        return [r2, g2, b2, a];
    } else {
        return [r2, g2, b2];
    }
}
//#endregion



/** Mods Hue values in range 0 to 360
 *
 * @param {Array<Number>} rgb
 * @param {Number} hueRotate range is [0, 360]
 * @returns {Array<Number>}
 */
export function RGBModHue(rgb, hueRotate) {
    let hsv = RGBtoHSL(rgb);

    hsv[0] += hueRotate;

    let newRGB3 = HSLtoRGB(hsv);
    let newRGB;

    if (rgb.length === 4) {
        newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
    } else {
        newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
    }
    return newRGB;
}

/** Mods Hue values in range 0 to 100
 *
 * @param {Array<Number>} rgb
 * @param {Number} hueRotate range is [0, 360]
 * @returns {Array<Number>}
 */
export function RGBModLightness(rgb, value) {
    let hsv = RGBtoHSL(rgb);

    hsv[2] = Math.min(Math.max(hsv[2] + value, 0), 100);

    console.log(hsv);

    let newRGB3 = HSLtoRGB(hsv);
    let newRGB;

    if (rgb.length === 4) {
        newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
    } else {
        newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
    }

    return newRGB;
}


/** Sets Lightness values in range [0, 100]
 *
 * @param {Array<Number>} rgb
 * @param {Number} lightness range is [0, 100]
 * @returns {Array<Number>}
 */
export function RGBSetLightness(rgb, lightness) {
    let hsl = RGBtoHSL(rgb);

    hsl[2] = lightness;

    //console.log(hsv);

    let newRGB3 = HSLtoRGB(hsl);
    let newRGB;

    if (rgb.length === 4) {
        newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
    } else {
        newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
    }

    return newRGB;
}

/** Mods Saturation values in range [0, 100]
 *
 * @param {Array<Number>} rgb
 * @param {Number} saturation range is [0, 100]
 * @returns Array<Number>
 */
export function RGBModSaturation(rgb, saturation = 20) {
    let hsl = RGBtoHSL(rgb);
    hsl[1] = hsl[1] + saturation;
    
    hsl[1] = Clamp(hsl[1], 0, 100);

    let newRGB3 = HSLtoRGB(hsl);
    let newRGB;

    if (rgb.length === 4) {
        newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
    } else {
        newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
    }

    return newRGB;
}

/** Sets Saturation values in range [0, 100]
 *
 * @param {Array<Number>} rgb
 * @param {Number} saturation range is [0, 100]
 * @returns {Array<Number>}
 */
export function RGBSetSaturation(rgb, saturation = 60) {
    let hsl = RGBtoHSL(rgb);
    hsl[1] = saturation;

    let newRGB3 = HSLtoRGB(hsl);
    let newRGB;

    if (rgb.length === 4) {
        newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
    } else {
        newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
    }

    return newRGB;
}

export function GetLuminance(rgb) {
    const hsl = RGBtoHSL(rgb);

    return hsl[2];
}
