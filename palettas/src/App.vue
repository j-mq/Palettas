<template>
  <div class="container">
    <div class="layoutContainer">
      <ColorSampling />
    </div>
  </div>
</template>

<script>
import ColorSampling from "./components/ColorSampling.vue";
export default {
  name: "App",
  components: { ColorSampling },
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
  width: 350px;
}
</style>
