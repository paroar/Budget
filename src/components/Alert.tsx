import React from "react";

type AlertProps = {
  alert: {
    show: boolean;
    type: string;
    text: string;
  };
};

const Alert: React.FC<AlertProps> = ({ alert }) => {
  const { show, type, text } = alert;
  return <div className={`${"alert alert-"}${type}`}>{text}</div>;
};

export default Alert;
