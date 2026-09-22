import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/TaskCard";
import AddProjectModal from "../components/AddProjectModal";
import AddTaskModal from "../components/AddTaskModal";
import api from "../api/axios";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Component load hote hi real data fetch karo backend se
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [projectsRes, tasksRes] = await Promise.all([
        api.get("/projects"),
        api.get("/tasks"),
      ]);
      setProjects(projectsRes.data.data);
      setTasks(tasksRes.data.data);
    } catch (error) {
      console.error("Data fetch karne mein error:", error);
    } finally {
      setLoading(false);
    }
  }

  // Naya project bann jaane pe list mein add kar do (bina poora refetch kiye)
  function handleProjectCreated(newProject) {
    setProjects((prev) => [...prev, newProject]);
  }

  function handleTaskCreated(newTask) {
    setTasks((prev) => [...prev, newTask]);
  }

  function handleTaskUpdated(updatedTask) {
    setTasks((prev) => prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
  }

  function handleTaskDeleted(taskId) {
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
  }

  function handleProjectDeleted(projectId) {
    setProjects((prev) => prev.filter((p) => p._id !== projectId));
  }

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
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-slate-100">🚀 Your Projects</h2>
                <button
                  onClick={() => setShowProjectModal(true)}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium hover:opacity-90 transition"
                >
                  <Plus size={14} /> New Project
                </button>
              </div>
              {filteredProjects.length === 0 ? (
                <div className="bg-slate-900 border border-dashed border-slate-700 rounded-xl p-8 text-center text-slate-500 text-sm">
                  ✨ Yahan se shuru karo — pehla project banao!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProjects.map((p) => {
                    const projectTasks = tasks.filter((t) => t.projectId?._id === p._id || t.projectId === p._id);
                    const doneCount = projectTasks.filter((t) => t.status === "done").length;
                    return (
                      <ProjectCard
                        key={p._id}
                        project={p}
                        taskCount={projectTasks.length}
                        doneCount={doneCount}
                        onDeleted={handleProjectDeleted}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-slate-100">📝 Recent Tasks</h2>
                <button
                  onClick={() => setShowTaskModal(true)}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium hover:opacity-90 transition"
                >
                  <Plus size={14} /> New Task
                </button>
              </div>
              {filteredTasks.length === 0 ? (
                <div className="bg-slate-900 border border-dashed border-slate-700 rounded-xl p-8 text-center text-slate-500 text-sm">
                  ✨ Pehla task add karke shuru karo!
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredTasks.map((t) => (
                    <TaskCard key={t._id} task={t} onUpdated={handleTaskUpdated} onDeleted={handleTaskDeleted} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {showProjectModal && (
        <AddProjectModal onClose={() => setShowProjectModal(false)} onCreated={handleProjectCreated} />
      )}
      {showTaskModal && (
        <AddTaskModal projects={projects} onClose={() => setShowTaskModal(false)} onCreated={handleTaskCreated} />
      )}
    </div>
  );
}