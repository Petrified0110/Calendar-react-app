import React from 'react';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import {getLanguagePref, getToken} from '../authentification/auth';
import {viewdImage, deleteText, modifyEvent} from '../siteTexts'
import '../event/createEvent.css';
import 'react-datepicker/src/stylesheets/datepicker.scss';
import '../event/viewEvent.css'

const language = getLanguagePref();

export default function ViewEvent(){
  let params = null;
  if(typeof window !== 'undefined') {
        const search = window.location.search.split('?')[1];
        params = new URLSearchParams(search);
    }

  let event = params.get("event");
  event = JSON.parse(event);

  const history = useHistory();
    
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
 
    const onModify = e => {
        e.preventDefault();
        history.push(`/modifyevent?event=${JSON.stringify(event)}&id=${event.id}`);
    }

    event.start = new Date(event.start);
    event.end = new Date(event.end);

    function dayEnd(day){
        if(day === "1")
            return (<sup>st</sup>);
        else if(day === "2")
            return (<sup>nd</sup>);
        else if(day === "3")
            return (<sup>rd</sup>);
        else 
            return (<sup>th</sup>);
    }

    function printDate(date){
        return (
            <i>The {date.getDate().toString()}{dayEnd(date.getDate().toString())} of {date.toLocaleString('default', {month: 'long'}).toString()} {date.getFullYear().toString()}</i>
        );
    };

    function printTime(time){
        return (
        <i>{time.getHours().toString()}:{time.getMinutes().toString()}</i>
        );
    }

    function printRep(event){
        console.log(event)
        if(event.repeatable === false)
            return (
                <p>The event isn't set to repeat</p>
            );
        else  
            return(
                <p>The event is set to repeat once a {event.frequency.toString()}, {event.howManyTimes.toString()} times</p>
            );
    }

  return (
    <div>
        <div className="element">
            <h2>{event.title}</h2>
            <b>{event.description}</b> <br/><br/>
            <p dangerouslySetInnerHTML={{__html:event.bigDescription}}/>
            <p>
                {console.log(event.start)}
                From <br/>{printDate(event.start)}&nbsp;&nbsp;<i>at</i> {printTime(event.start)}<br/>
                Until <br/>{printDate(event.end)}&nbsp;&nbsp;<i>at</i> {printTime(event.start)}<br/>
            </p>
            <p>{printRep(event)}<br/></p>
            <button className="button" type="modify" className="btn btn-primary" onClick={(e) => onModify(e)}>
                {modifyEvent[language.key]}
            </button>
            <button className="button" type="delete" style={{"margin-left": "48px"}} className="btn btn-primary" onClick={(e) => onDelete(e)}>
                {deleteText[language.key]}
            </button>
        </div>
        <div className="image">
            <label name="imageLabel" for="label">{viewdImage[language.key]}</label><br/>
            <img src={require("./submit.jpeg")} width="300"/>
        </div>
    </div>
  );
}
