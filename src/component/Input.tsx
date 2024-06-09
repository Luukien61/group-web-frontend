import React, {ChangeEvent} from 'react';

type InputProps = {
    placeholder?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'password' | 'email' | 'password_confirmation' | "number";
    className?: string;
    required?: boolean;
    disabled?: boolean;
}
const Input = (input: InputProps) => {
    return (
        <div className="flex">
            <DefaultInput
                value={input.value}
                onChange={input.onChange}
                className={input.className}
                placeholder={input.placeholder}
                type={input.type} />
            <button className="bg-[#099309] rounded-r text-white px-2">
                Search
            </button>
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
            className={`${inputProps.className ? inputProps.className :"rounded border" } bg-white text-black h-8 md:h-10 px-3 py-3 border-gray-600 focus:outline-0 focus:ring-0 placeholder:italic`}
            type={inputProps.type}
            placeholder={inputProps.placeholder}/>
    )
}

export default Input;