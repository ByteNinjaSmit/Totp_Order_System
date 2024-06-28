import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const footerStyle = {
  marginTop: 'auto',
  width: '100%',
};

export default function Footer() {
  return (
    <MDBFooter bgColor='dark' className='text-center text-white text-lg-left' style={footerStyle}>
      <div className='text-center p-3 bg-dark text-white'>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <Link className='text-white text-decoration-none' to="https://mdbootstrap.com/">
          MERN
        </Link>
      </div>
    </MDBFooter>
  );
}
