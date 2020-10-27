import axios from 'axios';
import {getToken} from '../authentification/auth';


export const getUserEvents = async() => {
  const res = await axios.get("http://localhost:8000/api/event", {
    headers: {'Authorization': `Bearer ${getToken()}`}
  });

  const events = await res.data.data.events.map((event, index) => {
    return {
    allDay: false,
    title: event.title,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    description: event.description !== "" ? event.description : undefined,
    id: event.id,
    frequency: event.frequency,
    howManyTimes: event.howManyTimes,
    repeatable: event.repeatable,
    bigDescription: event.bigDescription,
    imageName: event.imageName
  };});
  console.log(events);
  return events;
}