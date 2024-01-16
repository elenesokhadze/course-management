import { ChangeEvent, FC } from "react";

interface LabeledInputProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export const LabeledInput: FC<LabeledInputProps> = ({ label, type, name, value, onChange, placeholder, }) => (
    <label className="block mb-4 text-sm font-medium text-label">
        {label}:
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="rounded border border-line p-2 w-full placeholder:text-placeholder focus:outline-none mt-2.5"
            required={true}
            placeholder={placeholder}
        />
    </label>
);