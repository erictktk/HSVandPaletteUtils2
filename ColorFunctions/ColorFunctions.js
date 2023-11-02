import * as HSVUtils from "../HSVUtils";
import * as rw from "eric-random-wrapper";

/**
 * 
 * @param {Array<Number>} color - in RGB format 
 * @param {Number|null} seed - seed
 * @param {Number} hueDistRange 
 */
export function HalfwayOppositeColor(color, hueDistRange=30, seed=null){
    let actualDistRange = [];
    const randObj = new rw.RandomWrapper(seed);
    
    const direction = 1 ? randObj.choice([0, 1]) : -1;
    const rotate = direction*(Math.round(randObj.random(-hueDistRange*.5, hueDistRange*.5))+90);
    // (360/2)/2 = 90
  
    return HSVUtils.RGBHueRotate(rgb, rotate);
}


/**
 * 
 * @param {Array<Number>} color - in RGB format 
 * @param {Number|null} seed - seed
 * @param {Number} hueDistRange 
 */
export function OppositeColor(color, hueDistRange=30, seed=null){
    const randObj = new rw.RandomWrapper(seed);
    
    const direction = 1 ? randObj.choice([0, 1]) : -1;
    const rotate = direction*(Math.round(randObj.random(-hueDistRange*.5, hueDistRange*.5))+180);
    // (360/2)/2 = 90
  
    return HSVUtils.RGBHueRotate(rgb, rotate);
}


/**
 * 
 * @param {Array<Number>} color - in RGB format 
 * @param {Number|null} seed - seed
 * @param {Number} hueDistRange 
 */
export function QuarterOppositeColor(color, hueDistRange=20, seed=null){
    const randObj = new rw.RandomWrapper(seed);
    
    const direction = 1 ? randObj.choice([0, 1]) : -1;
    const rotate = direction*(Math.round(randObj.random(-hueDistRange*.5, hueDistRange*.5))+45);
    // (360/2)/2 = 90
  
    return HSVUtils.RGBHueRotate(rgb, rotate);
}


/**
 * 
 * @param {Array<Number>} color 
 * @param {Number} percentage 
 */
export function DarkColors(color, percentage=.0025){
    return color.map( e => Math.round(e*percentage) );
}

export function AccentColorRGB(rgbArr, saturationMod, ){

}


export function AccentColorRange(rgb, hue){
    
}