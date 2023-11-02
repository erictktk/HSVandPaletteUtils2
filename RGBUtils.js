/**
 * Returns h [0, 360), s [0, 100), v [0, 100)
 *
 * @param {Array<int>} color
 * @returns {Array<Number>}
 */
export function rgb_to_hsv(color) {
  let r = color[0] / 255.0;
  let g = color[1] / 255.0;
  let b = color[2] / 255.0;

  let cmax = Math.max(r, Math.max(g, b));
  let cmin = Math.min(r, Math.min(g, b));
  let diff = cmax - cmin;
  let h = -1,
    s = -1;

  if (cmax === cmin) {
    h = 0;
  } else if (cmax === r) {
    h = (60 * ((g - b) / diff) + 360) % 360;
  } else if (cmax === g) {
    h = (60 * ((b - r) / diff) + 120) % 360;
  } else if (cmax === b) {
    h = (60 * ((r - g) / diff) + 240) % 360;
  }

  s = cmax === 0 ? 0 : (diff / cmax) * 100;
  let v = cmax * 100;

  return [h, s, v];
}

/**
 * HSV should be [0, 360], [0, 100] and [0, 100]
 *
 * Returns an Array of RGB values
 *
 * @param {Array<int>} hsv
 * @returns {Array<Number>}
 */
export function hsv_to_rgb(hsv) {
  let h = hsv[0] / 360;
  let s = hsv[1] / 100;
  let v = hsv[2] / 100;

  let r, g, b, i, f, p, q, t;

  if (arguments.length === 1) {
    s = hsv.s / 100;
    v = hsv.v / 100;
    h = hsv.h / 360;
  }

  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function hsv2rgb(hsv) {
  let h = hsv[0];
  let s = hsv[1] / 100;
  let v = hsv[2] / 100;

  let f = (n, k = (n + h / 60) % 6) =>
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);

  return [f(5) * 255, f(3) * 255, f(1) * 255];
}

/**
 * A faster, all-together mod
 *
 * @param {Array<int>} rgb
 * @param {Number} hueMod
 * @param {Number} saturateMod
 * @param {Number} valueMod
 * @returns {Array<Number>} an array of new RGB values
 */
export function RGBModHSV(rgb, hueMod, saturateMod, valueMod) {
  let hsv = rgb_to_hsv(rgb);

  hsv[0] = hueMod;
  hsv[1] = Math.min(Math.max(hsv[1] + saturateMod, 0), 100);
  hsv[2] = Math.min(Math.max(hsv[2] + valueMod, 0), 100);

  let newRGB3 = hsv2rgb(hsv);
  let newRGB;

  if (rgb.length === 4) {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
  } else {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
  }

  return newRGB;
}

/**
 * @param {Array<int>} rgb
 * @param {Number} hueRotate what should the range be
 * @returns {Array<Number>}
 */
export function RGBHueRotate(rgb, hueRotate) {
  let hsv = rgb_to_hsv(rgb);

  hsv[0] += hueRotate;

  let newRGB3 = hsv2rgb(hsv);
  let newRGB;

  if (rgb.length === 4) {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
  } else {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
  }
  return newRGB;
}

export function RGBModSaturate(rgb, amount) {
  let hsv = rgb_to_hsv(rgb);
  console.log("desaturate:");
  console.log(hsv);
  hsv[1] = hsv[1] + amount;

  let newRGB3 = hsv2rgb(hsv);
  let newRGB;

  if (rgb.length === 4) {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
  } else {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
  }

  return newRGB;
}

/** Going to be deprecated */
export function RGBBrighten(rgb, amount) {
  return RGBModBrightness(rgb, amount);
}

export function RGBModBrightness(rgb, amount) {
  let hsv = rgb_to_hsv(rgb);

  hsv[2] = Math.min(Math.max(hsv[2] + amount, 0), 100);

  console.log(hsv);

  let newRGB3 = hsv2rgb(hsv);
  let newRGB;

  if (rgb.length === 4) {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
  } else {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
  }

  return newRGB;
}

export function RGBDesaturate(rgb, desaturation = 50) {
  let hsv = rgb_to_hsv(rgb);
  console.log("desaturate:");
  console.log(hsv);
  hsv[1] = hsv[1] - desaturation;

  console.log(hsv);

  let newRGB3 = hsv2rgb(hsv);
  let newRGB;

  if (rgb.length === 4) {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
  } else {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
  }

  return newRGB;
}

/**
 * @param {Array<int>} rgb
 * @param {Number} brightness Value between 0 and 100
 * @returns {Array<Number>} - an array of length 3 or 4 depending on the input
 */
export function RGBSetBrightness(rgb, brightness) {
  let hsv = rgb_to_hsv(rgb);

  hsv[2] = brightness;

  let newRGB3 = hsv2rgb(hsv);
  let newRGB;

  if (rgb.length === 4) {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
  } else {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
  }

  return newRGB;
}

/**
 * @param {Array<int>} rgb
 * @param {Number} saturation Value between 0 and 100
 * @returns {Array<Number>} - an array of length 3 or 4 depending on the input
 */
export function RGBSetSaturation(rgb, saturation) {
  let hsv = rgb_to_hsv(rgb);

  // Set saturation
  hsv[1] = Math.min(Math.max(saturation, 0), 100);

  let newRGB3 = hsv2rgb(hsv);
  let newRGB;

  if (rgb.length === 4) {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
  } else {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
  }

  return newRGB;
}

/**
 * @param {Array<int>} rgb
 * @param {Number} hue Value between 0 and 360
 * @returns {Array<Number>}
 */
export function RGBSetHue(rgb, hue) {
  let hsv = rgb_to_hsv(rgb);
  

  // Set hue
  hsv[0] = hue % 360;

  let newRGB3 = hsv2rgb(hsv);
  let newRGB;

  if (rgb.length === 4) {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2], rgb[3]];
  } else {
    newRGB = [newRGB3[0], newRGB3[1], newRGB3[2]];
  }

  return newRGB;
}
