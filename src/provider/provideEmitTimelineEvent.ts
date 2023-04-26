import { inject } from "vue"
import { EMIT_TIMELINE_EVENT_KEY } from "./symbols.js"

export default function provideEmitTimelineEvent() {
  const emitTimelineEvent = inject(EMIT_TIMELINE_EVENT_KEY)
  if (!emitTimelineEvent) {
    throw Error("Failed to inject emitTimelineEvent!")
  }
  return emitTimelineEvent
}
