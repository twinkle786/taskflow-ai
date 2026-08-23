// StatCard - emoji icon ke saath, gradient background
export default function StatCard({ label, value, emoji, gradient }) {
  return (
    <div className={`rounded-xl p-4 flex items-center gap-4 ${gradient}`}>
      <div className="w-11 h-11 rounded-lg bg-white/30 flex items-center justify-center text-2xl">
        {emoji}
      </div>
      <div>
        <p className="text-2xl font-semibold text-white">{value}</p>
        <p className="text-sm text-white/90">{label}</p>
      </div>
    </div>
  );
}
