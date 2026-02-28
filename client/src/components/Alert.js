import React from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

const Alert = (props) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} style={{ color: 'var(--success)' }} />;
      case 'danger':
        return <AlertCircle size={20} style={{ color: 'var(--danger)' }} />;
      case 'info':
        return <Info size={20} style={{ color: 'var(--info)' }} />;
      case 'warning':
        return <AlertCircle size={20} style={{ color: 'var(--warning)' }} />;
      default:
        return <Info size={20} style={{ color: 'var(--gold)' }} />;
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
          style={{
            borderRadius: 'var(--radius-md)',
            background: 'var(--gray-800)',
            border: '1px solid var(--gray-600)',
            color: 'var(--off-white)'
          }}
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