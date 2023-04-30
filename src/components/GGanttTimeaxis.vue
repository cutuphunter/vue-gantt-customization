<template>
  <div class="g-timeaxis">
    <div class="g-timeunits-container">
      <div v-for="({ label, value, date, width }, index) in timeaxisUnits.upperUnits" :key="label"
        class="g-upper-timeunit" :style="{
            background: index % 2 === 0 ? colors.primary : colors.secondary,
            color: colors.text,
            width
          }">
        <slot name="upper-timeunit" :label="label" :value="value" :date="date">
          {{ label }}
        </slot>
      </div>
    </div>

    <div class="g-timeunits-container" @mousedown="onMouseEvent" @click="onMouseEvent" @dblclick="onMouseEvent"
      @mouseenter="onMouseEvent" @mouseleave="onMouseEvent" @contextmenu="onMouseEvent">
      <div v-for="({ label, value, date, width }, index) in timeaxisUnits.lowerUnits" :key="index" class="g-timeunit"
        :style="{
            background: index % 2 === 0 ? colors.ternary : colors.quartenary,
            color: colors.text,
            flexDirection: precision === 'hour' ? 'column' : 'row',
            alignItems: precision === 'hour' ? '' : 'center',
            width
          }">
        <slot name="timeunit" :label="label" :value="value" :date="date">
          {{ label }}
        </slot>
        <div v-if="precision === 'hour'" class="g-timeaxis-hour-pin" :style="{ background: colors.text }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import provideConfig from "../provider/provideConfig.js"
import useTimeaxisUnits from "../composables/useTimeaxisUnits.js"
import { computed, ref, toRefs, watch, onMounted, inject } from "vue"
import provideEmitTimelineEvent from "../provider/provideEmitTimelineEvent.js"
import useTimePositionMapping from "../composables/useTimePositionMapping.js"

const { precision, colors } = provideConfig()
const { timeaxisUnits } = useTimeaxisUnits()

const { mapTimeToPosition, mapPositionToTime, mapPositionToTimeDiff } = useTimePositionMapping()

const emitTimelineEvent = provideEmitTimelineEvent()

const isDragging = ref(false)
const pxPrevious = ref(0)

function firstMousemoveCallback(e: MouseEvent) {
  isDragging.value = true
  const timeline = mapPositionToTimeDiff(e.clientX - pxPrevious.value)
  emitTimelineEvent(e, timeline)
  // console.log('px diff', e.clientX - pxPrevious.value)
}

const onMouseEvent = (e: MouseEvent) => {
  e.preventDefault()
  if (e.type === "mousedown") {
    pxPrevious.value = e.clientX;
    prepareForDrag()
  }
  // const datetime = mapPositionToTime(e.clientX - pxPrevious.value)
  // // console.log('timeline mouse event', e, datetime)
  // emitTimelineEvent(e, datetime)
}
const prepareForDrag = () => {
  isDragging.value = true
  window.addEventListener("mousemove", firstMousemoveCallback, {
    once: false
  }) // on first mousemove event
  window.addEventListener(
    "mouseup",
    () => {
      // in case user does not move the mouse after mousedown at all
      window.removeEventListener("mousemove", firstMousemoveCallback)
      isDragging.value = false
    },
    { once: true }
  )
}
</script>

<style>
.g-timeaxis {
  position: sticky;
  top: 0;
  width: 100%;
  height: 8vh;
  min-height: 75px;
  background: white;
  z-index: 4;
  box-shadow: 0px 1px 3px 2px rgba(50, 50, 50, 0.5);
  display: flex;
  flex-direction: column;
}

.g-timeunits-container {
  display: flex;
  width: 100%;
  height: 50%;
}

.g-timeunit {
  height: 100%;
  font-size: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.g-upper-timeunit {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.g-timeaxis-hour-pin {
  width: 1px;
  height: 10px;
}
</style>
