import { lessons } from "../models/lessons";
import { coursemodule } from "../models/coursemodule";

export const courseContentRepositories = { 
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