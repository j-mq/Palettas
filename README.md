# palettas

## Description

This simple app was made to help generate color palettes for digital illustration.

Simply drag an image into the drop-zone, the predominant colors will be extracted and displayed below. Ideally use the flat colors that will be used in the illustration.

The light tones and shadows that accompany the base color follow the formula below:
Shadows: Progressive lower value, higher saturation and rotate towards the cold area of the spectrum (blue).
Light: Progressive higher value, lower saturation and rotate towards the hot area of the spectrum (yellow).

While the choice of colors is directed towards a more cartoonish style, it can be adjusted with the values in ```getLightScales``` and ```getDarkScales``` functions inside conversions.js

The algorithm used to get the average color of the image comes from https://github.com/zygisS22/color-palette-extraction

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
