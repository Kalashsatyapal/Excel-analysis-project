const Input = ({ label, id, ...props }) => (
  <div className="mb-6">
    {label && (
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
      >
        {label}
      </label>
    )}
    <input
      id={id}
      {...props}
      className="w-full px-4 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
    />
  </div>
);

export default Input;
