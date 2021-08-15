import { useField } from 'formik';
import { useEffect, useRef, InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement>;

const InputField = ({ ...props }: InputFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [field, { error, touched }] = useField(props as string);

  useEffect(() => {
    if (error) {
      inputRef.current?.focus();
    }
  }, [error]);

  return (
    <div className="mb-2">
      <input
        ref={inputRef}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...field}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        className={`appearance-none rounded relative block w-full px-3 py-2 border-2 border-${
          error ? 'red' : 'blue'
        }-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-${
          error ? 'red' : 'blue'
        }-500`}
      />
      {touched && error ? (
        <div className="text-red-500 font-semibold text-sm">{error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
