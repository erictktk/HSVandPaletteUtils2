import * as HSVUtils from "./HSVUtils";
import {Tooltip} from "@mui/material";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import {IconButton, Badge } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import NumbersIcon from '@mui/icons-material/Numbers';
import { PaletteInfo } from "./PaletteInfo";


export function Darken(colorArr, rng, min, max){
  const newColors = [];
  for(let i = 0; i < colorArr.length; i += 1){
    const curColor = colorArr[i];
    const newColor = HSVUtils.RGBBrighten(curColor, rng.random(-min, -max));
    newColors.push(newColor);
  }

  return newColors;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}



/**
 * 
 * @param {Object} o
 * @param {Array<Array<Number>>} o.colors 
 */
export function PaletteCard({colors}){
  return (
    <div style={{display: "flex"}}>
      <div style={{position: "relative"}}>
        <PaletteInfo colors={colors}/>
        <ShowColors colors={colors}/>
      </div>
      <SideStuff/>
    </div>
  );
}


export function BottomInfo({}){

}

/**
 * 
 * @param {Object} o
 * @param {Array<Array<Number>>} o.colors 
 */
export function SideStuff({colors}){
  const rgbStringCallback = () => {
    console.log("rgbStringCallback");

    //navigator.clipboard.writeText(text)
  }

  const hexStringCallback = () => {

  }

  const arrayCallback = () => {

  }
  
  return(
    <div style={{display: "flex", flexDirection: "column"}}>
      <Tooltip title="Copy RGB String">
        <IconButton color="rgb(0, 0, 0)"  style={{color: "black"}} aria-label="Copy RGB CSS" component="label" size="small" callback={rgbStringCallback}>
          <input hidden accept="image/*" type="file" />
          <ContentPasteIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Copy Hex String">
        <IconButton variant="contained" style={{color: "darkgray"}} aria-label="Copy RGB CSS"  component="label" size="small" callback={rgbStringCallback}>
          <NumbersIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="See Palette Info">
        <IconButton aria-label="Copy RGB CSS" component="label" size="small" callback={rgbStringCallback}>
          <input hidden accept="image/*" type="file" />
          <InfoIcon/>
        </IconButton>
      </Tooltip>
    </div>
  )
}

/**
 * 
 * @param {Object} o 
 * @param {Array<Array<Number>>} o.colors
 */
export function ShowColors({colors, bR=13}){
  let content = [];
  let firstBR = `${bR}px 0px 0px ${bR}px`;
  let lastBR = `0px ${bR}px ${bR}px 0px`;
  console.log(firstBR);

  //const firstWidth = 
  for(let i = 0; i < colors.length; i += 1){
    const c = colors[i];
    const curString = `rgb(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])})`;

    console.log(curString);

    const fW = 180;
    const oW = 90;

    let div;
    if (i === 0){
      div = 
      <div key={i} style={{backgroundColor: curString, minWidth: fW+"px", minHeight: '100px', borderRadius: firstBR}}/>;
    }
    else if (i === colors.length-1){
      div = 
      <div key={i} style={{backgroundColor: curString, minWidth: oW+"px", minHeight: '100px', borderRadius: lastBR}}/>;
    }
    else{
      div = 
      <div key={i} style={{backgroundColor: curString, minWidth: oW+"px", minHeight: '100px'}}/>;
    }

    //console.log(div);

    let wrappedDiv = <Tooltip title={curString}>{div}</Tooltip>

    content.push(wrappedDiv);
  }

  return (
    <div style={{display: "flex", borderRadius: "10px", overflow: "hidden", padding: "0px"}}>
      {content}    
    </div>
  )
}
