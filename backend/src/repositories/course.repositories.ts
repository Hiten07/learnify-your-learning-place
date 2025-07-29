import { course } from "../models/course";
import { Op, Sequelize } from "sequelize";
import {
  courseDetails,
  moduleDetails,
  assignmentObj,
  submissionObj,
} from "../types/customtypes";
import { paginationData } from "../types/interfaces";
import { coursemodule } from "../models/coursemodule";
import { enrolled } from "../models/enrolled";
import { lessonsObj } from "../types/customtypes";
import { user } from "../models/user";
import { addDays } from "date-fns";
import { lessons } from "../models/lessons";
import { submission } from "../models/submissions";
import { assignment } from "../models/assignment";

type Lesson = {
  title: string;
  description: string;
  video: FileList;
  pdf?: FileList;
};

type Module = {
  title: string;
  description: string;
  lessons: Lesson[];
};

type Coursedata = {
  title: string;
  description: string;
  modules: Module[];
};

export const courseRepositories = {
  async findByUserId(id: number) {
    return user.findByPk(id);
  },

  async findInstructorCoursesHistory(instructorid: number) {
    return course.findAndCountAll({
      where: {
        instructorid: instructorid,
      },
      include: [
        {
          model: enrolled,
          as: "enrolledcourses",
          required: true,
          attributes: ["userid", "enrolleddate", "validuntildate"],
          include: [
            {
              model: user,
              as: "users",
              attributes: ["id", "firstname", "lastname", "email"],
            },
          ],
        },
      ],
    });
  },

  async getAllCoursesForStudent(paginationData: paginationData) {
    return course.findAndCountAll({
      where: {
        [Op.or]: [
          {
            coursename: {
              [Op.like]: `%${paginationData.search}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${paginationData.search}%`,
            },
          },
        ],
      },
      order: [[paginationData.sortBy, paginationData.sortType]],
      limit: paginationData.limit,
      offset: paginationData.offset,
    });
  },

  async findCourseCreatedByInstructor(courseid: number, instructorid: number) {
    return await course.findOne({
      where: {
        courseid: courseid,
        instructorid: instructorid,
      },
    });
  },

  async findAllCoursesForStudent(
    userid: number,
    paginationData: paginationData
  ) {
    return await course.findAndCountAll({
      attributes: [
        "courseid",
        "coursename",
        "courseprice",
        "description",
        "duration",
        "instructorid",
      ],

      include: [
        {
          model: enrolled,
          as: "enrolledcourses",

          where: {
            userid: userid,
          },

          required: true,
          attributes: ["userid", "enrolleddate", "validuntildate"],
        },
      ],

      where: {
        [Op.or]: [
          {
            coursename: {
              [Op.like]: `%${paginationData.search}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${paginationData.search}%`,
            },
          },
        ],
      },

      order: [[paginationData.sortBy, paginationData.sortType]],
      limit: paginationData.limit,
      offset: paginationData.offset,
    });
  },

  // async createCourseWithModuleAndLessons (courseCreationData: Coursedata) {
  //   const { title, description, modules } = courseCreationData;

  //   const t = await sequelize.transaction();

  //   try {
  //     const coursecreated = await course.create({ title, description }, { transaction: t });

  //     let order=1;
  //     for (const moduleData of modules) {
  //       const createdModule = await coursemodule.create(
  //         {
  //           title: moduleData.title,
  //           description: moduleData.description,
  //           courseid: coursecreated.id,
  //           order: order++
  //         },
  //         { transaction: t }
  //       );

  //       for (const lesson of moduleData.lessons) {

  //         await lessons.create(
  //           {
  //             title: lesson.title,
  //             description: lesson.description,
  //             moduleid: createdModule.id,
  //             videoUrl,
  //             pdfUrl,
  //           },
  //           { transaction: t }
  //         );
  //       }
  //     }

  //     await t.commit();
  //     return t;
  //   } catch (err) {
  //     await t.rollback();
  //   }
  // },

  async create(courseCreationData: courseDetails) {
    return course.create(courseCreationData);
  },

  async findByUserAndCourse(userid: number, courseid: number) {
    return enrolled.findOne({
      where: {
        userid: userid,
        courseid: courseid,
      },
    });
  },

  async updateCourseById(courseUpdationData: course, courseid: number) {
    return course.update(courseUpdationData, {
      where: {
        courseid: courseid,
      },
    });
  },

  async deleteCourseById(courseid: number) {
    return course.destroy({
      where: {
        courseid: courseid,
      },
    });
  },

  async moduleDetailById(moduleid: number) {
    return coursemodule.findByPk(moduleid);
  },

  async findCourseDetailsById(courseid: number) {
    return course.findByPk(courseid);
  },

  async addModuleToCourse(coursemoduledata: moduleDetails) {
    return coursemodule.create(coursemoduledata);
  },

  async addLessonForModule(lessondata: lessonsObj) {
    return lessons.create(lessondata);
  },

  async getAllCoursesAssignments(userId: number, paginationData: paginationData) {

    const enrolledCourses = await enrolled.findAll({
      where: { userid: userId },
      attributes: ["courseid"],
    });
  
    const courseIds = enrolledCourses.map(ec => ec.courseid);
  
    const assignments = await assignment.findAndCountAll({
      where: {
        courseid: courseIds,
        [Op.or]: [
          { title: { [Op.like]: `%${paginationData.search}%` } },
          { description: { [Op.like]: `%${paginationData.search}%` } },
        ],
      },
      include: [
        {
          model: course,
          as: "course", 
          attributes: ["coursename", "description", "instructorid"],
        },
        {
          model: submission,
          as: "submissions",
          where: { userid: userId },
          required: false,
          attributes: ["userid", "courseid", "assignmentid", "isaccepted", "submissionUrl"],
        },
      ],
      distinct: true,
      order: [[paginationData.sortBy, paginationData.sortType]],
      limit: paginationData.limit, 
      offset: paginationData.offset,
    });
  
    return assignments;
  },
  

  // async getAllCoursesAssignments(userid: number, paginationData: paginationData) {
  //   return enrolled.findAll({
  //     where: {
  //       userid: userid,
          
  //       },
  //     attributes: ["userid", "courseid", "enrolleddate", "validuntildate"],
  //     include: [
  //       {
  //         model: course,
  //         as: "enrolledcourses",
  //         required: true,
  //         attributes: ["coursename", "description", "instructorid"],
  //         include: [
  //           {
  //             required: true,
  //             model: assignment,
  //             as: "assignments",
  //             attributes: [
  //               "id",
  //               "title",
  //               "description",
  //               "duedate",
  //               "assignmentUrl",
  //               "createdAt",
  //             ],
  //             where: {
  //               [Op.or]: [
  //                 {
  //                   title: {
  //                     [Op.like]: `%${paginationData.search}%`,
  //                   },
  //                 },
  //                 {
  //                   description: {
  //                     [Op.like]: `%${paginationData.search}%`,
  //                   },
  //                 },
  //               ],
  //             },
  //             include: [
  //               {
  //                 model: submission,
  //                 as: "submissions",
  //                 attributes: ["userid","courseid","assignmentid","isaccepted","submissionUrl"]
  //               }
  //             ],
  //              order: [[paginationData.sortBy, paginationData.sortType]],
  //             },
  //           ],
            
  //         },
  //       ],
  //       limit: paginationData.limit,
  //       offset: paginationData.offset,
  //   });
  // },

  async updateSubmissionRemarks(
    remarks: boolean,
    submissionid: number,
    assignmentid: number,
    courseid: number
  ) {
    const remarkOBj = {
      isaccepted: remarks,
    };

    return submission.update(remarkOBj, {
      where: {
        id: submissionid,
        assignmentid: assignmentid,
        courseid: courseid,
      },
    });
  },

  async enrollNewUserInCourse(
    userId: number,
    courseid: number,
    course: course
  ) {
    const currentDate = new Date();
    const validUntilDate = addDays(currentDate, course.duration);

    return enrolled.create({
      userid: userId,
      courseid: courseid,
      validuntildate: validUntilDate,
    });
  },

  async getAllCoursesOfInstructor(
    instructorid: number,
    paginationData: paginationData
  ) {
    return course.findAndCountAll({
      where: {
        instructorid: instructorid,
        [Op.or]: [
          {
            coursename: {
              [Op.like]: `%${paginationData.search}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${paginationData.search}%`,
            },
          },
        ],
      },

      order: [[paginationData.sortBy, paginationData.sortType]],
      limit: paginationData.limit,
      offset: paginationData.offset,
    });
  },

  async findEnrolledStudentsByCourseId(courseid: number, instructorid: number) {
    return course.findOne({
      where: {
        courseid: courseid,
        instructorid: instructorid,
      },
      attributes: {
        exclude: ["courseid", "createdAt", "updatedAt", "deletedAt"],
      },
      include: [
        {
          model: user,
          as: "students",
          attributes: ["id", "firstname", "lastname", "email"],
          through: {},
        },
      ],
    });
  },
};

export { submissionObj, assignmentObj };
