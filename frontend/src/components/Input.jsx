/* eslint-disable react/prop-types */

export default function Input(props) {
  const { htmlFor, labelText, type, placeholder, onChange } = props;

  return (
    <div className="flex flex-col">
      <label htmlFor={htmlFor} className="font-bold mb-3 mt-5">
        {labelText}
      </label>
      <input
        type={type}
        name={htmlFor}
        id={htmlFor}
        className="border border-white px-3 py-2 text-sm outline-none rounded-md bg-orange-100 bg-opacity-30 placeholder:text-slate-500"
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
