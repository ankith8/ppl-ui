import React from "react";

const item = (props) => {
  return (
    <div className="card">
      <div className="card-item">
        <p>{props.data["Restaurant Name"]}</p>
      </div>
      <div className="card-item">
        <p>{props.data["Cuisines"]}</p>
      </div>
      <div className="card-item">
        <p>{props.data["Average Cost for two"]}</p>
      </div>
      <div className="card-item">
        <p>{props.data["Currency"]}</p>
      </div>
      <div className="card-item">
        <p>{props.data["Has Table booking"]}</p>
      </div>
      <div className="card-item">
        <p>{props.data["Has Online delivery"]}</p>
      </div>
      <div className="card-item">
        <p style={{ color: props.data["Rating color"].replace(/\s+/g, "").toLowerCase()}}>
          {props.data["Aggregate rating"]}
        </p>
      </div>
      <div className="card-item">
        <p style={{ color: props.data["Rating color"].replace(/\s+/g, "").toLowerCase()}}>
          {props.data["Rating text"]}
        </p>
      </div>
      <div className="card-item">
        <p>{props.data["Votes"]}</p>
      </div>
    </div>
  );
};

export default item;
