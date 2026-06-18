const Footer = () => {
 
  return (
    <footer className="bg-black text-gray-300 pt-12 pb-6 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            DoGym
          </h2>
          <p className="text-sm">
            Book your gym slots. Stay fit, stay strong 
          </p>
        </div>
   
        <div>
          <h3 className="text-white font-semibold mb-4">Opening Hours</h3>
          <ul className="text-sm space-y-2">
            <li>Mon - Fri: 6AM - 10PM</li>
            <li>Sat: 7AM - 8PM</li>
            <li>Sun: Closed</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>Location: Baltana, Punjab</li>
            <li>Mobile No.: +91 9914326625</li>
            <li>Email: start@DoGym.com</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 my-8"></div>

      <div className="flex flex-col md:flex-row justify-between items-center text-sm">

        <p>© 2026 DoGym. All rights reserved.</p>

    

      </div>

    </footer>
  );
};

export default Footer;