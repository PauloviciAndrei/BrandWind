import { useState, useEffect } from 'react';
import React from 'react';

function SelectInput({
  labelTitle,
  options,
  value,
  updateType,
  updateFormValue,
  openDirection = 'down',
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || options[0]);

  useEffect(() => {
    setSelected(value || options[0]);
  }, [value, options]);

  const handleSelect = (val) => {
    setSelected(val);
    setOpen(false);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{labelTitle}</span>
      </label>

      <div className="dropdown w-full relative">
        <div
          tabIndex={0}
          role="button"
          className="w-full border border-base-300 rounded-lg px-3 py-2 flex justify-between items-center cursor-pointer bg-base-100 textarea-md"
          onClick={() => setOpen(!open)}
        >
          {selected}
          <span className="ml-2">▾</span>
        </div>

        {
          <ul
            tabIndex={0}
            className={`dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-lg w-full max-h-60 overflow-y-auto absolute left-0 ${
              openDirection === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'
            }`}
          >
            {options.map((opt, idx) => (
              <li
                key={idx}
                className={`px-3 py-2 rounded-md cursor-pointer hover:bg-primary hover:text-white ${
                  opt === selected ? 'bg-primary text-white' : ''
                }`}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default React.memo(SelectInput);
