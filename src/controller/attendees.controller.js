const {
    db,
    Timestamp,
} = require('../database');
const {
    Attendees,
    attendeesConverter
} = require("../models/attendees.model")

const attendeesCollection = db.collection(`/attendees/`).withConverter(attendeesConverter)

const addAttendee = async (req, res) => {
    try {
        const { eventId, userId, isHost } = req.body;

        let attendee = new Attendees(
            eventId,
            userId,
            isHost
        )

        console.log(attendee);

        await attendeesCollection.add(attendee)
            .then((result) => {
                res.status(200).json({message: "Attendee added successfully"})
            })
            .catch((err) => {
                throw {message: err.message}
            })

        //const attendeeDoc = await addDoc(attendeesCollection, attendee)
    } catch (e) {
        res.status(400).json({name: "Attendees", type: "Add", error: e.message})
    }
}

const updateAttendee = async (req, res) => {
    const id = req.params.id;

    console.log(id);

    try{
        const { eventId, userId, isHost } = req.body;

        const attendeeSnapshot = db.doc(`/attendees/${id}`).withConverter(attendeesConverter);

        const attendeeVal = new Attendees(
            eventId,
            userId,
            isHost
        );

        await attendeeSnapshot.update(attendeesConverter.toFirestore(attendeeVal))
            .then((result) => {
                res.status(200).json({message: "Attendee updated successfully"})
            })
            .catch((err) => {
                throw {message: err.message}
            })
        //updateDoc(attendeeSnapshot, Object.assign({}, attendeeVal))
    }
    catch(e) {
        res.status(400).json({name: "Attendees", type: "Update", error: e.message})
    }
}

const deleteAttendee = async (req, res) => {
    const id = req.params.id;

    try{
        const attendeeDoc = db.doc(`/attendees/${id}`).withConverter(attendeesConverter); //Can be three parameters. See docs
        await attendeeDoc.delete()
            .then((result) => {
                res.status(200).json({message: "Attendee delete successfully"})
            })
            .catch((err) => {
                throw {message: err.message}
            })
        
    }
    catch(e) {
        res.status(400).json({name: "Attendees", type: "Delete", error: e.message})
    }
}


const viewAllAttendees = async (req, res) => {
    const attendees = []

    try {
        const getAttendeeDocs = await attendeesCollection.get()

        if (getAttendeeDocs.empty)
            throw {message: "Attendee collections is empty"};

        getAttendeeDocs.forEach((attendee) => {
            const {
                eventId,
                userId,
                isHost
            } = attendee.data();

            attendees.push({
                id: attendee.id,
                eventId: eventId,
                userId: userId,
                isHost: isHost
            })
        })

        res.status(200).json(attendees)
    }
    catch(e) {
        res.status(400).json({name: "Attendees", type: "Retrieve All", error: e.message})
        console.log(e)
    }
}

const viewAttendee = async (req, res) => {
    const id = req.params.id

    try {
        const attendeeRef = db.doc(`/attendees/${id}`).withConverter(attendeesConverter)
        const attendeeDoc = await attendeeRef.get()

        res.status(200).json(attendeeDoc.data())
    }
    catch (e) {
        res.status(400).json({name: "Attendees", type: "Retrieve All", error: e.message})
        console.log(e);
    }
}

module.exports = {
    addAttendee,
    updateAttendee,
    deleteAttendee,
    viewAllAttendees,
    viewAttendee
}