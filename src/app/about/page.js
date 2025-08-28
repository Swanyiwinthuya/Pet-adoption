<<<<<<< HEAD
import MainSiteLayout from "../../components/layout/MainSiteLayout";

export default function AboutPage() {
  return (
    <MainSiteLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Pet Adoption System
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're dedicated to connecting loving families with pets in need, 
            making the adoption process simple, transparent, and rewarding.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To provide every pet with a loving forever home while making the adoption 
                process accessible and enjoyable for families.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Values</h3>
              <p className="text-gray-600">
                Compassion, transparency, and dedication to animal welfare guide 
                everything we do in our adoption process.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Browse Pets</h3>
              <p className="text-gray-600 text-sm">
                Explore our available pets and find your perfect match
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Submit Application</h3>
              <p className="text-gray-600 text-sm">
                Complete the adoption application form
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Meet & Adopt</h3>
              <p className="text-gray-600 text-sm">
                Meet your new family member and complete the adoption
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainSiteLayout>
=======
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
>>>>>>> origin/main
  );
}
