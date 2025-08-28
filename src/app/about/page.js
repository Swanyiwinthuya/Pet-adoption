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
  );
}
