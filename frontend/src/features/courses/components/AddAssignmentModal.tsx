import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AssignmentForm,assignmentSchema } from "../models/Assignment.zod";
import { addAssignmentProps } from "../types/assignment.types";
  
export const AddAssignmentModal = ({ onClose, onSubmit }: addAssignmentProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<AssignmentForm>({
      resolver: zodResolver(assignmentSchema),
    });
  
    return (

      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
          <h3 className="text-xl font-bold mb-4 text-blue-600">Add Assignment</h3>
          
          <form onSubmit={handleSubmit(onSubmit)}>

            <label className="block mb-1 font-semibold">
                Assignment Title
            </label>
            
            <input
              type="text"
              {...register("title")}
              className="w-full border p-2 mb-2 rounded"
            />
            
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
  
            <label className="block mb-1 font-semibold">
                Assignment Description
            </label>
            
            <textarea
              {...register("description")}
              className="w-full border p-2 mb-2 rounded"
            />
            
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
  
            <label className="block mb-1 font-semibold">
                Assignment PDF
            </label>
            
            <input
              type="file"
              accept="application/pdf"
              {...register("pdf")}
              className="w-full mb-2"
            />
            
            {errors.pdf && (
              <p className="text-sm text-red-500">{errors.pdf.message as string}</p>
            )}
  
            <label className="block mb-1 font-semibold">
                Due Date
            </label>
            
            <input
              type="date"
              {...register("dueDate")}
              className="w-full border p-2 mb-2 rounded"
            />
            
            {errors.dueDate && (
              <p className="text-sm text-red-500">{errors.dueDate.message}</p>
            )}
  
            <div className="flex justify-end mt-4">
              
              <button type="button" onClick={onClose} className="mr-4 px-4 py-2 border rounded">
                Cancel
              </button>

              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                Add Assignment
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  