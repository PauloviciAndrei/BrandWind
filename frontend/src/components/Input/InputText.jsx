function InputText({
  labelTitle,
  value,
  placeholder,
  updateFormValue,
  updateType,
  type = 'text',
}) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{labelTitle}</span>
      </label>
      <input
        type={type}
        value={value || ''}
        placeholder={placeholder || ''}
        onChange={(e) => updateFormValue({ updateType, value: e.target.value })}
        className="input input-bordered w-full"
      />
    </div>
  );
}

export default InputText;
