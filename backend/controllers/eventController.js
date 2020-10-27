const {db, storage} = require('../utils/db');
const catchAsync = require('../utils/catchAsync');

exports.addEvent =catchAsync(async (req, res, next) => {
    const { description,
        endDate,
        frequency,
        howManyTimes,
        repeatable,
        startDate,
        title,
        userEmail,
        bigDescription} = req.body;
    
    const ref = await db.collection("events").add({
        description: description,
          endDate: endDate,
          frequency: frequency,
          howManyTimes: howManyTimes,
          repeatable: repeatable,
          startDate: startDate,
          title: title,
          userEmail: userEmail,
          bigDescription: bigDescription
    });

    res.status(200).json({
        status: "success",
        data: {
            message: `event ${title} was created`,
            event: ref.id
        }
    });
});

exports.addImageToEvent = catchAsync( async (req, res, next) => {
    const {id} = req.params;
    const image = req.files.file;

    await db.collection("events").doc(id).update({imageName: id + image.name });

    if(image.name !== ""){
        const file = await storage.file(id + image.name);
        await file.save(image.data);
        await file.download({destination: `../frontend/src/event/images/${id}${image.name}`});
        res.status(200).json({
            status: "success",
            data: {
                message: `yes`
            }
        });
    } 
});

exports.getEvent = catchAsync( async (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: {
            message: `event was found`
        }
    });
});

exports.getEvents = catchAsync(async(req, res, next) => {
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
});

exports.updateEvent = catchAsync(async(req, res, next) => {

    const {event} = req.body;
    const {id} = req.params;
    await db.collection("events").doc(id).update(event);

    res.status(200).json({
        status: "success",
        data: {
            id
        }
    });
});

async function deleteImage(imageName) {
    if(imageName !== "" && imageName !== undefined) {
        const img = await storage.file(imageName);
        let exists = await img.exists();
        exists = exists[0];
        if(exists)
            await img.delete();
    }
}

exports.deleteEvent = catchAsync(async(req, res, next) => {
    
    const {id} = req.params;
    const event = await (await db.collection("events").doc(id).get()).data();

    await db.collection("events").doc(id).delete();
    await deleteImage(event.imageName);

    res.status(200).json({
        status: "success",
        data: null
    });
});

exports.deleteSpecImage = catchAsync( async(req, res, next) => {
    const {id} = req.params;
    const event = await (await db.collection("events").doc(id).get()).data();
    await deleteImage(event.imageName);
    res.status(200).json({
        status: 'success',
        data: null
    });
}
)
