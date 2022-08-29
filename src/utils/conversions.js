export const cssRgbToRgb = (color) => {
  const colorArray = color.replace('rgb(', '').replace(')', '').split(',');
  return {
    r: parseInt(colorArray[0]),
    g: parseInt(colorArray[1]),
    b: parseInt(colorArray[2]),
  };
};

export const hexToRgb = (h) => {
  let r, g, b;

  // 3 digits
  if (h.length == 4) {
    r = '0x' + h[1] + h[1];
    g = '0x' + h[2] + h[2];
    b = '0x' + h[3] + h[3];

    // 6 digits
  } else if (h.length == 7) {
    r = '0x' + h[1] + h[2];
    g = '0x' + h[3] + h[4];
    b = '0x' + h[5] + h[6];
  }

  if (!r || !g || !b) {
    return null;
  }

  return { r, g, b };
};

export const rgbToHsv = (r, g, b) => {
  (r /= 255), (g /= 255), (b /= 255);

  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return { h, s, v };
};

function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }

  const roundedR = Math.round(r * 255);
  const roundedG = Math.round(g * 255);
  const roundedB = Math.round(b * 255);

  return { r: roundedR, g: roundedG, b: roundedB };
}

function rgbToHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;

  return '#' + r + g + b;
}

/** Calculate Color With HSV adjustments */
export const calculateColor = (color, hueRotation, saturation, value) => {
  const rgbColor = hexToRgb(color) || cssRgbToRgb(color);
  const hsvColor = rgbToHsv(rgbColor.r, rgbColor.g, rgbColor.b);

  const saturationDecimals = saturation / 100;
  const valueDecimals = value / 100;
  const hueDecimals = hueRotation / 360;

  const newHue = hsvColor.h + hueDecimals;

  const newHsvColor = {
    h: newHue > 1 ? newHue - 1 : newHue < 0 ? 1 + newHue : newHue,
    s:
      saturationDecimals || saturationDecimals === 0
        ? saturationDecimals
        : hsvColor.s,
    v: valueDecimals || valueDecimals === 0 ? valueDecimals : hsvColor.v,
  };

  const resultRGB = hsvToRgb(newHsvColor.h, newHsvColor.s, newHsvColor.v);
  const resultHex = rgbToHex(resultRGB.r, resultRGB.g, resultRGB.b);
  return { hex: resultHex, rgb: resultRGB };
};

export const getColorScales = (mainColor) => {
  const { r, g, b } = cssRgbToRgb(mainColor);
  const hsv = rgbToHsv(r, g, b);

  const darkScalesAmount = 5;
  const lightScalesAmount = 2;
  const lightScales = getLightScales(mainColor, hsv, lightScalesAmount);
  const darkScales = getDarkScales(mainColor, hsv, darkScalesAmount);

  return { lightScales, darkScales };
};

const getLightScales = (mainColor, hsv, scaleNumber) => {
  const temperature = 20;
  const reduceSaturation = -15;
  const addValue = 15;

  const scales = [];
  for (let i = scaleNumber; i >= 1; i -= 1) {
    scales.push(
      calculateColor(
        mainColor,
        calculateHue(hsv.h, temperature, true),
        addToPercentage(hsv.s * 100, reduceSaturation * i),
        addToPercentage(hsv.v * 100, addValue * i)
      ).rgb
    );
  }
  return scales;
};

const getDarkScales = (mainColor, hsv, scaleNumber) => {
  const temperature = 20;
  const addSaturation = 15;
  const reduceValue = -15;

  const scales = [];
  for (let i = 1; i <= scaleNumber; i += 1) {
    scales.push(
      calculateColor(
        mainColor,
        calculateHue(hsv.h, temperature * i),
        addToPercentage(hsv.s * 100, addSaturation * i),
        addToPercentage(hsv.v * 100, reduceValue * i)
      ).rgb
    );
  }
  return scales;
};

const calculateHue = (hue, addition, isLight) => {
  const coldAngle = 240;
  const hotAngle = 60;
  const currentRotation = Math.round(hue);

  if (isLight) {
    const newHue =
      currentRotation > hotAngle && currentRotation < coldAngle
        ? currentRotation + addition
        : currentRotation - addition;
    return newHue > 360 ? newHue - 360 : newHue < 0 ? 360 + newHue : newHue;
  }

  const newHue =
    currentRotation < coldAngle && currentRotation > hotAngle
      ? currentRotation + addition
      : currentRotation - addition;
  return newHue > 360 ? newHue - 360 : newHue < 0 ? 360 + newHue : newHue;
};

const addToPercentage = (current, added) => {
  const newValue = Math.floor(current + added);
  return newValue > 100 ? 100 : newValue < 0 ? 0 : newValue;
};
