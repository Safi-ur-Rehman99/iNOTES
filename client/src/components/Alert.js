import React from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

const Alert = (props) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-success" />;
      case 'danger':
        return <AlertCircle size={20} className="text-danger" />;
      case 'info':
        return <Info size={20} className="text-info" />;
      case 'warning':
        return <AlertCircle size={20} className="text-warning" />;
      default:
        return <Info size={20} className="text-primary" />;
    }
  }

  const capitalize = (word) => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div style={{ height: '50px' }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} d-flex align-items-center shadow-sm fade show`}
          role="alert"
          style={{ borderRadius: '8px' }}
        >
          {getIcon(props.alert.type)}
          <span className="ms-2">
            <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
          </span>
        </div>
      )}
    </div>
  )
}

export default Alert