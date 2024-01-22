const Input = (props) => {
  const { htmlFor, labelText, type, placeholder, onChange } = props

  return (
    <div className="flex flex-col">
      <label htmlFor={htmlFor} className="font-bold mb-3 mt-5">
        {labelText}
      </label>
      <input
        type={type}
        name={htmlFor}
        id={htmlFor}
        className="border border-slate-400 px-3 py-2 text-slate-900 text-sm outline-none"
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        required
      />
    </div>
  )
}

export default Input
