<template>
  <div class="bottom">
  <Mybutton text="Save changes" class="saveButton" @click="saveEvents" />
  </div>
  <div class='calendar' >
    
    <div class='demo-app-main'>
      <FullCalendar
        ref='calendar'
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
  
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import promptAdd from '../../components/prompt.vue'
import editPrompt from '../../components/editPrompt.vue'

import totu from '../../components/totu.vue'
import { addData, queryFirestore, setData } from '../../Services/Requests/firestoreRequests'
import { useUserStore } from '../../stores/userStore'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
const events = ref([])
const calendar = ref(null)

function createEventId() {
  return String(eventGuid++)
}

const INITIAL_EVENTS = ref([])

// const INITIAL_EVENTS = [{
//   id: createEventId(),
//   title: 'All Day Event',
//   start: todayStr,
//   end: todayStr,
//   allDay: true,
// },
// {
//   id: createEventId(),
//   title: 'Long Event',
//   start: todayStr,
//   end: new Date(todayStr).getTime() + 60 * 60 * 24 * 1000 * 5,
// }
// ]


const calendarOptions = reactive({
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin
  ],
  headerToolbar: {
  },
  initialView: 'dayGridMonth',
  events: INITIAL_EVENTS.value,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
})


const isPromptVisible = ref(false);
const isEventActionsVisible = ref(false);
let selectInfo;
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
    const newEvent = {
      id: createEventId(),
      title: infos.title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
      backgroundColor: infos.color,
      description: infos.description
    }
    events.value.push(newEvent);
    calendarApi.addEvent(newEvent);
  }

  
}

function handleEditEvent(event) {
  const newTitle = prompt('Enter new title for the event:', event.title);
  const newDescription = prompt('Enter new description for the event:', event.extendedProps.description);
  if (newTitle !== null) {
    event.setProp('title', newTitle);
    events.value[event.id].title = newTitle;
  }

  if (newDescription !== null) {
    event.setExtendedProp('description', newDescription);
    events.value[event.id].description = newDescription;
  }
}


function handleRemoveEvent(event) {
  if (confirm(`Are you sure you want to delete the event '${event.title}'`)) {
    event.remove();
    events.value = events.value.filter(iEvent => iEvent.id!== event.id);
  }
}



const userStore = useUserStore();

const fetchEvents = async () => {
  try {
    const res = await queryFirestore("Events", { where: [["userID", "==", userStore.$state.userID ]]})
    events.value = res.at(0).events;
    
    const calendarApi = calendar.value.getApi();

    events.value.forEach(item => {
      calendarApi.addEvent({
        id: createEventId(),
        title: item.title,
        start: item.start,
        end: item.end,
        backgroundColor: item.backgroundColor,
        allDay: item.allDay,
        extendedProps: {
          description: item.description,
        }
      })
    })

    
  } catch(error) {
    console.error(error);
  }
}

onMounted( async () => {
  fetchEvents();
})

const saveEvents = async () => {
  try {
    const res = await setData("Events", userStore.$state.userID ,{
      userID: userStore.$state.userID,
      events: events.value.map(event => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay,
        backgroundColor: event.backgroundColor,
        description: event.description
      }))
    }, false);
    console.log("Data saved successfully", res);
  } catch(error) {
    console.error(error);
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

.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #f5f5f5;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.saveButton {
  align-items: center;
  margin-bottom: 10px;
}


</style>
