import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage: string;
  label: string;
}

function Input(props: InputProps) {
  const [focused, setFocused] = useState<boolean>(false);
  const { label, onChange, errorMessage, id, ...inputProps } = props;

  const handleBlur = () => {
    setFocused(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold inputLabel">
        {label}
      </label>

      <input
        id={id}
        {...inputProps}
        onChange={onChange}
        onBlur={handleBlur}
        focused={focused.toString()}
        className="outline-none w-full border-2 border-gray-400 indent-1 p-2 rounded-lg hover:bg-gray-100 focus:bg-gray-100 transition-colors placeholder:font-semibold formInput"
        required
      />
      <span className="text-sm text-red-500 font-semibold errorMessage">
        {errorMessage}
      </span>
    </div>
  );
}

export default Input;
