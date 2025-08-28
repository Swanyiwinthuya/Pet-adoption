import MainSiteLayout from "../../components/layout/MainSiteLayout";

export default function PetsPage() {
  return (
    <MainSiteLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Available Pets for Adoption
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Find your perfect companion from our selection of loving pets
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pet cards will go here */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🐕</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Max</h3>
              <p className="text-gray-600 mb-2">Golden Retriever • 2 years old</p>
              <p className="text-sm text-gray-500 mb-4">Healthy, fully vaccinated</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Adopt Me
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🐱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Luna</h3>
              <p className="text-gray-600 mb-2">Domestic Shorthair • 1 year old</p>
              <p className="text-sm text-gray-500 mb-4">Healthy, spayed</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Adopt Me
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🐰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bunny</h3>
              <p className="text-gray-600 mb-2">Holland Lop • 6 months old</p>
              <p className="text-sm text-gray-500 mb-4">Friendly and playful</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Adopt Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainSiteLayout>
  );
}
