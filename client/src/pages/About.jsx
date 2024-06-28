import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import './assets/about.css'
import {useAuth} from "../store/auth";


export const About = () => {
  const { user } = useAuth();
  return (
    <>
      <style>
        {`.cid-u5Kz62nWDR {
            padding-top: 5rem;
            padding-bottom: 3rem;
            background-color: transparent;
        }

        .cid-u5Kz62nWDR .mbr-fallback-image.disabled {
            display: none;
        }

        .cid-u5Kz62nWDR .mbr-fallback-image {
            display: block;
            background-size: cover;
            background-position: center center;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
        }

        .cid-u5Kz62nWDR .item-mb {
            margin-bottom: 2rem;
        }

        @media (max-width: 767px) {
            .cid-u5Kz62nWDR .item-mb {
                margin-bottom: 1rem;
            }
        }

        .cid-u5Kz62nWDR .item-wrapper {
            background: #ffffff;
            padding: 2.25rem;
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        @media (min-width: 992px) and (max-width: 1200px) {
            .cid-u5Kz62nWDR .item-wrapper {
                padding: 2rem 1.5rem;
                margin-bottom: 0rem;
            }
        }

        @media (max-width: 767px) {
            .cid-u5Kz62nWDR .item-wrapper {
                padding: 2rem 1.5rem;
                margin-bottom: 1rem;
            }
        }

        .cid-u5Kz62nWDR .mbr-section-title {
            color: #000000;
        }

        .cid-u5Kz62nWDR .mbr-section-subtitle {
            color: #000000;
        }

        .cid-u5Kz62nWDR .card-box {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .cid-u5Kz62nWDR .card-box .item-footer {
            margin-top: auto;
        }

        .cid-u5Kz62nWDR .content-head {
            max-width: 800px;
        }

        .cid-u5Kz62nWDR .card-title,
        .cid-u5Kz62nWDR .iconfont-wrapper {
            text-align: center;
        }

        .cid-u5Kz62nWDR .card-text,
        .cid-u5Kz62nWDR .item .mbr-section-btn {
            text-align: center;
        }`}
      </style>
      <section
        className="features18 cid-u5Kz62nWDR"
        id="features-24-u5Kz62nWDR"
        style={{background:'#FEECEC'}}
      >
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-12 content-head text-center">
            <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2 text-center" style={{ fontSize: '20px' }}>
              <strong className="text-truncate fw-bold text-center">
                  Welcome, {user ? `${user.username} to our website` : 'to Our Website'}
              </strong>
              </h3>
              <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                <strong className="text-truncate fw-bold">Unleash the Future</strong>
              </h3>
              <h5 className="mbr-section-subtitle mbr-fonts-style align-center mb-0 mt-4 display-7">
                Experience Unmatched Security Features for POS Systems in 2024
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="item features-without-image col-12 col-md-6 col-lg-4 item-mb z-2 rounded-5 ">
              <div className="item-wrapper rounded-5">
                <div className="card-box align-left rounded-5">
                  <h5 className="card-title mbr-fonts-style display-5 p-2">
                    <strong>Cutting-Edge Encryption</strong>
                  </h5>
                  <p className="card-text mbr-fonts-style display-7">
                    Fortify your data with unbreakable encryption algorithms.
                  </p>
                </div>
              </div>
            </div>
            <div className="item features-without-image col-12 col-md-6 col-lg-4 item-mb z-2 rounded-5 ">
              <div className="item-wrapper rounded-5">
                <div className="card-box align-left rounded-5">
                  <h5 className="card-title mbr-fonts-style display-5 p-2">
                    <strong>Biometric Authentication</strong>
                  </h5>
                  <p className="card-text mbr-fonts-style display-7">
                    Access your system with a touch of your unique identity.
                  </p>
                </div>
              </div>
            </div>
            <div className="item features-without-image col-12 col-md-6 col-lg-4 item-mb z-2 rounded-5 ">
              <div className="item-wrapper rounded-5">
                <div className="card-box align-left rounded-5">
                  <h5 className="card-title mbr-fonts-style display-5 p-2">
                    <strong>AI-Powered Monitoring</strong>
                  </h5>
                  <p className="card-text mbr-fonts-style display-7">
                    Stay ahead of threats with intelligent system surveillance.
                  </p>
                </div>
              </div>
            </div>
            <div className="item features-without-image col-12 col-md-6 col-lg-4 item-mb z-2 rounded-5 ">
              <div className="item-wrapper rounded-5">
                <div className="card-box align-left rounded-5">
                  <h5 className="card-title mbr-fonts-style display-5 p-2">
                    <strong>Real-time Alerts</strong>
                  </h5>
                  <p className="card-text mbr-fonts-style display-7">
                    Instant notifications to keep you informed at all times.
                  </p>
                </div>
              </div>
            </div>
            <div className="item features-without-image col-12 col-md-6 col-lg-4 item-mb z-2 rounded-5 ">
              <div className="item-wrapper rounded-5">
                <div className="card-box align-left rounded-5">
                  <h5 className="card-title mbr-fonts-style display-5 p-2">
                    <strong>Fraud Detection</strong>
                  </h5>
                  <p className="card-text mbr-fonts-style display-7">
                    Detect and prevent fraudulent activities in real-time.
                  </p>
                </div>
              </div>
            </div>
            <div className="item features-without-image col-12 col-md-6 col-lg-4 item-mb z-2 rounded-5 ">
              <div className="item-wrapper rounded-5">
                <div className="card-box align-left rounded-5">
                  <h5 className="card-title mbr-fonts-style display-5 p-2">
                    <strong>Secure Transactions</strong>
                  </h5>
                  <p className="card-text mbr-fonts-style display-7">
                    Ensure every transaction is safe and secure for all parties
                    involved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>
        {`.cid-u5Kz62oF6w {
          padding-top: 3rem;
          padding-bottom: 3rem;
          background-color: #ffffff;
        }
        .cid-u5Kz62oF6w .mbr-fallback-image.disabled {
          display: none;
        }
        .cid-u5Kz62oF6w .item-wrapper {
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        .cid-u5Kz62oF6w .mbr-fallback-image {
          display: block;
          background-size: cover;
          background-position: center center;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
        }
        .cid-u5Kz62oF6w .mbr-iconfont {
          display: inline-flex;
          font-size: 2rem;
          color: var(--primary-color, #d70081);
          width: 80px;
          justify-content: center;
          align-items: center;
          background: #ffd7ef;
          height: 80px;
          border-radius: 50%;
        }
        .cid-u5Kz62oF6w .card-title,
        .cid-u5Kz62oF6w .iconfont-wrapper {
          color: var(--primary-color, #d70081);
          text-align: center;
        }
        .cid-u5Kz62oF6w .card-text {
          color: #000000;
          text-align: center;
        }
        .cid-u5Kz62oF6w .content-head {
          max-width: 800px;
        }
        .cid-u5Kz62oF6w .mbr-section-title {
          color: #000000;
        }`}
      </style>
      <section className="features10 cid-u5Kz62oF6w" id="metrics-2-u5Kz62oF6w">
        <div className="container">
          <div className="row justify-content-center">
            <div className="item features-without-image col-12 col-md-6 col-lg-4">
              <div className="item-wrapper">
                <div className="card-box align-left">
                  <h5 className="card-title mbr-fonts-style display-1">
                    <strong className="text-danger fw-bold">99%</strong>
                  </h5>
                  <p className="card-text mbr-fonts-style mb-3 display-7">
                    Data Protection
                  </p>
                </div>
              </div>
            </div>
            <div className="item features-without-image col-12 col-md-6 col-lg-4">
              <div className="item-wrapper">
                <div className="card-box align-left">
                  <h5 className="card-title mbr-fonts-style display-1">
                    <strong className="text-danger fw-bold">24/7</strong>
                  </h5>
                  <p className="card-text mbr-fonts-style mb-3 display-7">
                    Support Availability
                  </p>
                </div>
              </div>
            </div>
            <div className="item features-without-image col-12 col-md-6 col-lg-4">
              <div className="item-wrapper">
                <div className="card-box align-left">
                  <h5 className="card-title mbr-fonts-style display-1">
                    <strong className="text-danger fw-bold">Fast</strong>
                  </h5>
                  <p className="card-text mbr-fonts-style mb-3 display-7">
                    Response Time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <style>
        {`.cid-u5Kz62ogOQ {
          padding-top: 5rem;
          padding-bottom: 5rem;
          background-color: transparent;
        }
        .cid-u5Kz62ogOQ .mbr-fallback-image.disabled {
          display: none;
        }
        .cid-u5Kz62ogOQ .mbr-fallback-image {
          display: block;
          background-size: cover;
          background-position: center center;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
        }
        .cid-u5Kz62ogOQ .card-wrapper {
          background: #ffffff;
        }
        @media (max-width: 767px) {
          .cid-u5Kz62ogOQ .card-wrapper {
            padding: 2rem 1.5rem;
            margin-bottom: 1rem;
          }
        }
        @media (min-width: 768px) and (max-width: 991px) {
          .cid-u5Kz62ogOQ .card-wrapper {
            padding: 2.25rem;
          }
        }
        @media (min-width: 992px) {
          .cid-u5Kz62ogOQ .card-wrapper {
            padding: 4rem;
          }
        }
        .cid-u5Kz62ogOQ .mbr-text,
        .cid-u5Kz62ogOQ .mbr-section-btn {
          text-align: center;
        }`}
      </style> */}
    </>
  );
};

export default About;
