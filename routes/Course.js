const express = require("express");
const router = express.Router();
const util = require("util");
const { PrismaClient } = require("@prisma/client")
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

client.set = util.promisify(client.set);
client.get = util.promisify(client.get);

const { course } = new PrismaClient();
const { getAllCourses, getCourseById } = require("../services/courseService");
const { json } = require("express");

router.get("/", async (req, res) => {
    res.send(await getAllCourses());
});

router.post("/cache", async (req, res) => {
    const { key, value } = req.body;
    const cached = await client.get(key);
    if (cached) {
        res.send(cached);
        return;
    }
    const response = await client.set(key, value);
    res.send(response);

})
router.get("/:id", async (req, res) => {
    try {
        const key = `course_${req.params.id}`;
        const cachedCoure = await client.get(key);

        if (cachedCoure) {
            console.log("tonmoy");
            res.send(JSON.parse(cachedCoure));
            return;
        }
        const filterCourse = await getCourseById(parseInt(req.params.id));
        if (!filterCourse) {
            res.status(404).send(`Course not found with id ${req.params.id}`);
            return;
        }

        await client.set(key, JSON.stringify(filterCourse));
        res.send(filterCourse);
    } catch (err) {
        console.log(err);
    }
});

router.post("/create", async (req, res) => {
    const { name, teacher_id } = req.body;

    const newCourse = await course.create({
        data: {
            name: name,
            teacher_id: teacher_id,
        }
    });
    res.status(201).send({
        msg: 'Course created successfully',
        newCourse
    });

});

router.put("/:id", async (req, res) => {
    const updatedCourse = await course.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: {
            name: req.body.name,
        }
    });

    res.status(201).send({
        msg: 'course updated successfully',
        course: updatedCourse
    });
});

router.delete("/:id", async (req, res) => {
    const filteredCourse = await course.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    });

    if (!course) {
        res.status(404).send(`Course not found with id ${req.params.id}`);
        return;
    }
    await course.delete({
        where: { id: parseInt(req.params.id) }
    });

    res.status(200).send({
        msg: 'Successfully deleted',
        course: filteredCourse
    });
});

module.exports = router;
