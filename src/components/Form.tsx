import React, { useState, useEffect } from 'react';
import Input from './Input';
import { MdCached } from 'react-icons/md';
import classnames from 'classnames';

type FormInputProps = {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  errorMessage?: string;
  label: string;
  pattern?: string;
  required: boolean;
  lastItem: boolean;
};

type FormProps = {
  inputValues: { [key: string]: any };
  inputAttrs: FormInputProps[];
  onSubmit: (e: React.SyntheticEvent, values: {[key: string]: string}, setValues: React.Dispatch<React.SetStateAction<{[key: string]: string;}>>) => void;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText: string;
  formMessage?: string;
  reset?: boolean;
} 

const Form = ({inputValues, inputAttrs, onSubmit, loading, setLoading, buttonText, formMessage, reset}: FormProps) => {
  const [values, setValues] = useState<{[key: string]: string}>(inputValues);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    if (setLoading) setLoading(true);
    onSubmit(e, values, setValues);
  }

  return (
    <form onSubmit={handleSubmit}>
    {inputAttrs.map(input => (
      <Input 
        key={input.id}
        value={values[input.name]}
        handleChange={handleChange} 
        name={input.name} 
        type={input.type}
        placeholder={input.placeholder} 
        errorMessage={input.errorMessage} 
        label={input.label} 
        pattern={input.pattern}
        required={input.required}
        lastItem={input.lastItem}
        reset={reset}
      />
    ))}
    <div className="flex justify-end">
      <button type="submit" className="mt-8 px-6 py-2 bg-green-400 rounded-md flex items-center disabled:bg-slate-50 disabled:text-slate-500" disabled={loading}>{loading && <MdCached className="-scale-100 mr-2 animate-spin" size={30} />}{buttonText}</button>
    </div>
    <div className="text-red-500">
      {formMessage}
    </div>
  </form>
  );
}

export default Form;