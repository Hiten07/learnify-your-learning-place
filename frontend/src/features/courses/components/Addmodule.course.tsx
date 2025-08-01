import {
  useForm,
  useFieldArray,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { postApis, getApis } from "../../../api/course.api";
import { moduleSchema2, ModuleSchemaForm } from "../models/Courseschema.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { Loader } from "../../../utils/Loader";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { showToastMessage } from "../../../utils/Toast.errors";

const LessonFields = ({ moduleIndex }: { moduleIndex: number }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ModuleSchemaForm>();

  const {
    fields: lessonFields,
    append: appendLesson,
    remove: removeLesson,
  } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons`,
  });

  return (
    <div>
      {lessonFields.map((lesson, lessonIndex) => (
        <div className="py-5" key={lesson.id}>
          <h4 className="font-xl font-bold text-blue-600 mb-4">
            Lesson {lessonIndex + 1}
          </h4>

          <label className="block text-gray-700 font-semibold mb-1">
            Lesson Title
          </label>
          <input
            {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.title`)}
            className={`w-full px-3 py-2 mb-4 border ${
              errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.title
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
            placeholder="Lesson Title"
            required
          />
          {errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.title
            ?.message && (
            <p className="text-red-500 text-sm">
              {errors.modules[moduleIndex].lessons[lessonIndex].title?.message}
            </p>
          )}

          <label className="block text-gray-700 font-semibold mb-1">
            Lesson Description :
          </label>
          <input
            {...register(
              `modules.${moduleIndex}.lessons.${lessonIndex}.description`
            )}
            className={`w-full px-3 py-2 border mb-4 ${
              errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.description
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
            placeholder="Lesson Description"
            required
          />
          {errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.description
            ?.message && (
            <p className="text-red-500 text-sm">
              {
                errors.modules[moduleIndex].lessons[lessonIndex].description
                  ?.message
              }
            </p>
          )}

          <label className="block text-gray-700 font-semibold mb-1">
            Video Lesson :
          </label>
          <input
            type="file"
            accept="video/*"
            className={`w-full px-3 py-2 border mb-4 ${
              errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.video
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
            {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.video`)}
            required
          />
          {errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.video && (
            <p className="text-red-500 text-sm">
              {
                errors.modules[moduleIndex].lessons[lessonIndex].video
                  ?.message as ReactNode
              }
            </p>
          )}

          <label className="block text-gray-700 font-semibold mb-1">
            PDF Lesson :
          </label>
          <input
            type="file"
            accept="application/pdf"
            className={`w-full px-3 py-2 border mb-4 ${
              errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.pdf
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
            {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.pdf`)}
          />
          {errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.pdf && (
            <p className="text-red-500 text-sm">
              {
                errors.modules[moduleIndex].lessons[lessonIndex].pdf
                  ?.message as ReactNode
              }
            </p>
          )}

          <button
            type="button"
            className="p-2 m-4 text-white bg-red-600 rounded"
            onClick={() => removeLesson(lessonIndex)}
            disabled={lessonFields.length === 1}
          >
            Remove Lesson
          </button>
        </div>
      ))}

      <button
        type="button"
        className="p-2 m-4 text-white bg-green-600 rounded"
        onClick={() =>
          appendLesson({
            title: "",
            description: "",
            video: undefined,
            pdf: undefined,
          })
        }
      >
        Add Lesson
      </button>
    </div>
  );
};

const AddCourseModule = () => {
  const methods = useForm<ModuleSchemaForm>({
    resolver: zodResolver(moduleSchema2),
    defaultValues: {
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

  const [loading, setLoading] = useState(false);
  const coursedetails = useLocation();
  const navigate = useNavigate();
  const { courseid } = useParams();

  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
  } = methods;

  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control,
    name: `modules`,
  });

  // Watch entire modules field so we can get files directly
  const watchedModules = watch("modules");

  const onSubmit = async (data: ModuleSchemaForm) => {
    try {
      setLoading(true);

      const result = await getApis("/courses/module/order", {
        courseid: courseid,
      });

      for (const [moduleIndex, module] of data.modules.entries()) {
        const moduleResponse = await postApis(
          "/courses/module",
          {
            title: module.title,
            description: module.description,
            order: ++result.data.order,
          },
          { courseid }
        );

        const moduleId = moduleResponse.data.id;
        showToastMessage(moduleResponse.message, 200);

        for (const [lessonIndex, lesson] of module.lessons.entries()) {
          const lessonFormData = new FormData();
          lessonFormData.append("title", lesson.title);
          lessonFormData.append("description", lesson.description);

          const videoFiles =
            watchedModules?.[moduleIndex]?.lessons?.[lessonIndex]?.video;
          const pdfFiles =
            watchedModules?.[moduleIndex]?.lessons?.[lessonIndex]?.pdf;

          if (videoFiles?.length) {
            lessonFormData.append("videos", videoFiles[0]);
          }

          if (pdfFiles?.length) {
            lessonFormData.append("docs", pdfFiles[0]);
          }

          const lessonResponse = await postApis(
            "/courses/module/lessons",
            lessonFormData,
            {
              moduleid: moduleId,
            }
          );

          setLoading(false);
          navigate(`/courses/${courseid}`, {
            state: coursedetails.state,
          });
          showToastMessage(lessonResponse.message, 200);
        }
      }

      setLoading(false);
      reset();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="p-12 max-w-5xl mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50 shadow-lg mt-20">
      {loading && <Loader />}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {moduleFields.map((module, moduleIndex) => (
            <div className="py-10" key={module.id}>
              <h3 className="py-2 text-xl font-bold text-blue-600">
                Module {moduleIndex + 1}
              </h3>

              <label className="block text-gray-700 font-semibold mb-1">
                Module Title :
              </label>
              <input
                {...register(`modules.${moduleIndex}.title`)}
                className={`w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.modules?.[moduleIndex]?.title
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
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
                className={`w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.modules?.[moduleIndex]?.description
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Module Description"
                required
              />
              {errors.modules?.[moduleIndex]?.description && (
                <p className="text-red-500 text-sm">
                  {errors.modules[moduleIndex].description.message}
                </p>
              )}

              {moduleFields.length > 1 && (
                <button
                  type="button"
                  className="p-2 m-4 text-white bg-red-600 rounded"
                  onClick={() => removeModule(moduleIndex)}
                >
                  Remove Module
                </button>
              )}

              <LessonFields moduleIndex={moduleIndex} />

              <hr />
            </div>
          ))}

          <button
            type="button"
            className="p-2 m-4 text-white bg-green-600 rounded"
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
            Add Module
          </button>

          <button
            type="submit"
            disabled={loading}
            className="p-2 m-4 text-white bg-blue-600 rounded"
          >
            {loading ? "Adding module..." : "Add Course Module"}
          </button>

          <button
            type="reset"
            className="p-2 m-4 text-white bg-gray-600 rounded"
            onClick={() => reset()}
          >
            Reset
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddCourseModule;
