import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { CourseContentController } from '../controllers/coursecontent.controller';
import { validateparams } from '../utils/validateparams';

const router = Router();

router.get("/",verifyToken(['instructor','student']),CourseContentController.getModulesWithLessons);

export default router;