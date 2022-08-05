<template>
  <div class="colorSampling">
    <div
      class="dropZone"
      :style="{ background: isDraggingOver ? '#cccccc' : 'none' }"
      @drop="onDrop"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
    >
      <i v-show="extractedColors.length == 0" class="fa-solid fa-image"></i>
      <canvas
        id="canvas"
        :style="{ display: extractedColors.length == 0 ? 'none' : 'flex' }"
      ></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorSampling",
  props: {},
  emits: ["extracted-colors"],
  computed: {},
  data() {
    return {
      isDraggingOver: false,
      extractedColors: [],
    };
  },
  methods: {
    onChange(event) {
      if (event.target.files) {
        console.log("file", event.target.files[0]);
      }
    },
    onDrop(event) {
      event.preventDefault();
      event.stopPropagation();
      this.isDraggingOver = false;
      if (event.dataTransfer.items) {
        for (let i = 0; i < event.dataTransfer.items.length; i++) {
          if (event.dataTransfer.items[i].kind === "file") {
            const file = event.dataTransfer.items[i].getAsFile();
            if (file) {
              this.importFile(file);
            }
          }
        }
      } else if (event.dataTransfer.files[0]) {
        this.importFile(event.dataTransfer.files[0]);
      }
    },
    onDragOver(event) {
      event.preventDefault();
      event.stopPropagation();
      this.isDraggingOver = true;
    },
    onDragLeave() {
      this.isDraggingOver = false;
    },
    importFile(file) {
      console.log("the file>", file);
      const image = new Image();
      image.onload = () => {
        const canvas = document.getElementById("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        //Algorithm to get the average color of the image from https://github.com/zygisS22/color-palette-extraction
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const rgbArray = this.getRGB(imageData.data);
        const quantColors = this.quantization(rgbArray, 0);
        this.extractedColors = quantColors;
        this.$emit("extracted-colors", quantColors);
      };
      image.src = URL.createObjectURL(file);
    },
    getRGB(imageData) {
      const rgbValues = [];
      for (let i = 0; i < imageData.length; i += 4) {
        const rgb = {
          r: imageData[i],
          g: imageData[i + 1],
          b: imageData[i + 2],
        };
        rgbValues.push(rgb);
      }
      return rgbValues;
    },
    quantization(rgbValues, depth) {
      const MAX_DEPTH = 4;
      if (depth === MAX_DEPTH || rgbValues.length === 0) {
        const color = rgbValues.reduce(
          (prev, curr) => {
            prev.r += curr.r;
            prev.g += curr.g;
            prev.b += curr.b;

            return prev;
          },
          {
            r: 0,
            g: 0,
            b: 0,
          }
        );

        color.r = Math.round(color.r / rgbValues.length);
        color.g = Math.round(color.g / rgbValues.length);
        color.b = Math.round(color.b / rgbValues.length);

        return [color];
      }
      const componentToSortBy = this.findBiggestColorRange(rgbValues);
      rgbValues.sort((p1, p2) => {
        return p1[componentToSortBy] - p2[componentToSortBy];
      });

      const mid = rgbValues.length / 2;
      return [
        ...this.quantization(rgbValues.slice(0, mid), depth + 1),
        ...this.quantization(rgbValues.slice(mid + 1), depth + 1),
      ];
    },
    findBiggestColorRange(rgbValues) {
      let rMin = Number.MAX_VALUE;
      let gMin = Number.MAX_VALUE;
      let bMin = Number.MAX_VALUE;

      let rMax = Number.MIN_VALUE;
      let gMax = Number.MIN_VALUE;
      let bMax = Number.MIN_VALUE;

      rgbValues.forEach((pixel) => {
        rMin = Math.min(rMin, pixel.r);
        gMin = Math.min(gMin, pixel.g);
        bMin = Math.min(bMin, pixel.b);

        rMax = Math.max(rMax, pixel.r);
        gMax = Math.max(gMax, pixel.g);
        bMax = Math.max(bMax, pixel.b);
      });

      const rRange = rMax - rMin;
      const gRange = gMax - gMin;
      const bRange = bMax - bMin;

      const biggestRange = Math.max(rRange, gRange, bRange);
      if (biggestRange === rRange) {
        return "r";
      } else if (biggestRange === gRange) {
        return "g";
      } else {
        return "b";
      }
    },
  },
};
</script>

<style scoped>
.colorSampling {
  width: 100%;
  background: #b4b4b4;
  height: 250px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropZone {
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  display: flex;
  overflow: hidden;
}
i {
  font-size: 50px;
  color: #ffffff;
}
</style>
