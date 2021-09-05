const { PrismaClient } = require("@prisma/client");
const { course } = new PrismaClient();

const getAllCourses = async () => {
    return course.findMany({
        select: {
            name: true,
            teacher: true
        }
    });
}

const getCourseById = async (id) => {
    return course.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            teacher: true
        }
    });
}

module.exports = {
    getAllCourses,
    getCourseById
}