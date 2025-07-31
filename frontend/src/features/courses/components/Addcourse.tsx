import { useForm, useFieldArray, FormProvider, useFormContext, UseFieldArrayRemove } from "react-hook-form";
import { coursespostApis } from "../../../api/course.api";
import { courseSchema } from "../models/Courseschema.zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { CourseForm } from "../models/Courseschema.zod";
import { ReactNode, useState } from "react";
import { Loader } from "../../../utils/Loader";
import { showToastMessage } from "../../../utils/Toast.errors";

// useFormContext => custom hook that allows you to access the state and methods provided by formprovider
// Formprovider => provides method & state to the nested components of component using react-hook-form

const LessonFields = ({ moduleIndex }: { moduleIndex: number }) => {
  
  const { control, register, formState: {errors} } = useFormContext<CourseForm>();

  const { fields: lessonFields, append: appendLesson,remove: removeLesson } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons`,
  });

  return (


    <div>
      {lessonFields.map((lesson, lessonIndex) => (
        <div className="py-5  " key={lesson.id}>
          <h4 className="font-xl font-bold text-blue-600 mb-4">Lesson {lessonIndex + 1}</h4>

          <label className="block text-gray-700 font-semibold mb-1">
             Lesson Title
          </label>
          <input
            {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.title`)}
            className={`w-full px-3 py-2 mb-4 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded`}
            placeholder="Lesson Title"
            required
          />
          {errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.title?.message && (
            <p className="text-red-500 text-sm">
              {errors.modules[moduleIndex].lessons[lessonIndex].title?.message}
            </p>
          )}


          <label className="block text-gray-700 font-semibold mb-1">
                  Lesson Description :
          </label>
          <input
            {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.description`)}
            className={`w-full px-3 py-2 border mb-4 ${errors.title ? "border-red-500" : "border-gray-300"} rounded`}
            placeholder="Lesson Description"
            required
          />
          {errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.description?.message && (
                      <p className="text-red-500 text-sm">
                        {errors.modules[moduleIndex].lessons[lessonIndex].description?.message}
                      </p>
          )}

          <label className="block text-gray-700 font-semibold mb-1">
             Video Lesson : 
          </label>

          <input
            type="file"
            accept="video/*"
            className={`w-full px-3 py-2 border mb-4 ${errors.title ? "border-red-500" : "border-gray-300"} rounded`}
            {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.video`)}
            required
          />
             {errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.video && (
            <p className="text-red-500 text-sm">
              {errors?.modules?.[moduleIndex].lessons?.[lessonIndex].video?.message as ReactNode}
            </p>
          )}
          
          <label className="block text-gray-700 font-semibold mb-1">
            PDF Lesson :
          </label>

          <input
            type="file"
            accept="application/pdf"
            className={`w-full px-3 py-2 border mb-4 ${errors.title ? "border-red-500" : "border-gray-300"} rounded`}
            {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.pdf`)}
          />
             {errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.pdf && (
            <p className="text-red-500 text-sm">
              {errors.modules?.[moduleIndex]?.lessons[lessonIndex].pdf?.message as ReactNode}
            </p>
          )}

          {errors?.modules?.[moduleIndex]?.lessons && (
              <p>
              {errors?.modules?.[moduleIndex]?.lessons.message}
            </p>
          )}
             

        <button
                type="button"
                className="p-2 m-4 text-white" 
                onClick={() => removeLesson(lessonIndex)}
                disabled={lessonFields.length === 1}>
                remove lesson
        </button>
        </div>
      ))}

      <button
        type="button"
        className="p-2 m-4 text-white"
        onClick={() =>
          appendLesson({
            title: "",
            description: "",
            video: undefined,
            pdf: undefined,
          })
        }
      >
        {" "}
        Add Lesson
      </button>
    </div>
  );
};

const ModuleFields = ({
  moduleIndex,
  moduleId,
  removeModule
}: {
  moduleIndex: number;
  moduleId: string;
  removeModule: UseFieldArrayRemove
}) => {
  const { register,formState: {errors}
 } = useFormContext<CourseForm>();

  return (
    <div className="py-10" key={moduleId}>
      <h3 className="py-2 text-xl font-bold text-blue-600">Module {moduleIndex + 1}</h3>

      <label className="block text-gray-700 font-semibold mb-1">
          Module Title :
        </label>
      <input
        {...register(`modules.${moduleIndex}.title`)}
        className={`w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
        ${errors.modules?.[moduleIndex]?.title ? "border-red-500" : "border-gray-300"}`}
        placeholder="Module Title"
        required
      />
      {errors.modules?.[moduleIndex]?.title && (
        <p className="text-red-500 text-sm">
          {errors.modules[moduleIndex].title.message}
        </p>
      )}

      <label className="block text-gray-700 font-semibold mb-1">
          Module Description :
      </label>
      <input
        {...register(`modules.${moduleIndex}.description`)}
        className={`w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
        ${errors?.modules?.[moduleIndex]?.description ? "border-red-500" : "border-gray-300"}`}
        placeholder="Module Description"
        required
      />
      {errors.modules?.[moduleIndex]?.description && (
        <p className="text-red-500 text-sm">
          {errors.modules[moduleIndex].description.message}
        </p>
      )}

      <button
        type="button"
        className="p-2 m-4 text-white" 
        onClick={() => removeModule(moduleIndex)}>
        remove module
      </button>


      <LessonFields moduleIndex={moduleIndex} />

      <hr />
    </div>
  );
};

const AddCourse = () => {
  const methods = useForm<CourseForm>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      modules: [
        {
          title: "",
          description: "",
          lessons: [
            {
              title: "",
              description: "",
              video: undefined,
              pdf: undefined,
            },
          ],
        },
      ],
    },
  });

  const [loading,setLoading] = useState(false);
  const { control, register, reset, formState: { errors }, handleSubmit} = methods;

  const { fields: moduleFields, append: appendModule, remove: removeModule } = useFieldArray({
    control,
    name: "modules",
  });


  const onSubmit = async (data: CourseForm) => {
    try {
      setLoading(true);
      const courseResponse = await coursespostApis(
        "/courses/create",
        {
          coursename: data.title,
          courseprice: data.price,
          description: data.description,
          duration: data.duration,
        },
        {}
      );

      if (!courseResponse) throw new Error("Failed to create course");
      showToastMessage(courseResponse.message,200);
      const courseId = courseResponse.data.courseid;

      // 2. Create Modules
      for (const module of data.modules) {
        let order = 1;
        const moduleResponse = await coursespostApis("/courses/module",
        {
          title: module.title,
          description: module.description,
          order: order++
        },
        {
          courseid: courseId
        })

        if (!moduleResponse) throw new Error("Failed to create module");

        const moduleId = moduleResponse.data.id;
        showToastMessage(moduleResponse.message,200);

        // 3. Create Lessons
        for (const lesson of module.lessons) {
          const lessonFormData = new FormData();
          
          lessonFormData.append("title", lesson.title);
          lessonFormData.append("description", lesson.description);

          if (lesson.video?.[0] && lesson.video.length > 0) {
            lessonFormData.append("videos", lesson.video[0]);
          }
          if (lesson.pdf?.[0] && lesson.pdf.length > 0) {
           lessonFormData.append("docs", lesson.pdf[0]);
          }

          for (const [key, value] of lessonFormData.entries()) {
            console.log(key, value);
          }
          const lessonResponse = await coursespostApis("/courses/module/lessons",
            lessonFormData,
            {
              moduleid: moduleId
            })

          if (!lessonResponse) throw new Error("Failed to create lesson");
          showToastMessage(lessonResponse.message,200);
        }
      }
      reset();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12 max-w-5xl mx-auto shadow-md bg-dark-gray mt-20" style={{backgroundColor : "rgb(245, 245, 245)"}}>
        <FormProvider {...methods}>

        <form onSubmit={handleSubmit(onSubmit)}>
          {loading && <Loader/>}
          <div>
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Add Course</h2>

        <label className="block text-gray-700 font-semibold mb-1">
          Course Title :
        </label>

        <input
          {...register("title")}
          type="text"
          placeholder="Course Title"
          className={`w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
          ${errors.title ? "border-red-500" : "border-gray-300"}`}
          required
        />

        {errors.title && (
          <p className="text-red-500 text-sm">
            {errors.title.message}
          </p>
        )}

        <label className="block text-gray-700 font-semibold mb-1">
          Course Price :
        </label>

        <input
          {...register("price",{
            valueAsNumber: true
          })}
          type="number"
          placeholder="Course Price"
          className={`w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
            ${errors.price ? "border-red-500" : "border-gray-300"}`}
          required
        />
        
        {errors.price && (
          <p className="text-red-500 text-sm">
            {errors.price.message}
          </p>
        )}

        <label className="block text-gray-700 font-semibold mb-1">
          Course Description :
        </label>

        <textarea
          {...register("description")}
          placeholder="Course Description"
          className={`w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
          ${errors.description ? "border-red-500" : "border-gray-300"}`}
          required
        />

        {errors.description && (
          <p className="text-red-500 text-sm">
            {errors.description.message}
          </p>
        )}

        <label className="block text-gray-700 font-semibold mb-1">
          Course Duration :
        </label>

        <input
            type="number"
          {...register("duration",{
            valueAsNumber: true
          })}
          placeholder="Course Duration ( In days )"
          className={`w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
            ${ errors.duration ? "border-red-500" : "border-gray-300" }`} required />

        <hr />

        {errors.duration && (
          <p className="text-red-500 text-sm">
            {errors.duration.message}
          </p>
        )}

      </div>


        {errors.modules && (
          <p className="text-red-500 text-sm">
            {errors.modules.message}
          </p>
        )}
    

        {moduleFields.map((module, moduleIndex) => (
          <ModuleFields
          key={module.id}
          moduleIndex={moduleIndex}
          moduleId={module.id}
          removeModule={removeModule}
          />
        ))}

        <button
          type="button"
          className="p-2 m-4 text-white"
          onClick={() =>
            appendModule({
              title: "",
              description: "",
              lessons: [
                {
                  title: "",
                  description: "",
                  video: undefined,
                  pdf: undefined,
                },
              ],
            })
          }
        >
          {" "}
          Add Module
        </button>
 
        <button 
          type="submit" 
          disabled={loading}
          className="p-2 m-4 text-white"
          >
           {loading ? "Adding course.." : "Add Course"}
        </button>
        <button
          type="reset"
          className="p-2 m-4 text-white"
          onClick={() => reset
          }
        >
          reset
        </button>
        </form>
    
        </FormProvider>
    </div>
  );
};

export default AddCourse;
