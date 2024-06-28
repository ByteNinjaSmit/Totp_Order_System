import React from "react";
import { useAuth } from "../store/auth";

export const Service = () => {
  const { services } = useAuth();
  // console.log(services);

  // If services is undefined or not an array, provide a fallback
  // console.log(services);
  if (!Array.isArray(services)) {
    return <div>Loading services...</div>;
  }

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading mt-4">Services</h1>
        <div className="row">
          {services.map((curElem, index) => {
            const { Price, Description, Provider, Service } = curElem;
            return (
              <div
                className="col-md-4 mt-3 mb-3"
                key={index}
                style={{
                  width: '440px',
                  // height: '650px'
                }}
              >
                <div
                  className="card"
                  style={{
                    height: '600px !important',
                    borderRadius: '20px'
                  }}
                >
                  <img
                    src="https://cdn-icons-png.freepik.com/256/1336/1336494.png?semt=ais_hybrid"
                    alt="Service Image"
                    className="card-img-top"
                    style={{
                      width: '380px',
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto'
                    }}
                  />
                  <div className="card-body">
                    <h2 className="card-title">{Service}</h2>
                    <p className="card-text">{Description}</p>
                    <div className="d-flex justify-content-between">
                      <p className="card-text">{Provider}</p>
                      <p className="card-text">{Price}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Service;
