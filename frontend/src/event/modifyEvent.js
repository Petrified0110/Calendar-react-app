import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import DatePicker from 'react-datepicker'
import {Checkbox } from '@material-ui/core';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import {getUserEmail} from '../authentification/auth';
import axios from "axios";
import {getLanguagePref, getToken} from '../authentification/auth';
import {modifyImageText, imageText, bigDescription, deleteText, modifyEvent, eventTitle, description, startDate, endDate, repeatableText, frequencyText, everyDay, everyMonth, everyWeek, howManyText, submitText, enterTitle} from '../siteTexts'
import '../event/createEvent.css';
import 'react-datepicker/src/stylesheets/datepicker.scss';

const language = getLanguagePref();

export default function ModifyEvent(){
  let params = null;
  if(typeof window !== 'undefined') {
        const search = window.location.search.split('?')[1];
        params = new URLSearchParams(search);
    }

  let event = params.get("event");
  event = JSON.parse(event);

  console.log(event);

  const [start, setStartDate] = useState(new Date(event.start));
  const [end, setEndDate] = useState(new Date(event.end));
  const [repeatable, setRepeatable] = useState(new Boolean(event.repeatable));
  const [imageName, setImageName] = useState(event.imageName);
  const prevImage = event.imageName;

  function validateForm() {
    return (start - end < 0);
  }
  const history = useHistory();
    const { register, handleSubmit} = useForm();
    
    const onDelete = e =>{
      e.preventDefault();

      axios({
        method: "DELETE",
        url: `http://localhost:8000/api/event/${event.id}`,
        headers: {
          'Authorization': 'Bearer ' + getToken()
        }
      });
      history.push("/calendar");
    }
 
    const onSubmit = async(data) => {

      if(validateForm()){
        await axios({
          method: "PATCH",
          url: `http://localhost:8000/api/event/${event.id}`,
          headers: {
            'Authorization': 'Bearer ' + getToken()
          },
          data: { event : {
            description: data.desc,
            endDate: end,
            frequency: data.frequency,
            howManyTimes: data.howmanytimes,
            repeatable: repeatable,
            startDate: start,
            title: data.title,
            userEmail: getUserEmail(),
            bigDescription: data.bigDesc,
            image: data.image[0] !== undefined ? data.image[0].name : prevImage,
            }}
      });

      if(imageName !== "" && imageName !== prevImage && validateForm()) {
        await axios({
          method: "DELETE",
          url: `http://localhost:8000/api/event/${event.id}/image`,
          headers: {
            'Authorization': 'Bearer ' + getToken()
          },
        })

        const imageData = new FormData();
        imageData.append('file', data.image[0]);

        await axios({
          method: "POST",
          url: `http://localhost:8000/api/event/${event.id}/image`,
          headers: {
            'Authorization': 'Bearer ' + getToken(),
            'content-type': 'multipart/form-data'
          },
          data: imageData
        });}


      history.push("/calendar");
    }
    }

  return (
     <div className="card" style={{ width: "50%" }}>
       <div className="card-body">
         <h5 className="card-title">{modifyEvent[language.key]}</h5>
         <form onSubmit={handleSubmit(onSubmit)}>
           <div className="form-group">
             <label name="titleLable" for="title">{eventTitle[language.key]}</label><br/>
             <input
               type="string"
               className="form-control"
               name="title"
               defaultValue={event.title}
               placeholder={enterTitle[language.key]}
               ref={register({required: true})}
             />
           </div>
           <div className="form-group">
             <label name="descLable" for="desc">{description[language.key]}</label><br/>
             <input
               type="string"
               className="form-control"
               name="desc"
               defaultValue={event.description}
               placeholder={description[language.key]}
               ref={register({required: false})}
             />
           </div>
           <div className="form-group">
             <label name="bigDescLable" for="bigDesc">{bigDescription[language.key]}</label><br/>
             <input
               type="string"
               className="form-control"
               name="bigDesc"
               defaultValue={event.bigDescription}
               placeholder={description[language.key]}
               ref={register({required: false})}
             />
           </div>
           <div className="form-group">
             <label name="image" for="image">{modifyImageText[language.key]}</label><br/>
             <input
               type="file"
               accept="image/*"
               className="form-control"
               name="image"
               onChange={name => setImageName(name)}
               placeholder={imageText[language.key]}
               ref={register({required: false})}
             />
           </div>
           <div className="form-group">
             <label name="startLable" for="start">{startDate[language.key]}</label><br/>
             <DatePicker
                name="startDate"
                selected={start}
                onChange={start => setStartDate(start)}
                showTimeSelect
                timeFormat="HH:mm"
                injectTimes={[
                  setHours(setMinutes(new Date(), 5), 12),
                ]}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
           </div>
           <div className="form-group">
             <label name="endLable" for="end">{endDate[language.key]}</label><br/>
            <DatePicker
                name="endDate"
                selected={end}
                onChange={end => setEndDate(end)}
                showTimeSelect
                timeFormat="HH:mm"
                injectTimes={[
                  setHours(setMinutes(new Date(), 5), 12),
                ]}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>

            <label name="repeatLable" for="repeatable">{repeatableText[language.key]}</label>
            <Checkbox
                name="repeatable"
                defaultValue={event.repeatable}
                rules={{ required: false }}
                onChange={repeatable => setRepeatable(new Boolean(repeatable))}
            />
            <div>
              <label name="freqLable" for="frequency">{frequencyText[language.key]}</label><br/>
              <select name="frequency" defaultValue={event.frequency} ref={register({required: false})}>
                <option value="day">{everyDay[language.key]}</option>
                <option value="week">{everyWeek[language.key]}</option>
                <option value="month">{everyMonth[language.key]}</option>
              </select>
            </div>
            <div>
              <label name="howManyLable" for="howmanytimes">{howManyText[language.key]}</label><br/>
              <input name="howmanytimes" type="number" defaultValue={event.howManyTimes} ref={register({ min: 1, max: 99 })} />
            </div>
            <div className="submit-button">
           <button type="submit" className="btn btn-primary">
             {submitText[language.key]}
           </button>
           <button type="delete" style={{"margin-left": "48px"}} className="btn btn-primary" onClick={(e) => onDelete(e)}>
             {deleteText[language.key]}
           </button>
           </div>
         </form>
       </div>
     </div>
  );
}