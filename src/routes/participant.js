const router = require('express').Router()
const {
    addParticipant,
    updateParticipant,
    deleteParticipant,
    viewAllParticipants,
    viewParticipantsBySubject,
    viewParticipantsByUser
} = require("../controller/participants.controller")

router.post("/add", addParticipant);

router.put("/update/:id", updateParticipant)

router.delete("/delete/:id", deleteParticipant)

router.get("/list/all", viewAllParticipants);
router.get("/list/subject/:id", viewParticipantsBySubject);
router.get("/list/user/:id", viewParticipantsByUser)

module.exports = router