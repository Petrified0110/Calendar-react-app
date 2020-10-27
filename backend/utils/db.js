    const admin = require('firebase'); 
    const {Storage} = require('@google-cloud/storage');

    var firebaseConfig = {
        apiKey: "AIzaSyBtMp8Ovzylr_umBQnWNT3GFju-dhbln4E",
        authDomain: "calendar-cd096.firebaseapp.com",
        databaseURL: "https://calendar-cd096.firebaseio.com",
        projectId: "calendar-cd096",
        storageBucket: "calendar-cd096.appspot.com",
        appId: "1:134517900389:web:18f7892ccf5f7e2b20728c"
    };

    const app = admin.initializeApp(firebaseConfig);
    //the simple database
    const db = admin.firestore();

    //the file storage
    var storage = new Storage({projectId:'calendar-cd096',keyFilename:'./calendar-cd096-ab700eda833d.json'});
    storage = storage.bucket('gs://calendar-cd096.appspot.com');


    const dumped = {};

    const schema = {
      users: {},
      events: {},
    };
    
      const dump = (dbRef, aux, curr) => {
      return Promise.all(Object.keys(aux).map((collection) => {
        return dbRef.collection(collection).get()
          .then((data) => {
            let promises = [];
            data.forEach((doc) => {
              const data = doc.data();
              if(!curr[collection]) {
                curr[collection] =  { 
                  data: { },
                  type: 'collection',
                };
                curr[collection].data[doc.id] = {
                  data,
                  type: 'document',
                }
              } else {
                curr[collection].data[doc.id] = data;
              }
              promises.push(dump(dbRef.collection(collection).doc(doc.id), aux[collection], curr[collection].data[doc.id]));
          })
          return Promise.all(promises);
        });
      })).then(() => {
        return curr;
      })
    };
    let aux = { ...schema };
    let answer = {};
    dump(db, aux, answer).then((answer) => {
        console.log(JSON.stringify(answer, null, 4));
    });

    exports.dump = dump;
    exports.db = db;
    exports.storage = storage;
