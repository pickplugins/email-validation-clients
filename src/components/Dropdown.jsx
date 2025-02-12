import React from 'react'
import PropTypes from "prop-types";

const Dropdown = ({children, className}) => {
  return (
    <div className={`absolute z-10 ${className}`}>
      {children}
    </div>
  )
}

Dropdown.defaultProps = {
  className: ""
}

Dropdown.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Dropdown