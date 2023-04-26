<template>
  <g-gantt-chart :chart-start="chartStart" :chart-end="chartEnd" precision="month" :row-height="50" grid width="100%"
    bar-start="beginDate" bar-end="endDate" :date-format="format" :lines="lines_datetime"
    @click-bar="onClickBar($event.bar, $event.e, $event.datetime)"
    @mousedown-bar="onMousedownBar($event.bar, $event.e, $event.datetime)"
    @dblclick-bar="onMouseupBar($event.bar, $event.e, $event.datetime)"
    @mouseenter-bar="onMouseenterBar($event.bar, $event.e)" @mouseleave-bar="onMouseleaveBar($event.bar, $event.e)"
    @dragstart-bar="onDragstartBar($event.bar, $event.e)" @drag-bar="onDragBar($event.bar, $event.e)"
    @dragend-bar="onDragendBar($event.bar, $event.e, $event.movedBars)"
    @contextmenu-bar="onContextmenuBar($event.bar, $event.e, $event.datetime)"
    @drag-timeline="mouseMoveTimeLine($event.e, $event.timeline)">
    <g-gantt-row label="My row 1" :bars="bars1" highlight-on-hover />
    <g-gantt-row label="My row 2" highlight-on-hover :bars="bars2" />
  </g-gantt-chart>

  <button type="button" @click="addBar()">Add bar</button>
  <button type="button" @click="deleteBar()">Delete bar</button>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { GanttBarObject } from "./types.js"
import type { GanttLineObject } from "./types.js"

const chartStart = ref("21.03.2021 12:00")
const chartEnd = ref("15.07.2021 12:00")
const format = ref("DD.MM.YYYY HH:mm")

const bars1 = ref<GanttBarObject[]>([
  {
    beginDate: "24.04.2021 13:00",
    endDate: "25.05.2021 19:00",
    ganttBarConfig: {
      id: "8621987329",
      label: "I'm in a bundle",
      bundle: "bundle2"
    }
  }
])

const bars2 = ref([
  {
    beginDate: "24.04.2021 13:00",
    endDate: "25.05.2021 19:00",
    ganttBarConfig: {
      id: "1592311887",
      label: "I'm in a bundle",
      bundle: "bundle2",
      style: {
        background: "magenta"
      }
    }
  },
  {
    beginDate: "01.01.2021 00:00",
    endDate: "01.03.2021 00:00",
    ganttBarConfig: {
      id: "7716981641",
      label: "Lorem ipsum dolor",
      hasHandles: true,
      style: {
        background: "#b74b52"
      }
    }
  },
  {
    beginDate: "15.06.2021 00:00",
    endDate: "10.07.2021 00:00",
    ganttBarConfig: {
      id: "9716981641",
      label: "Oh hey",
      style: {
        background: "#69e064",
        borderRadius: "15px",
        color: "blue",
        fontSize: "10px"
      }
    }
  }
])
const addBar = () => {
  if (bars1.value.some((bar) => bar.ganttBarConfig.id === "test1")) {
    return
  }
  const bar = {
    beginDate: "26.02.2021 00:00",
    endDate: "26.03.2021 02:00",
    ganttBarConfig: {
      id: "test1",
      hasHandles: true,
      label: "Hello!",
      style: {
        background: "#5484b7",
        borderRadius: "20px"
      }
    }
  }
  bars1.value.push(bar)
}

const deleteBar = () => {
  const idx = bars1.value.findIndex((b) => b.ganttBarConfig.id === "test1")
  if (idx !== -1) {
    bars1.value.splice(idx, 1)
  }
}

const onClickBar = (bar: GanttBarObject, e: MouseEvent, datetime?: string) => {
  console.log("click-bar", bar, e, datetime)
}

const onMousedownBar = (bar: GanttBarObject, e: MouseEvent, datetime?: string) => {
  console.log("mousedown-bar", bar, e, datetime)
}

const onMouseupBar = (bar: GanttBarObject, e: MouseEvent, datetime?: string) => {
  console.log("mouseup-bar", bar, e, datetime)
}

const onMouseenterBar = (bar: GanttBarObject, e: MouseEvent) => {
  console.log("mouseenter-bar", bar, e)
}

const onMouseleaveBar = (bar: GanttBarObject, e: MouseEvent) => {
  console.log("mouseleave-bar", bar, e)
}

const onDragstartBar = (bar: GanttBarObject, e: MouseEvent) => {
  console.log("dragstart-bar", bar, e)
}

const onDragBar = (bar: GanttBarObject, e: MouseEvent) => {
  console.log("drag-bar", bar, e)
}

const onDragendBar = (
  bar: GanttBarObject,
  e: MouseEvent,
  movedBars?: Map<GanttBarObject, { oldStart: string; oldEnd: string }>
) => {
  console.log("dragend-bar", bar, e, movedBars)
}

const onContextmenuBar = (bar: GanttBarObject, e: MouseEvent, datetime?: string) => {
  console.log("contextmenu-bar", bar, e, datetime)
}
const lines_datetime = ref<GanttLineObject[]>([
  {
    datetime: "2021.05.24 23:00",
    color: "red",
    width: '3px',
    opacity: '0.9',
  },
  {
    datetime: "2021.06.24 23:00",
    color: "yellow",
    width: '2px',
    opacity: '0.9',
  }
])
const mouseMoveTimeLine = (e: MouseEvent, timeline?: string) => {
  console.log("mouseMoveTimeLine", e, timeline)
  let diffTime = "0";

  if (timeline !== undefined)
    diffTime = timeline

  if (isNaN(parseInt(diffTime, 10)))
    return;

  let startDate = convertStringToDate(chartStart.value),
    endDate = convertStringToDate(chartEnd.value);
  console.log('difftime', parseInt(diffTime, 10), timeline, diffTime);

  startDate = new Date(startDate.getTime() - parseInt(diffTime)*60000);
  endDate = new Date(endDate.getTime() - parseInt(diffTime)*60000);

  chartStart.value = convertDate2FormatString(startDate);
  chartEnd.value = convertDate2FormatString(endDate);

}
const convertStringToDate = (timestring: string) => {
  console.log("input time string", timestring);
  let result = timestring.split(/[\/. ]/);
  let formatTime = result[2] + '-' + result[1] + '-' + result[0] + 'T' + result[3];
  return new Date(formatTime)
}
const convertDate2FormatString = (datetime: Date) => {
  console.log("input date", datetime, datetime.toISOString());//.slice(0,10)
  let formatDate = "21.03.2021 12:00";
  let result = datetime.toISOString().split(/[-T:]/);
  formatDate = result[2] + '.' + result[1] + '.' + result[0] + ' ' + result[3] + ':' + result[4];
  console.log("output date", formatDate);
  return formatDate
}
</script>
