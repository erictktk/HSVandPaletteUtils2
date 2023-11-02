import * as HSVUtils from "../HSVUtils";
import * as rw from "eric-random-wrapper";


/**
 * 
 * @param {Array<Array<Number>>} colorList - colorList in the form of [[r, g, b], [r2, g2, b2], ...]
 * @param {Number|null} seed
 * @param {Number} min 
 * @param {Number} max 
 * @param {Boolean} separate 
 * @returns 
 */
export function PastelizeList(colorList, min=10, max=20, seed=null, separate=false) {
  let randObj = new rw.RandomWrapper(seed);

  const newColors = [];
  let saturationMod = randObj.randInt(-min, -max);
  let valueMod = randObj.randInt(Math.round(min*.5), Math.round(max*.5));
  for (let i = 0; i < colorList.length; i += 1) {
    const curRGB = colorList[i];
    
    if (separate){
      saturationMod = randObj.randInt(-min, -max);
      valueMod = randObj.randInt(Math.round(min*.5), Math.round(max*.5));
    }
    const newRGB = HSVUtils.RGBModHSV(curRGB, 0, saturationMod, valueMod);
    newColors.push(newRGB);
  }

  return newColors;
}

export function PastelizeConstant(colorList, amount, ){

}
