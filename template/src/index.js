import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './Widget';
import reportWebVitals from './reportWebVitals';

import widgetConfig from './WidgetConfig';

function renderWidget(config, el, onPerfEntry) {
  ReactDOM.render(
    <React.StrictMode>
      <Widget {...config} />
    </React.StrictMode>,
    el
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals(onPerfEntry);
}

if (process.env.NODE_ENV === 'development') {
  renderWidget(widgetConfig, document.getElementById('root'));
}

export { renderWidget };
