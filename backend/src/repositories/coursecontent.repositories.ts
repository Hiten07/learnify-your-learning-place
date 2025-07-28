import { lessons } from "../models/lessons";
import { coursemodule } from "../models/coursemodule";
import { enrolled } from "../models/enrolled";
import { user } from "../models/user";

export const courseContentRepositories = { 

        async getAllStudentsAssignments(courseid: number) {
            const result =  await enrolled.findAll({
                where: { 
                    courseid: courseid
                 },
                include: [ {
                        model: user,
                        as: "users",
                        attributes: ["id","firstname","lastname","email"]
                    }    
                ] 
              });
              return result;
        },

        async getModuleByCourseId(courseid: number) {
            return coursemodule.findAll({
                where: {
                    courseid: courseid
                }
            })
        },

        async getLessonByModule(moduleid: number) {
            return lessons.findAll({
                where: {
                    moduleid: moduleid
                }
            })
        }
}