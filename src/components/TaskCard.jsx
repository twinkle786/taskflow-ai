const statusStyles = {
  todo: "bg-slate-100 text-slate-600",
  "in-progress": "bg-amber-50 text-amber-600",
  done: "bg-emerald-50 text-emerald-600",
};

const priorityStyles = {
  low: "text-slate-400",
  medium: "text-amber-500",
  high: "text-red-500",
};

export default function TaskCard({ task }) {
  return (
    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-3 hover:border-indigo-300 transition">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-800">{task.title}</p>
        <p className="text-xs text-slate-400 mt-1">
          Due: {task.dueDate} • <span className={priorityStyles[task.priority]}>{task.priority} priority</span>
        </p>
      </div>
      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[task.status]}`}>
        {task.status}
      </span>
    </div>
  );
}