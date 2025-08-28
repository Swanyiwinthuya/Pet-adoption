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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900">About Pet Adoption Center</h1>
        <p className="mt-4 text-lg text-gray-600">We connect loving pets with caring humans. Our platform works with trusted shelters and fosters to make adoption simple, transparent, and humane.</p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-4xl">💙</div>
          <h3 className="mt-4 text-xl font-semibold text-blue-900">Our Mission</h3>
          <p className="mt-2 text-gray-600">Help every pet find a safe, loving home by removing friction from the adoption journey and supporting responsible ownership.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-4xl">🔍</div>
          <h3 className="mt-4 text-xl font-semibold text-blue-900">What We Do</h3>
          <p className="mt-2 text-gray-600">Centralized listings, verified shelters, clear application steps, and friendly guidance from discovery to adoption day.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-4xl">🤝</div>
          <h3 className="mt-4 text-xl font-semibold text-blue-900">Trusted Partners</h3>
          <p className="mt-2 text-gray-600">We collaborate with local rescues and clinics to ensure pets are vaccinated, microchipped, and ready for a new start.</p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-900">How adoption works</h2>
        <ol className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 list-decimal list-inside">
          <li className="rounded-xl bg-gray-50 p-4 text-red-900"><span className="font-semibold">Browse:</span> filter by species, age, and personality to match your lifestyle.</li>
          <li className="rounded-xl bg-gray-50 p-4 text-red-900"><span className="font-semibold">Meet:</span> schedule a visit or virtual meeting with the shelter.</li>
          <li className="rounded-xl bg-gray-50 p-4 text-red-900"><span className="font-semibold">Adopt:</span> complete the paperwork and welcome a new family member.</li>
        </ol>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-blue-50 p-6 text-center">
          <div className="text-3xl font-extrabold text-blue-700">1,240+</div>
          <div className="text-sm text-blue-800">Pets adopted</div>
        </div>
        <div className="rounded-2xl bg-purple-50 p-6 text-center">
          <div className="text-3xl font-extrabold text-purple-700">35</div>
          <div className="text-sm text-purple-800">Partner shelters</div>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-6 text-center">
          <div className="text-3xl font-extrabold text-emerald-700">900+</div>
          <div className="text-sm text-emerald-800">Happy adopters</div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <a href="/pets" className="inline-flex items-center rounded-xl bg-gray-900 px-5 py-3 text-white font-medium hover:bg-black">Start finding pets →</a>
      </div>
    </div>
<<<<<<< HEAD
>>>>>>> origin/main
  );
}
=======
  )
}
>>>>>>> origin/swanyi
