import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/TaskCard";

const dummyProjects = [
  { id: 1, title: "TaskFlow AI", description: "AI-powered project management platform", status: "active", completedTasks: 6, totalTasks: 10 },
  { id: 2, title: "ClinikX Update", description: "Clinic management system v2 improvements", status: "active", completedTasks: 3, totalTasks: 8 },
  { id: 3, title: "Portfolio Site", description: "Personal portfolio revamp with new projects", status: "planning", completedTasks: 1, totalTasks: 5 },
];

const dummyTasks = [
  { id: 1, title: "Design dashboard wireframe", status: "done", priority: "high", dueDate: "20 Aug" },
  { id: 2, title: "Setup Express backend routes", status: "in-progress", priority: "high", dueDate: "24 Aug" },
  { id: 3, title: "Integrate MongoDB models", status: "in-progress", priority: "medium", dueDate: "26 Aug" },
  { id: 4, title: "Add AI task suggestion feature", status: "todo", priority: "high", dueDate: "30 Aug" },
  { id: 5, title: "Write README documentation", status: "todo", priority: "low", dueDate: "1 Sep" },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(dummyProjects);
      setTasks(dummyTasks);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Total Projects", value: projects.length, emoji: "📁", gradient: "bg-gradient-to-br from-purple-500 to-purple-400" },
    { label: "Tasks Done", value: tasks.filter((t) => t.status === "done").length, emoji: "✅", gradient: "bg-gradient-to-br from-emerald-500 to-emerald-400" },
    { label: "In Progress", value: tasks.filter((t) => t.status === "in-progress").length, emoji: "⏳", gradient: "bg-gradient-to-br from-amber-500 to-amber-400" },
    { label: "To Do", value: tasks.filter((t) => t.status === "todo").length, emoji: "📋", gradient: "bg-gradient-to-br from-pink-500 to-pink-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-purple-400 text-sm">✨ Loading dashboard...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-base font-semibold text-slate-100 mb-3">🚀 Your Projects</h2>
              {filteredProjects.length === 0 ? (
                <div className="bg-slate-900 border border-dashed border-slate-700 rounded-xl p-8 text-center text-slate-500 text-sm">
                  😕 Koi project nahi mila. Search term change karke try karo.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProjects.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-100 mb-3">📝 Recent Tasks</h2>
              {filteredTasks.length === 0 ? (
                <div className="bg-slate-900 border border-dashed border-slate-700 rounded-xl p-8 text-center text-slate-500 text-sm">
                  😕 Koi task nahi mila.
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredTasks.map((t) => (
                    <TaskCard key={t.id} task={t} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
