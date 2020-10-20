import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import DatePicker from 'react-datepicker'
import {Checkbox } from '@material-ui/core';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import {getUserEmail} from '../authentification/auth';
import axios from "axios";
import {getLanguagePref, getToken} from '../authentification/auth';
import {eventTitle, description, startDate, endDate, repeatableText, frequencyText, everyDay, everyMonth, everyWeek, howManyText, submitText, createEvent, enterTitle} from '../siteTexts'
import '../event/createEvent.css';
import 'react-datepicker/src/stylesheets/datepicker.scss';

const language = getLanguagePref();

export default function CreateEvent(){
  const [start, setStartDate] = useState(new Date());
  const [end, setEndDate] = useState(new Date());
  const [repeatable, setRepeatable] = useState(false);

  function validateForm() {
    return (start - end < 0);
  }

    const { register, handleSubmit } = useForm();
    const onSubmit = async(data) => {
      if(validateForm()){
        await axios({
          method: "POST",
          url: "http://localhost:8000/api/event",
          headers: {
            'Authorization': 'Bearer ' + getToken()
          },
          data: {
            description: data.desc,
            endDate: end,
            frequency: data.frequency,
            howManyTimes: data.howmanytimes,
            repeatable: repeatable,
            startDate: start,
            title: data.title,
            userEmail: getUserEmail()
            }
      });

    }
    }

  return (
     <div className="card" style={{ width: "18rem" }}>
       <div className="card-body">
         <h5 className="card-title">{createEvent[language.key]}</h5>
         <form onSubmit={handleSubmit(onSubmit)}>
           <div className="form-group">
             <label name="titleLable" for="title">{eventTitle[language.key]}</label>
             <input
               type="string"
               className="form-control"
               name="title"
               placeholder={enterTitle[language.key]}
               ref={register({required: true})}
             />
           </div>
           <div className="form-group">
             <label name="descLable" for="desc">{description[language.key]}</label>
             <input
               type="string"
               className="form-control"
               name="desc"
               placeholder={description[language.key]}
               ref={register({required: false})}
             />
           </div>
           <div className="form-group">
             <label name="startLable" for="start">{startDate[language.key]}</label>
             <DatePicker
                name="startDate"
                selected={start}
                onChange={start => setStartDate(start)}
                showTimeSelect
                timeFormat="HH:mm"
                injectTimes={[
                  setHours(setMinutes(new Date(), 1), 0),
                  setHours(setMinutes(new Date(), 5), 12),
                  setHours(setMinutes(new Date(), 59), 23)
                ]}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
           </div>
           <div className="form-group">
             <label name="endLable" for="end">{endDate[language.key]}</label>
            <DatePicker
                name="endDate"
                selected={end}
                onChange={end => setEndDate(end)}
                showTimeSelect
                timeFormat="HH:mm"
                injectTimes={[
                  setHours(setMinutes(new Date(), 1), 0),
                  setHours(setMinutes(new Date(), 5), 12),
                  setHours(setMinutes(new Date(), 59), 23)
                ]}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>

            <label name="repeatLable" for="repeatable">{repeatableText[language.key]}</label>
            <Checkbox
                name="repeatable"
                defaultValue={false}
                rules={{ required: false }}
                onChange={repeatable => setRepeatable(new Boolean(repeatable))}
            />
            <div>
              <label name="freqLable" for="frequency">{frequencyText[language.key]}</label>
              <select name="frequency" ref={register({required: false})}>
                <option value="day">{everyDay[language.key]}</option>
                <option value="week">{everyWeek[language.key]}</option>
                <option value="month">{everyMonth[language.key]}</option>
              </select>
            </div>
            <div>
              <label name="howManyLable" for="howmanytimes">{howManyText[language.key]}</label>
              <input name="howmanytimes" type="number" defaultValue="1" ref={register({ min: 1, max: 99 })} />
            </div>
           <button type="submit" className="btn btn-primary">
             {submitText[language.key]}
           </button>
         </form>
       </div>
     </div>
  );
}