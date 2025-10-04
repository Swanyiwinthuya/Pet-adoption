import Card, { CardBody } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function PetCard({ pet, onViewDetails, onAdopt }) {
  const petId = pet.id || pet._id;
  const available = pet.isAvailable !== false;

  const Status = () => (
    available
      ? <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300">Available</span>
      : <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-300">Adopted</span>
  );

  return (
    <div className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/70 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur transition-all hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={pet.photo || '/placeholder.png'}
          alt={pet.name}
          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3">
          <Status />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{pet.name}</h3>
        </div>
        <p className="mt-1 text-sm text-zinc-400">
          {pet.animal} • {pet.breed} • {pet.age} yr{Number(pet.age) === 1 ? '' : 's'}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(petId)}
            className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 hover:bg-zinc-800 disabled:opacity-50"
          >
            View Details
          </button>
          {available ? (
            <button
              onClick={() => onAdopt(petId)}
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 px-3 py-2 text-sm font-medium text-white shadow hover:opacity-95"
            >
              Adopt Me
            </button>
          ) : (
            <button
              disabled
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-500"
            >
              Not Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
