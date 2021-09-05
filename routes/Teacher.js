const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");

const { teacher } = new PrismaClient();

router.get("/", async (req, res) => {
    const teachers = await teacher.findMany({
        include: {
            course: true
        }
    });
    res.send(teachers);
});

router.post("/new", async (req, res) => {
    const newTeacher = await teacher.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        }
    });
    res.status(201).send({
        msg: 'Teacher created successfully',
        newTeacher
    });
});

router.get("/")
module.exports = router;