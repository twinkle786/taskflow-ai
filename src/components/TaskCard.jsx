import { Trash2 } from "lucide-react";
import api from "../api/axios";

const statusStyles = {
  todo: { emoji: "📋", style: "bg-slate-800 text-slate-400" },
  "in-progress": { emoji: "⏳", style: "bg-amber-500/20 text-amber-400" },
  done: { emoji: "✅", style: "bg-emerald-500/20 text-emerald-400" },
};

const priorityEmoji = { low: "🔵", medium: "🟡", high: "🔴" };

// Status click karte hi agle status pe cycle ho jaata hai: todo -> in-progress -> done -> todo
const nextStatus = { todo: "in-progress", "in-progress": "done", done: "todo" };

export default function TaskCard({ task, onUpdated, onDeleted }) {
  const s = statusStyles[task.status];

  async function handleStatusClick() {
    const newStatus = nextStatus[task.status];
    const res = await api.patch(`/tasks/${task._id}/status`, { status: newStatus });
    onUpdated(res.data.data);
  }

  async function handleDelete() {
    await api.delete(`/tasks/${task._id}`);
    onDeleted(task._id);
  }

  return (
    <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg p-3 hover:border-purple-500/50 transition group">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-200">{task.title}</p>
        <p className="text-xs text-slate-500 mt-1">
          📅 Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"} •{" "}
          {priorityEmoji[task.priority]} {task.priority} priority
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleStatusClick}
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.style} hover:opacity-80 transition`}
          title="Click to change status"
        >
          {s.emoji} {task.status}
        </button>
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition p-1"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}