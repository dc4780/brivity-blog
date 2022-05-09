import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

export type InputProps = {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type: string;
  placeholder: string;
  errorMessage?: string;
  label: string;
  pattern?: string;
  required: boolean;
  lastItem: boolean;
  reset?: boolean;
}

const Input = ({value, handleChange, name, type, placeholder, errorMessage, label, pattern, required, lastItem, reset}: InputProps) => {
  const [shouldValidate, setShouldValidate] = useState(false);
  const handleInput = () => setShouldValidate(true);
  const resetValidate = () => setShouldValidate(false);
  const handleConfirmPasswordInput = () => {
    if (lastItem) {
      handleInput();
    }
  };
  useEffect(() => {
    if (reset) resetValidate();
  }, [reset]);
  return (
    <div> 
      <label className="block mt-2">{label}</label>
      <input
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        pattern={pattern}
        required={required}
        onChange={handleChange} 
        onBlur={handleInput} 
        onFocus={handleConfirmPasswordInput}
        className={classnames("mt-2 px-3 py-5 w-full h-5", {
          "validateinput": shouldValidate
        })}
      />
      {errorMessage && <span className={classnames({
          "validatemessage": shouldValidate
        })}>{errorMessage}</span>}
    </div>
  )
}

export default Input;
