import { FcHighPriority } from "react-icons/fc";

interface FormErrorProps {
    message?: string;
}

export function FormError({ message }: FormErrorProps) {
    if (!message) return null;

    return (
        <div data-testid="form-error" className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            <FcHighPriority /> {message}
        </div>
    );
}
