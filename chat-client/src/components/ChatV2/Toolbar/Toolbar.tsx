import React from 'react';
import './Toolbar.css';

export default function Toolbar(props: any) {
  const { children } = props;
  return (
    <div className="toolbar flex-column">
      <h1 className="toolbar-title">{props.title}</h1>
      {children}
    </div>
  );
}