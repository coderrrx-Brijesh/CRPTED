import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Contact Section */}
        <div className="contact space-y-4">
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">Cryptex</h2>
          <p className="text-lg">Let's talk! <span role="img" aria-label="thumbs up">👍</span></p>
          <p className="text-lg">+12 345 678 9101</p>
          <p className="text-lg">hello.cryptex@gmail.com</p>
          <p className="text-lg">Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522</p>
        </div>

        {/* Products Section */}
        <div className="products space-y-4">
          <h3 className="text-2xl font-semibold mb-4">PRODUCTS</h3>
          <ul className="space-y-2">
            <li className="hover:text-yellow-300 cursor-pointer">Spot</li>
            <li className="hover:text-yellow-300 cursor-pointer">Inverse Perpetual</li>
            <li className="hover:text-yellow-300 cursor-pointer">USDT Perpetual</li>
            <li className="hover:text-yellow-300 cursor-pointer">Exchange</li>
            <li className="hover:text-yellow-300 cursor-pointer">Launchpad</li>
            <li className="hover:text-yellow-300 cursor-pointer">Binance Pay</li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="services space-y-4">
          <h3 className="text-2xl font-semibold mb-4">SERVICES</h3>
          <ul className="space-y-2">
            <li className="hover:text-yellow-300 cursor-pointer">Buy Crypto</li>
            <li className="hover:text-yellow-300 cursor-pointer">Markets</li>
            <li className="hover:text-yellow-300 cursor-pointer">Trading Fee</li>
            <li className="hover:text-yellow-300 cursor-pointer">Affiliate Program</li>
            <li className="hover:text-yellow-300 cursor-pointer">Referral Program</li>
            <li className="hover:text-yellow-300 cursor-pointer">API</li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="support space-y-4">
          <h3 className="text-2xl font-semibold mb-4">SUPPORT</h3>
          <ul className="space-y-2">
            <li className="hover:text-yellow-300 cursor-pointer">Bybit Learn</li>
            <li className="hover:text-yellow-300 cursor-pointer">Help Center</li>
            <li className="hover:text-yellow-300 cursor-pointer">User Feedback</li>
            <li className="hover:text-yellow-300 cursor-pointer">Submit a request</li>
            <li className="hover:text-yellow-300 cursor-pointer">API Documentation</li>
            <li className="hover:text-yellow-300 cursor-pointer">Trading Rules</li>
          </ul>
        </div>

        {/* About Section */}
        <div className="about space-y-4">
          <h3 className="text-2xl font-semibold mb-4">ABOUT US</h3>
          <ul className="space-y-2">
            <li className="hover:text-yellow-300 cursor-pointer">About Bybit</li>
            <li className="hover:text-yellow-300 cursor-pointer">Authenticity Check</li>
            <li className="hover:text-yellow-300 cursor-pointer">Careers</li>
            <li className="hover:text-yellow-300 cursor-pointer">Business Contacts</li>
            <li className="hover:text-yellow-300 cursor-pointer">Blog</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom mt-8 text-center">
        <p className="text-lg">© 2022 Cryptex All Rights Reserved by <a href="https://codewithsadee.com" className="text-blue-400 underline hover:text-yellow-300">codewithsadee</a></p>
        <div className="social-icons flex justify-center space-x-6 mt-6">
          <a href="#" className="text-blue-500 hover:text-white text-2xl transition-colors duration-300"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-blue-400 hover:text-white text-2xl transition-colors duration-300"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-pink-500 hover:text-white text-2xl transition-colors duration-300"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-blue-700 hover:text-white text-2xl transition-colors duration-300"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
