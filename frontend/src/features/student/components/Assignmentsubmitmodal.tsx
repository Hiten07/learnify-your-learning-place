import React, { useState } from "react";
import { allassignmentsdetails } from "../types/assignment.types";

interface AssignmentSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File, comments: string) => void;
  assignment: allassignmentsdetails | null;
}

const AssignmentSubmitModal: React.FC<AssignmentSubmitModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  assignment,
}) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [comments, setComments] = useState("");

  const handleSubmit = () => {
    if (!pdfFile) {
      alert("Please upload a PDF file.");
      return;
    }

    onSubmit(pdfFile, comments);
    setPdfFile(null);
    setComments("");
  };

  if (!isOpen || !assignment) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-h-lg max-w-md relative border-4 border-indigo-500">
        <h2 className="text-xl font-bold mb-4">Submit Assignment</h2>

        <label className="block mb-2 font-semibold">Upload PDF</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
          className="mb-4 w-full border p-2 rounded"
        />

        <label className="block mb-2 font-semibold">Comments (optional)</label>
        <textarea
          rows={3}
          className="w-full border rounded p-2 mb-4"
          placeholder="Add any additional notes..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        ></textarea>

        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmitModal;
