<template>
    <div class="line" :style="{ left: 30 }"></div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 25%;
  height: 100%;
  z-index: 999;
  /* Use the prop value to set the line's left position */
  /* You can also add any other styles as needed */
  /*:style="{ left: left, width: '3px', backgroundColor: 'black' }" */
  width: 3px;
  background-color: black;
}
</style>