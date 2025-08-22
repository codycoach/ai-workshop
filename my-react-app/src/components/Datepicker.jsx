import PropTypes from 'prop-types'
import { useId } from 'react'

function Datepicker({ label = 'Select date', value, min, max, onChange }) {
  const inputId = useId()

  function handleChange(event) {
    onChange?.(event.target.value)
  }

  return (
    <div className="datepicker">
      {label ? (
        <label htmlFor={inputId} style={{ display: 'block', marginBottom: 8 }}>
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        type="date"
        value={value ?? ''}
        min={min}
        max={max}
        onChange={handleChange}
        style={{ padding: '8px 12px', fontSize: 16 }}
      />
    </div>
  )
}

Datepicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  onChange: PropTypes.func,
}

export default Datepicker


