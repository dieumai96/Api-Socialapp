import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';
const options = [
  { label: '* Select Professional Status', value: 0 },
  { label: 'Developer', value: 'Developer' },
  { label: 'Junior Developer', value: 'Junior Developer' },
  { label: 'Senior Developer', value: 'Senior Developer' },
  { label: 'Manager', value: 'Manager' },
  { label: 'Student or Learning', value: 'Student or Learning' },
  { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
  { label: 'Intern', value: 'Intern' },
  { label: 'Other', value: 'Other' },
]
const SelectListGroup = ({
  name,
  value,
  error,
  info,
  onChange,
}) => {
  const selectOptions = options.map(option => {
    return  ( <option key={option.label} value={option.value}>
      {option.label}
    </option> )
  })
  return (
    <div className="form-group">
      <select
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        name={name}
        value={value}
        onChange={onChange}>
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  )
}
SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}
export default SelectListGroup;