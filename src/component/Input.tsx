import React, {ChangeEvent} from 'react';
import { FaSearch } from "react-icons/fa";

type InputProps = {
    placeholder?: string;
    value?: string;
    // eslint-disable-next-line no-unused-vars
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'password' | 'email' | 'password_confirmation' | "number";
    className?: string;
    required?: boolean;
    disabled?: boolean;
}
const Input = (input: InputProps) => {
    return (
        <div className="flex items-center relative">
            <DefaultInput
                value={input.value}
                onChange={input.onChange}
                className={input.className}
                placeholder={input.placeholder}
                type={input.type} />
            <div className={`absolute end-2`}>
                <FaSearch />
            </div>
        </div>
    );
};
export const DefaultInput : React.FC<InputProps> = (inputProps) => {
    return (
        <input
            disabled={inputProps.disabled}
            required={inputProps.required && false}
            value={inputProps.value}
            onChange={inputProps.onChange}
            spellCheck={'false'}
            className={` bg-white text-black h-8 md:h-10 px-3 py-3 border-gray-600 focus:outline-0 focus:ring-0 placeholder:italic ${inputProps.className ? inputProps.className :"" }`}
            type={inputProps.type}
            placeholder={inputProps.placeholder}/>
    )
}

export default Input;