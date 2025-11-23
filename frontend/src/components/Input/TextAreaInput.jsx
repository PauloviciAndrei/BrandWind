import { useEffect, useState } from 'react';

function TextAreaInput({
  labelTitle,
  labelStyle,
  containerStyle,
  value,
  placeholder,
  updateFormValue,
  updateType,
}) {
  const [internalValue, setInternalValue] = useState(value || '');

  useEffect(() => {
    setInternalValue(value || '');
  }, [value]);

  const updateInputValue = (val) => {
    setInternalValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={'label-text text-base-content ' + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <textarea
        value={internalValue}
        className="textarea textarea-bordered w-full"
        placeholder={placeholder || ''}
        onChange={(e) => updateInputValue(e.target.value)}
      ></textarea>
    </div>
  );
}

export default TextAreaInput;
