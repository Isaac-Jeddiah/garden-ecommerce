import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-light text-dark pt-5 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-lg-4 col-xl-3">
            <h5>About PlantStore</h5>
            <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
            <p className="mb-0">
              PlantStore is your one-stop shop for all things green. We offer a wide variety of plants and care products to help your garden thrive.
            </p>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto">
            <h5>Plant Quote</h5>
            <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
            <p><i>"In every walk with nature, one receives far more than he seeks."</i> - John Muir</p>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto">
            <h5>Contact Us</h5>
            <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
            <ul className="list-unstyled">
              <li><i className="fa fa-home mr-2"></i> 123 Plant Street, Green City</li>
              <li><i className="fa fa-envelope mr-2"></i> info@plantstore.com</li>
              <li><i className="fa fa-phone mr-2"></i> + 01 234 567 88</li>
            </ul>
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3">
            <h5>Find Us</h5>
            <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
            
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d464400.74763476005!2d54.474501599218755!3d24.584680329573867!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e675698dbeaa7%3A0xdafa40a10b2a3be!2sTrees%20Herbs%20and%20more!5e0!3m2!1sen!2sin!4v1733390103310!5m2!1sen!2sin" 
               width="100%" height="150" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col text-center">
            <p className="text-dark mb-0 py-2">© 2023 PlantStore. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
