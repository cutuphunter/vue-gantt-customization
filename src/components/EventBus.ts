import { useEventBus } from '@vueuse/core'

const EventBus = useEventBus('news');

export const GanttEventBus = useEventBus('news');

export default EventBus;

