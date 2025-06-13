import React from 'react';

interface AlertComponentProps {
  serverError: string[];
}

const AlertComponent: React.FC<AlertComponentProps> = ({ serverError }) => {
  return (
    <div>
      <ul>
        {serverError?.map((alert:string, index:number) => (
          <li key={index} className="alert alert-danger" role="alert">
            {alert}
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default AlertComponent;
