import { useForm, useFieldArray, FormProvider, useFormContext } from "react-hook-form";
import { coursespostApis } from "../../../api/course.api";

// useFormContext => custom hook that allows you to access the state and methods provided by formprovider
// Formprovider => provides method & state to the nested components of compoenent using react-hook-form

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

type CourseForm = {
  title: string;
  price: number;
  duration: number;
  description: string;
  modules: Module[];
};

const LessonFields = ({ moduleIndex }: { moduleIndex: number }) => {
  const { control, register } = useFormContext<CourseForm>();
  const { fields: lessonFields, append: appendLesson } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons`,
  });

  return (
    <div>
      {lessonFields.map((lesson, lessonIndex) => (
        <div key={lesson.id}>
          <h4>Lesson {lessonIndex + 1}</h4>

          <input
            {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.title`)}
            placeholder="Lesson Title"
            required
          />
          <input
            {...register(
              `modules.${moduleIndex}.lessons.${lessonIndex}.description`
            )}
            placeholder="Lesson Description"
            required
          />
          <input
            type="file"
            accept="video/*"
            {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.video`)}
            required
          />
          <input
            type="file"
            accept="application/pdf"
            {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.pdf`)}
          />
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
}: {
  moduleIndex: number;
  moduleId: string;
}) => {
  const { register } = useFormContext<CourseForm>();

  return (
    <div key={moduleId}>
      <h3>Module {moduleIndex + 1}</h3>

      <input
        {...register(`modules.${moduleIndex}.title`)}
        placeholder="Module Title"
        required
      />
      <input
        {...register(`modules.${moduleIndex}.description`)}
        placeholder="Module Description"
        required
      />

      <LessonFields moduleIndex={moduleIndex} />

      <hr />
    </div>
  );
};

const AddCourse = () => {
  const methods = useForm<CourseForm>({
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

  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = methods;

  const { fields: moduleFields, append: appendModule } = useFieldArray({
    control,
    name: "modules",
  });

  const onSubmit = async (data: CourseForm) => {
    try {
      const courseRes = await coursespostApis(
        "/courses/create",
        {
          coursename: data.title,
          courseprice: data.price,
          description: data.description,
          duration: data.duration,
        },
        {}
      );

      if (!courseRes) throw new Error("Failed to create course");
      const courseId = courseRes.data.courseid;
      console.log(courseId)

      // 2. Create Modules
      for (const module of data.modules) {
        let order = 1;
        const moduleRes = await coursespostApis("/courses/module",
        {
          title: module.title,
          description: module.description,
          order: order++
        },
        {
          courseid: courseId
        })

        if (!moduleRes) throw new Error("Failed to create module");

        const moduleId = moduleRes.data.id;

        // 3. Create Lessons
        for (const lesson of module.lessons) {
          console.log(lesson)
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
          const lessonRes = await coursespostApis("/courses/module/lessons",
            lessonFormData,
            {
              moduleid: moduleId
            })

          if (!lessonRes) throw new Error("Failed to create lesson");
        }
      }
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Add Course</h2>

        <label className="block text-gray-700 font-semibold mb-1">
          Course Title :
        </label>
        <input
          {...register("title")}
          type="text"
          placeholder="Course Title"
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
          ${errors.title ? "border-red-500" : "border-gray-300"}`}
          required
        />
        <label className="block text-gray-700 font-semibold mb-1">
          Course Price :
        </label>
        <input
          {...register("price")}
          type="text"
          placeholder="Course Price"
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
            ${errors.price ? "border-red-500" : "border-gray-300"}`}
          required
        />
        <label className="block text-gray-700 font-semibold mb-1">
          Course Description :
        </label>
        <textarea
          {...register("description")}
          placeholder="Course Description"
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
          ${errors.description ? "border-red-500" : "border-gray-300"}`}
          required
        />

        <label className="block text-gray-700 font-semibold mb-1">
          Course Duration :
        </label>
        <input
          {...register("duration")}
          type="text"
          placeholder="Course Duration ( In days )"
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
            ${ errors.duration ? "border-red-500" : "border-gray-300" }`} required />

        <hr />

        {moduleFields.map((module, moduleIndex) => (
          <ModuleFields
            key={module.id}
            moduleIndex={moduleIndex}
            moduleId={module.id}
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

        <button type="submit" className="p-2 m-4 text-white">
          Add Course ✅
        </button>
        <button
          type="reset"
          className="p-2 m-4 text-white"
          onClick={() => reset}
        >
          reset
        </button>
      </form>
    </FormProvider>
  );
};

export default AddCourse;
