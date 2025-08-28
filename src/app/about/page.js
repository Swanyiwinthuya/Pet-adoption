export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">About Pet Adoption Center</h1>
        <p className="mt-4 text-lg text-gray-600">We connect loving pets with caring humans. Our platform works with trusted shelters and fosters to make adoption simple, transparent, and humane.</p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-4xl">💙</div>
          <h3 className="mt-4 text-xl font-semibold">Our Mission</h3>
          <p className="mt-2 text-gray-600">Help every pet find a safe, loving home by removing friction from the adoption journey and supporting responsible ownership.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-4xl">🔍</div>
          <h3 className="mt-4 text-xl font-semibold">What We Do</h3>
          <p className="mt-2 text-gray-600">Centralized listings, verified shelters, clear application steps, and friendly guidance from discovery to adoption day.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-4xl">🤝</div>
          <h3 className="mt-4 text-xl font-semibold">Trusted Partners</h3>
          <p className="mt-2 text-gray-600">We collaborate with local rescues and clinics to ensure pets are vaccinated, microchipped, and ready for a new start.</p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-900">How adoption works</h2>
        <ol className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 list-decimal list-inside">
          <li className="rounded-xl bg-gray-50 p-4"><span className="font-semibold">Browse:</span> filter by species, age, and personality to match your lifestyle.</li>
          <li className="rounded-xl bg-gray-50 p-4"><span className="font-semibold">Meet:</span> schedule a visit or virtual meeting with the shelter.</li>
          <li className="rounded-xl bg-gray-50 p-4"><span className="font-semibold">Adopt:</span> complete the paperwork and welcome a new family member.</li>
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
  )
}