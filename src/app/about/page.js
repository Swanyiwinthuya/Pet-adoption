export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Pet Adoption Center</h1>
        
        <div className="prose prose-lg mx-auto">
          <p className="text-xl text-gray-600 mb-8 text-center">
            We are dedicated to helping pets find their forever homes and connecting families with their perfect companions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-600">To provide loving care for pets and facilitate successful adoptions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
              <p className="text-gray-600">A world where every pet has a loving home and family</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Values</h3>
              <p className="text-gray-600">Compassion, responsibility, and dedication to animal welfare</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2020, Pet Adoption Center has been serving our community by providing a safe haven for pets in need and connecting them with loving families. Our dedicated team works tirelessly to ensure every pet receives the care and attention they deserve.
            </p>
            <p className="text-gray-700">
              We believe that every pet deserves a second chance and every family deserves the joy that comes with pet companionship. Through our comprehensive adoption process, we ensure successful matches that benefit both pets and their new families.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
