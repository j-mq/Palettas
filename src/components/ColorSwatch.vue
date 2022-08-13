<template>
  <div class="colorSwatches">
    <div class="mainColor" :style="{ background: color }">
      <button
        class="editButton"
        :style="{ color: buttonColor }"
        @click="onDelete"
      >
        <i class="fa-solid fa-square-xmark"></i>
      </button>
      <button
        class="editButton"
        :style="{ color: buttonColor }"
        @click="onEdit"
      >
        <i class="fa-solid fa-palette"></i>
      </button>
    </div>
    <div class="colorShade"></div>
    <div class="colorShade"></div>
    <div class="colorShade"></div>
    <div class="colorShade"></div>
    <div class="colorShade"></div>
    <div class="colorShade"></div>
    <div class="colorShade"></div>
  </div>
</template>

<script>
import { CSSRGBToRgb, rgbToHsv } from '../utils/conversions.js';
export default {
  name: 'ColorSwatch',
  props: {
    color: {
      type: String,
      default: '#ffffff',
    },
  },
  emits: ['delete-color'],
  computed: {
    buttonColor() {
      const { r, g, b } = CSSRGBToRgb(this.color);
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
