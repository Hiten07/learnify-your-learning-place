import { AssignmentForm } from "../models/Assignment.zod";

export interface addAssignmentProps {
    onClose: () => void;
    onSubmit: (data: AssignmentForm) => void;
}