import React from 'react';

export default function StatusIcon(props) {
  let statusClassName;
  let buttonText;
  switch (props.status) {
    case '':
      statusClassName = '';
      buttonText = 'Add Treasure';
      break;
    case 'isLoading':
      statusClassName = 'fa fa-spinner fa-spin';
      buttonText = 'Adding Treasure';
      break;
    case 'error':
      statusClassName = 'fa fa-exclamation-triangle';
      buttonText = 'Could not add treasure';
      break;
    case 'success':
      statusClassName = 'fa fa-check';
      buttonText = 'Added treasure';
      break;
    default:
      statusClassName = '';
      buttonText = 'Add Treasure';
  }
  return (
    <span>
      <i className={statusClassName} />
      &nbsp;{buttonText}
    </span>
  );
}
