<template>
  <div class="container">
    <div class="layoutContainer">
      <ColorSampling @extracted-colors="onExtractColors" />
      <div class="colorSwatchList">
        <ColorSwatch
          v-for="color in colors"
          :key="color.id"
          :color="color.color"
          @delete-color="onDeleteColor(color.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ColorSampling from './components/ColorSampling.vue';
import ColorSwatch from './components/ColorSwatch.vue';
export default {
  name: 'App',
  components: { ColorSampling, ColorSwatch },
  data() {
    return {
      colors: [
        {
          id: 'default',
          color: 'rgb(128, 128, 128)',
        },
      ],
    };
  },
  methods: {
    onExtractColors(colors) {
      let filteredSimilarColors = [];
      colors.forEach((colorA) => {
        const similarColor = filteredSimilarColors.filter((colorB) => {
          const range = 10;
          if (
            colorA.r === colorB.r &&
            colorA.g === colorB.g &&
            colorA.b === colorB.b
          ) {
            return true;
          }
          if (
            colorA.r <= colorB.r + range &&
            colorA.r >= colorB.r - range &&
            colorA.g <= colorB.g + range &&
            colorA.g >= colorB.g - range &&
            colorA.b <= colorB.b + range &&
            colorA.b >= colorB.b - range
          ) {
            return true;
          }

          return false;
        });
        if (similarColor.length === 0) {
          filteredSimilarColors.push(colorA);
        }
      });
      const newColors = filteredSimilarColors.map((color) => {
        return {
          id: `${color.r}-${color.g}-${color.b})-extracted`,
          color: `rgb(${color.r}, ${color.g}, ${color.b})`,
        };
      });
      this.colors = [...newColors];
    },
    onDeleteColor(id) {
      const newColors = this.colors.filter((color) => color.id !== id);
      this.colors = [...newColors];
    },
  },
};
</script>

<style>
body {
  background-color: #808080;
  margin: 0px;
  padding: 0px;
}
div {
  box-sizing: border-box;
}
.container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.layoutContainer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 350px;
}
.colorSwatchList {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 32px 0px;
  flex-direction: column;
}
</style>
