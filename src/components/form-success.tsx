import { FcOk } from "react-icons/fc";

interface FormSuccessProps {
    message?: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
    if (!message) return null;

    return (
        <div data-testid="form-success" className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
            <FcOk /> {message}
        </div>
    );
}
