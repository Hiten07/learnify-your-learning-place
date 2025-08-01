import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { postApis } from "../../../api/course.api";
import {
  lessonSchemaForm,
  lessonSchema2,
} from "../models/Courseschema.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { Loader } from "../../../utils/Loader";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { showToastMessage } from "../../../utils/Toast.errors";

const AddLessonToCourseModule = () => {
  const methods = useForm<lessonSchemaForm>({
    resolver: zodResolver(lessonSchema2),
    defaultValues: {
      lessons: [
        {
          title: "",
          description: "",
          video: undefined,
          pdf: undefined,
        },
      ],
    },
  });

  const [loading, setLoading] = useState(false);
  const { moduleid,courseid } = useParams();
  const coursedetails = useLocation();
  const navigate = useNavigate();

  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
  } = methods;

  const {
    fields: lessonFields,
    append: appendLesson,
    remove: removeLesson,
  } = useFieldArray({
    control,
    name: `lessons`,
  });

  // Watch entire modules field so we can get files directly
  const watchedModules = watch("lessons");

  const onSubmit = async (data: lessonSchemaForm) => {
    try {
      setLoading(true);



      for (const [lessonIndex, lesson] of data.lessons.entries()) {
          const lessonFormData = new FormData();
          lessonFormData.append("title", lesson.title);
          lessonFormData.append("description", lesson.description);

          const videoFiles =
            watchedModules?.[lessonIndex].video;
          const pdfFiles =
            watchedModules?.[lessonIndex]?.pdf;

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
              moduleid: moduleid,
            }
          );

          if(lessonResponse) {
            setLoading(false);
            navigate(`/courses/${courseid}`,{
              state: coursedetails.state
            })
            showToastMessage(lessonResponse.message, 200);
          }
        }
        reset()
        setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div
      className="p-12 max-w-5xl mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50 shadow-lg mt-20"
      style={{ backgroundColor: "rgb(245, 245, 245)" }}
    >
      {loading && <Loader />}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
         
          {lessonFields.map((lesson, lessonIndex) => (
            <div className="py-5" key={lesson.id}>
              <h4 className="font-xl font-bold text-blue-600 mb-4">
                Lesson {lessonIndex + 1}
              </h4>

              <label className="block text-gray-700 font-semibold mb-1">
                Lesson Title
              </label>
              <input
                {...register(
                  `lessons.${lessonIndex}.title`
                )}
                className={`w-full px-3 py-2 mb-4 border ${
                  errors.lessons?.[lessonIndex]?.title
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
                placeholder="Lesson Title"
                required
              />
              {errors.lessons?.[lessonIndex]?.title
                ?.message && (
                <p className="text-red-500 text-sm">
                  {errors.lessons[lessonIndex].title?.message}
                </p>
              )}

              <label className="block text-gray-700 font-semibold mb-1">
                Lesson Description :
              </label>
              <input
                {...register(
                  `lessons.${lessonIndex}.description`
                )}
                className={`w-full px-3 py-2 border mb-4 ${
                  errors.lessons?.[lessonIndex]
                    ?.description
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
                placeholder="Lesson Description"
                required
              />
              {errors.lessons?.[lessonIndex]?.description
                ?.message && (
                <p className="text-red-500 text-sm">
                  {
                    errors.lessons[lessonIndex].description
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
                  errors.lessons?.[lessonIndex]?.video
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
                {...register(
                  `lessons.${lessonIndex}.video`
                )}
                required
              />
              {errors.lessons?.[lessonIndex]?.video && (
                <p className="text-red-500 text-sm">
                  {
                    errors.lessons[lessonIndex].video
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
                  errors.lessons?.[lessonIndex]?.pdf
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
                {...register(`lessons.${lessonIndex}.pdf`)}
              />
              {errors.lessons?.[lessonIndex]?.pdf && (
                <p className="text-red-500 text-sm">
                  {
                    errors.lessons[lessonIndex].pdf
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
            Add New Lesson
          </button>

          <button
            type="submit"
            disabled={loading}
            className="p-2 m-4 text-white bg-blue-600 rounded"
          >
            {loading ? "Adding lesson..." : "Submit"}
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

export default AddLessonToCourseModule;
