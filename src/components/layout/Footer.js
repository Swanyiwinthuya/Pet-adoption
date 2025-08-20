export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pet Adoption Center</h3>
            <p className="text-gray-300 text-sm">
              Helping pets find their forever homes since 2020. We believe every pet deserves a loving family.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/pets" className="text-gray-300 hover:text-white">Available Pets</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Adoption Process</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Pet Care Tips</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p>📧 info@petadoption.com</p>
              <p>📞 (555) 123-4567</p>
              <p>📍 123 Pet Street, Animal City, AC 12345</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 Pet Adoption Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
