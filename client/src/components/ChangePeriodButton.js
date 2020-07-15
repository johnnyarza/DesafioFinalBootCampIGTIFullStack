import React from 'react';

export default function ChangePeriodButton({ icon, onClick }) {
  const handleClick = () => {
    onClick(icon);
  };
  return (
    <div>
      <a className="waves-effect  btn" onClick={handleClick} href="#!">
        <i className="tiny material-icons center">{icon}</i>
      </a>
    </div>
  );
}
