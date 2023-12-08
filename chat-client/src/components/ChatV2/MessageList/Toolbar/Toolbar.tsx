import React from 'react';
import './Toolbar.css';

export default function Toolbar(props) {
    return (
      <div className="toolbar">
        <h1 className="toolbar-title">{ props.title }</h1>
      </div>
    );
}