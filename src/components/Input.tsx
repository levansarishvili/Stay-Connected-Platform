import { Input } from "@/components/ui/input";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const InputComponent = ({
  placeholder,
  inputType,
  register,
  error,
}: {
  placeholder: string;
  inputType: string;
  register: UseFormRegisterReturn<keyof FormData>;
  error?: FieldError;
}) => {
  return (
    <div className="flex justify-center flex-col">
      <Input
        type={inputType}
        className={`border ${error ? "border-red-500" : "border-gray-300"} dark:border-gray-600 w-full max-w-[500px] p-8 rounded-md text-gray-800 dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 my-2`}
        placeholder={placeholder}
        {...register}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default InputComponent;
