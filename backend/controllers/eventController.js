const db = require('../utils/db');

exports.addEvent = async (req, res, next) => {
    
    const { description,
        endDate,
        frequency,
        howManyTimes,
        repeatable,
        startDate,
        title,
        userEmail} = req.body;

    const ref = await db.collection("events").add({
        description: description,
          endDate: endDate,
          frequency: frequency,
          howManyTimes: howManyTimes,
          repeatable: repeatable,
          startDate: startDate,
          title: title,
          userEmail: userEmail
    });

    res.status(200).json({
        status: "success",
        data: {
            message: `event ${title} was created`
        }
    });
};

exports.getEvent = (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: {
            message: `event was found`
        }
    });
};

exports.getEvents = async(req, res, next) => {
    const snapshot = await db.collection('events').get();
    const events = snapshot.docs.map(doc =>{ return {
        id:  doc.id,
        ...(doc.data())
    };}).filter(ev => ev.userEmail === req.user.email);

    res.status(200).json({
        status: "success",
        data: {
            events
        }
    });
};

exports.updateEvent = async(req, res, next) => {

    const {event} = req.body;
    const {id} = req.params;
    await db.collection("events").doc(id).update(event);

    res.status(200).json({
        status: "success",
        data: {
            message: `${id} was updated`
        }
    });
};

exports.deleteEvent = async(req, res, next) => {

    const {id} = req.params;
    await db.collection("events").doc(id).delete();
    res.status(200).json({
        status: "success",
        data: null
    });
};
