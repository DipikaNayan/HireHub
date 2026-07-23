const InputField = ({
  label,
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="mt-5">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputField;
