import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

export const ButtonTypes = {
  primary: 'button--primary',
  secondary: 'button--secondary'
}

export const ButtonStyles = {
  rounded: 'button--rounded',
  roundedLeft: 'button--roundedLeft',
  roundedRight: 'button--roundedRight',
  squared: 'button--squared'
}

const Button = props => (
  <button
    className={`${props.className} button ${props.type} ${props.style}`.trim()}
    onClick={props.onClick}
    disabled={props.disabled ? 'disabled' : undefined}>
      {props.children}
  </button>
)

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(Object.values(ButtonTypes)),
  style: PropTypes.oneOf(Object.values(ButtonStyles)),
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  className: '',
  type: ButtonTypes.primary,
  style: ButtonStyles.rounded
}

export default Button
