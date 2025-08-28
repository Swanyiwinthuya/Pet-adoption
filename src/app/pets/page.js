<<<<<<< HEAD
<<<<<<< HEAD
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
=======
export default function PetsPage() {
  return (
    <div>
      <h1>Available Pets</h1>
      {/* Pet listing with filters will be implemented here */}
    </div>
>>>>>>> origin/main
  );
=======
'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

const ANIMALS = ['dog','cat','bird','rabbit','hamster','fish','other']

// Demo data (used only if no API is reachable)
const demoPets = [
  { _id: 'd1', name: 'Bella', animal: 'dog', breed: 'Labrador Mix', age: 2, medicalCondition: 'Healthy, vaccinated.', createdAt: '2025-08-08T12:00:00Z', updatedAt: '2025-08-08T12:00:00Z' },
  { _id: 'd2', name: 'Milo', animal: 'cat', breed: 'Tabby', age: 1, medicalCondition: 'Mild food allergy.', createdAt: '2025-08-06T12:00:00Z', updatedAt: '2025-08-06T12:00:00Z' },
  { _id: 'd3', name: 'Rocky', animal: 'dog', breed: 'Beagle', age: 3, medicalCondition: 'Healthy, microchipped.', createdAt: '2025-07-30T12:00:00Z', updatedAt: '2025-07-30T12:00:00Z' },
  { _id: 'd4', name: 'Luna', animal: 'cat', breed: 'Siamese', age: 0.7, medicalCondition: 'Healthy.', createdAt: '2025-08-10T12:00:00Z', updatedAt: '2025-08-10T12:00:00Z' },
  { _id: 'd5', name: 'Coco', animal: 'dog', breed: 'Pomeranian', age: 4, medicalCondition: 'Patella Grade 1 (minor).', createdAt: '2025-05-14T12:00:00Z', updatedAt: '2025-05-14T12:00:00Z' },
  { _id: 'd6', name: 'Buddy', animal: 'dog', breed: 'Golden Retriever', age: 2, medicalCondition: 'Healthy.', createdAt: '2025-08-09T12:00:00Z', updatedAt: '2025-08-09T12:00:00Z' },
  { _id: 'd7', name: 'Kiwi', animal: 'bird', breed: 'Cockatiel', age: 1.2, medicalCondition: 'Healthy.', createdAt: '2025-07-20T12:00:00Z', updatedAt: '2025-07-20T12:00:00Z' },
  { _id: 'd8', name: 'Thumper', animal: 'rabbit', breed: 'Mini Rex', age: 2.4, medicalCondition: 'Healthy.', createdAt: '2025-08-03T12:00:00Z', updatedAt: '2025-08-03T12:00:00Z' },
  { _id: 'd9', name: 'Bubbles', animal: 'fish', breed: 'Betta', age: 0.3, medicalCondition: 'Healthy.', createdAt: '2025-06-18T12:00:00Z', updatedAt: '2025-06-18T12:00:00Z' },
  { _id: 'd10', name: 'Nibbles', animal: 'hamster', breed: 'Syrian', age: 0.8, medicalCondition: 'Healthy.', createdAt: '2025-08-11T12:00:00Z', updatedAt: '2025-08-11T12:00:00Z' },
]

const ANIMAL_EMOJI = {
  dog: '🐶', cat: '🐱', bird: '🐦', rabbit: '🐰', hamster: '🐹', fish: '🐠', other: '🐾'
>>>>>>> origin/swanyi
}

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)) }

function normalizeDoc(doc, i){
  // Accepts Mongo-like docs and ensures required fields & bounds
  const id = doc?._id?.$oid || doc?._id || doc?.id || `row-${i}`
  const name = String(doc?.name ?? 'Unnamed').slice(0, 50)
  const animal = ANIMALS.includes(String(doc?.animal).toLowerCase()) ? String(doc.animal).toLowerCase() : 'other'
  const breed = String(doc?.breed ?? 'Mixed')
  const age = clamp(Number.isFinite(Number(doc?.age)) ? Number(doc.age) : 0, 0, 30)
  const medicalCondition = String(doc?.medicalCondition ?? 'Healthy').slice(0, 500)
  const createdAt = doc?.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString()
  const updatedAt = doc?.updatedAt ? new Date(doc.updatedAt).toISOString() : createdAt
  return { id, name, animal, breed, age, medicalCondition, createdAt, updatedAt }
}

function ageBand(age){
  if (age < 1) return 'Puppy/Kitten'
  if (age < 3) return 'Young'
  if (age < 7) return 'Adult'
  return 'Senior'
}

export default function FindPetsPage(){
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [sourceNote, setSourceNote] = useState('')

  // Filters
  const [q, setQ] = useState('') // name/breed/condition search
  const [animal, setAnimal] = useState('all')
  const [ageGroup, setAgeGroup] = useState('all') // lt1|1to3|3to7|7to30|all
  const [sort, setSort] = useState('newest') // newest|oldest|age_asc|age_desc
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function load(){
      setLoading(true)
      const tryFetch = async (url) => {
        const res = await fetch(url, { cache: 'no-store' })
        if (!res.ok) throw new Error('bad status')
        return res.json()
      }
      try {
        const base = process.env.NEXT_PUBLIC_API_URL
        let data = null
        if (base) {
          try { data = await tryFetch(`${base}/api/pets`) ; setSourceNote(`Loaded from ${base}/api/pets`) } catch {}
        }
        if (!data) {
          try { data = await tryFetch('/api/pets') ; setSourceNote('Loaded from local /api/pets') } catch {}
        }
        let arr = Array.isArray(data) ? data : []
        if (!arr.length) {
          // Fallback when API returns empty or invalid
          setPets(demoPets.map(normalizeDoc))
          setSourceNote('Showing demo pets (API returned no data)')
        } else {
          setPets(arr.map(normalizeDoc))
        }
      } catch {
        setPets(demoPets.map(normalizeDoc))
        setSourceNote('Showing demo pets (no API reachable)')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    let list = [...pets]

    if (q.trim()){
      const t = q.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(t) ||
        p.breed.toLowerCase().includes(t) ||
        p.medicalCondition.toLowerCase().includes(t)
      )
    }

    if (animal !== 'all') list = list.filter(p => p.animal === animal)

    if (ageGroup !== 'all'){
      list = list.filter(p => {
        const a = p.age
        if (ageGroup === 'lt1') return a < 1
        if (ageGroup === '1to3') return a >= 1 && a < 3
        if (ageGroup === '3to7') return a >= 3 && a < 7
        if (ageGroup === '7to30') return a >= 7 && a <= 30
        return true
      })
    }

    if (sort === 'newest') list.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
    if (sort === 'oldest') list.sort((a,b)=> new Date(a.createdAt) - new Date(b.createdAt))
    if (sort === 'age_asc') list.sort((a,b)=> a.age - b.age)
    if (sort === 'age_desc') list.sort((a,b)=> b.age - a.age)

    return list
  }, [pets, q, animal, ageGroup, sort])

  const PAGE = 9
  const visible = filtered.slice(0, page * PAGE)
  const canLoadMore = visible.length < filtered.length

  function resetFilters(){
    setQ(''); setAnimal('all'); setAgeGroup('all'); setSort('newest'); setPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Find Pets</h1>
        <Link href="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700">Create account</Link>
      </div>

      {sourceNote && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{sourceNote}. Set <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_API_URL</code> to your backend to use live data.</div>
      )}

      {/* Filters */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Search</label>
            <input value={q} onChange={e=>{setQ(e.target.value); setPage(1)}} placeholder="Name, breed or condition…" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Animal</label>
            <select value={animal} onChange={e=>{setAnimal(e.target.value); setPage(1)}} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2">
              <option value="all">All</option>
              {ANIMALS.map(a => <option key={a} value={a}>{a[0].toUpperCase()+a.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <select value={ageGroup} onChange={e=>{setAgeGroup(e.target.value); setPage(1)}} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2">
              <option value="all">All</option>
              <option value="lt1">Puppy/Kitten (&lt;1)</option>
              <option value="1to3">Young (1–3)</option>
              <option value="3to7">Adult (3–7)</option>
              <option value="7to30">Senior (7–30)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sort</label>
            <select value={sort} onChange={e=>setSort(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="age_asc">Age: Low → High</option>
              <option value="age_desc">Age: High → Low</option>
            </select>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <button onClick={resetFilters} className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">Reset</button>
          <span className="text-sm text-gray-500">{filtered.length} result(s)</span>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({length:6}).map((_,i)=> <div key={i} className="h-44 rounded-2xl bg-gray-100 animate-pulse" />)}
          </div>
        ) : (
          filtered.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-600">No pets found. Try changing filters.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visible.map(p => (
                  <div key={p.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:shadow-md">
                    <div className="flex items-center gap-3 p-4">
                      <div className="grid h-14 w-14 place-items-center rounded-lg bg-blue-50 text-3xl">{ANIMAL_EMOJI[p.animal] || '🐾'}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{p.name}</h3>
                        <p className="text-sm text-gray-600">{p.animal[0].toUpperCase()+p.animal.slice(1)} • {p.breed}</p>
                      </div>
                    </div>
                    <div className="px-4 pb-4 text-sm">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-gray-500">Age</div>
                          <div className="font-medium text-gray-900">{p.age} yr</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Stage</div>
                          <div className="font-medium text-gray-900">{ageBand(p.age)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Listed</div>
                          <div className="font-medium text-gray-900">{new Date(p.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <p className="mt-3 line-clamp-2 text-gray-700">{p.medicalCondition}</p>
                      <div className="mt-4 flex gap-3">
                        <Link href={`/pets/${p.id}`} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-center font-medium text-gray-700 hover:bg-gray-50">Details</Link>
                        <Link href={`/adopt/${p.id}`} className="flex-1 rounded-lg bg-gray-900 px-3 py-2 text-center font-medium text-white hover:bg-black">Adopt</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {canLoadMore && (
                <div className="mt-6 flex justify-center">
                  <button onClick={()=>setPage(p=>p+1)} className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-black">Load more</button>
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  )
}