<template>
  <div class="colorSwatches">
    <div
      v-for="(scale, index) in lightScales"
      :key="`${scale}-${index}-light`"
      class="colorShade"
      :color="color.color"
      :style="{ background: scale }"
    />
    <div class="mainColor" :style="{ background: color }">
      <button
        class="editButton"
        :style="{ color: buttonColor }"
        @click="onDelete"
      >
        <i class="fa-solid fa-square-xmark"></i>
      </button>
    </div>
    <div
      v-for="(scale, index) in darkScales"
      :key="`${scale}-${index}-dark`"
      class="colorShade"
      :color="color.color"
      :style="{ background: scale }"
    />
  </div>
</template>

<script>
import { cssRgbToRgb, rgbToHsv, getColorScales } from '../utils/conversions.js';
export default {
  name: 'ColorSwatch',
  props: {
    color: {
      type: String,
      default: 'rgb(0, 0, 0)',
    },
  },
  emits: ['delete-color'],
  data() {
    return {
      lightScales: getColorScales(this.color).lightScales.map((color) => {
        return `rgb(${color.r}, ${color.g}, ${color.b})`;
      }),
      darkScales: getColorScales(this.color).darkScales.map((color) => {
        return `rgb(${color.r}, ${color.g}, ${color.b})`;
      }),
    };
  },
  computed: {
    buttonColor() {
      const { r, g, b } = cssRgbToRgb(this.color);
      const hsvColor = rgbToHsv(r, g, b);
      if (hsvColor.v < 0.8) {
        return '#ffffff';
      } else {
        return '#808080';
      }
    },
  },
  methods: {
    onDelete() {
      this.$emit('delete-color');
    },
  },
};
</script>

<style scoped>
.colorSwatches {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 24px;
}

.mainColor {
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;
  border: 1px solid #505050;
}
.mainColor:hover .editButton {
  display: flex;
}
.editButton {
  display: none;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  color: white;
  font-size: 16px;
}

.colorShade {
  width: 33px;
  height: 33px;
  background: white;
  border-radius: 50%;
  border: 1px solid #505050;
}
</style>
