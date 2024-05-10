import React from 'react';

type InputProps = {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    type?: 'text' | 'password' | 'email' | 'password_confirmation';
    className?: string;
}
const Input = (input: InputProps) => {
    return (
        <div className="flex">
            <input
                spellCheck={'false'}
                className={`bg-white border-t border-b border-l rounded-l text-black h-8 md:h-10 px-3 py-3 border-gray-600 focus:outline-0 focus:ring-0 placeholder:italic`}
                type={input.type} placeholder={input.placeholder}/>
            <button className="bg-[#099309] rounded-r text-white px-2">
                Search
            </button>
        </div>
    );
};

export default Input;