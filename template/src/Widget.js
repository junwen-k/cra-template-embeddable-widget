import logo from './logo.svg';
import classNames from './Widget.module.css';

function Widget({ title }) {
  return (
    <div className={classNames.Widget}>
      <header className={classNames.WidgetHeader}>
        <img src={logo} className={classNames.WidgetLogo} alt="logo" />
        <b>{title}</b>
        <p>
          Edit <code>src/Widget.js</code> and save to reload.
        </p>
        <a
          className={classNames.WidgetLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Widget;
