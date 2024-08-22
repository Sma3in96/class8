<template>
  <div class='calendar' >
    <div class='demo-app-main'>
      <FullCalendar
        class='demo-app-calendar'
        :options='calendarOptions'
        
      >
        <template #eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
    <promptAdd
      :isVisible='isPromptVisible'
      @close='isPromptVisible = false'
      @add='handleAddEvent'
    />
    <editPrompt
      :isVisible='isEventActionsVisible'
      :eventTitle='selectedEvent?.title'
      :eventStart='selectedEvent?.description'
      :event='selectedEvent'
      @close='isEventActionsVisible = false'
      @edit='handleEditEvent'
      @remove='handleRemoveEvent'
    />
    
  </div>
  <totu v-if="showTuto" class="tuto" />
  <Mybutton :text="showText" @click="showTutoFunction" />
</template>

<script setup>
import { ref, reactive } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import promptAdd from '../../components/prompt.vue'
import editPrompt from '../../components/editPrompt.vue'

import totu from '../../components/totu.vue'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

const INITIAL_EVENTS = [
]

function createEventId() {
  return String(eventGuid++)
}


const calendarOptions = reactive({
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin
  ],
  headerToolbar: {
  },
  initialView: 'dayGridMonth',
  initialEvents: INITIAL_EVENTS,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  select: handleDateSelect,
  eventClick: handleEventClick
  // eventsSet: handleEvents
})

const currentEvents = ref([])
const isPromptVisible = ref(false);
const isEventActionsVisible = ref(false);
let selectInfo;
let selectEvent;
const selectedEvent = ref(null);


function handleDateSelect(Info) {
  selectInfo = Info;
  isPromptVisible.value = true;
}

function handleEventClick(clickInfo) {
  selectedEvent.value = clickInfo.event;
  isEventActionsVisible.value = true;
}

function handleAddEvent(infos) {
  if (infos) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    calendarApi.addEvent({
      id: createEventId(),
      title: infos.title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
      backgroundColor: infos.color,
      description: infos.description
    });
  }
}

function handleEditEvent(event) {
  const newTitle = prompt('Enter new title for the event:', event.title);
  const newDescription = prompt('Enter new description for the event:', event.extendedProps.description);

  if (newTitle !== null) {
    event.setProp('title', newTitle);
  }

  if (newDescription !== null) {
    event.setExtendedProp('description', newDescription);
  }
}


function handleRemoveEvent(event) {
  if (confirm(`Are you sure you want to delete the event '${event.title}'`)) {
    event.remove();
  }
}

const showTuto = ref(false);
const showText = ref("Click to see how to add a new event")

function showTutoFunction() {
  showTuto.value = !showTuto.value;
  setTimeout(() => {
    showTuto.value = false;
    showText.value = "Click to see how to add a new event"
  }, 30000);
  if (showTuto.value == true) {
  showText.value = "close the tutorial"
  } else {
    showText.value = "Click to see how to add a new event"
  }

}



</script>

<style scoped>
.calendar {
  /* display: flex; */
  height: 100vh;
  z-index: 1;
}


.events-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.events-list li {
  border-bottom: 1px solid #ddd;
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-app-main {
  flex: 1;
  padding: 20px;
  height: 95%;
}

.demo-app-calendar {
  height: 90%;
  max-width: 100%;
  margin: 0 auto;
}

.demo-app-calendar .fc-event {
  font-size: 14px;
}

.demo-app-calendar .fc-daygrid-day-number {
  font-size: 12px;
}



</style>
