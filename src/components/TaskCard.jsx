// TaskCard - dark theme, emoji status badges
const statusStyles = {
  todo: { emoji: "📋", style: "bg-slate-800 text-slate-400" },
  "in-progress": { emoji: "⏳", style: "bg-amber-500/20 text-amber-400" },
  done: { emoji: "✅", style: "bg-emerald-500/20 text-emerald-400" },
};

const priorityEmoji = { low: "🔵", medium: "🟡", high: "🔴" };

export default function TaskCard({ task }) {
  const s = statusStyles[task.status];
  return (
    <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg p-3 hover:border-purple-500/50 transition">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-200">{task.title}</p>
        <p className="text-xs text-slate-500 mt-1">
          📅 Due: {task.dueDate} • {priorityEmoji[task.priority]} {task.priority} priority
        </p>
      </div>
      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.style}`}>
        {s.emoji} {task.status}
      </span>
    </div>
  );
}
