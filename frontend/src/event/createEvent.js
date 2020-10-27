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
import {bigDescription, imageText, eventTitle, description, startDate, endDate, repeatableText, frequencyText, everyDay, everyMonth, everyWeek, howManyText, submitText, createEvent, enterTitle} from '../siteTexts'
import '../event/createEvent.css';
import 'react-datepicker/src/stylesheets/datepicker.scss';

const language = getLanguagePref();

export default function CreateEvent(){
  const [start, setStartDate] = useState(new Date());
  const [end, setEndDate] = useState(new Date(start.getFullYear(), start.getMonth(), start.getDate(), start.getHours() + 1, start.getMinutes()));
  const [repeatable, setRepeatable] = useState(false);
  const [imageName, setImageName] = useState("");

  function validateForm() {
    return (start - end < 0);
  }

  const history = useHistory();
    const { register, handleSubmit } = useForm();
    const onSubmit = async(data) => {
      //this.setState({selectedFile: data.image[0]});
      if(validateForm()){
        const res = await axios({
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
            userEmail: getUserEmail(),
            bigDescription: data.bigDesc,
            imageName: data.image[0] !== undefined ? data.image[0].name : imageName,
            }
      });

      const imageData = new FormData();

      imageData.append('file', data.image[0]);

      if(imageName !== "" && validateForm())
        await axios({
          method: "POST",
          url: `http://localhost:8000/api/event/${res.data.data.event}/image`,
          headers: {
            'Authorization': 'Bearer ' + getToken(),
            'content-type': 'multipart/form-data'
          },
          data: imageData
        });

      history.push("/calendar");

    }
    else{console.log("Form not valid");}

    }
    //TODO: check if image file is an image!!! + backend

  return (
     <div className="card" style={{ width: "50%"}}>
       <div className="card-body">
         <h5 className="card-title">{createEvent[language.key]}</h5>
         <form onSubmit={handleSubmit(onSubmit)}>
           <div className="form-group">
             <label name="titleLable" for="title">{eventTitle[language.key]}</label><br/>
             <input
               type="string"
               className="form-control"
               name="title"
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
               word-break="break-word"
               aria-rowspan="10"
               placeholder={description[language.key]}
               ref={register({required: false})}
             />
           </div>
           <div className="form-group">
             <label name="image" for="image">{imageText[language.key]}</label><br/>
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
                defaultValue={false}
                rules={{ required: false }}
                onChange={repeatable => setRepeatable(new Boolean(repeatable))}
            />
            <div>
              <label name="freqLable" for="frequency">{frequencyText[language.key]}</label><br/>
              <select name="frequency" ref={register({required: false})}>
                <option value="day">{everyDay[language.key]}</option>
                <option value="week">{everyWeek[language.key]}</option>
                <option value="month">{everyMonth[language.key]}</option>
              </select>
            </div><br/>
            <div>
              <label name="howManyLable" for="howmanytimes">{howManyText[language.key]}</label><br/>
              <input name="howmanytimes" type="number" defaultValue="1" ref={register({ min: 1, max: 99 })} />
            </div>
            <div className="submit-button">
           <button type="submit" className="btn btn-primary" >
             {submitText[language.key]}
           </button>
           </div>
         </form>
       </div>
     </div>
  );
}