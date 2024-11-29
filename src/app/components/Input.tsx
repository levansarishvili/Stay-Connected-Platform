import { Input } from "@/components/ui/input";

const InputComponent = ({
  placeholder,
  inputType,
}: {
  placeholder: string;
  inputType: string;
}) => {
  return (
    <div className="flex justify-center">
      <Input
        type={inputType}
        className="border border-gray-300 dark:border-gray-600 w-full max-w-[500px] p-5 rounded-md text-gray-800 dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 my-1"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputComponent;
