import React from 'react';

export default function StatusIcon(props) {
  let statusClassName;
  switch (props.status) {
    case '':
      statusClassName = '';
      break;
    case 'isLoading':
      statusClassName = 'fa fa-spinner fa-spin';
      break;
    case 'error':
      statusClassName = 'fa fa-exclamation-triangle';
      break;
    case 'success':
      statusClassName = 'fa fa-check';
      break;
    default:
      statusClassName = '';
  }
  return <i className={statusClassName} />;
}
