'use client';

import { useEffect, useMemo, useState } from 'react';

type Priority = 'Low' | 'Medium' | 'High';
type Status = 'todo' | 'doing' | 'completed';
type Theme = 'light' | 'dark';

type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate: string;
  status: Status;
};

type VisibleFields = {
  task: boolean;
  priority: boolean;
  members: boolean;
  dueDate: boolean;
  actions: boolean;
};

const API_URL = 'http://localhost:4000/tasks';

/* =========================================================
   TASK SECTION
========================================================= */

function TaskSection({
  title,
  taskList,
  status,
  theme,
  visibleFields,
  onAddTask,
  onStatusChange,
  onDeleteTask,
}: {
  title: string;
  taskList: Task[];
  status: Status;
  theme: Theme;
  visibleFields: VisibleFields;
  onAddTask: (status: Status) => void;
  onStatusChange: (id: number, status: Status) => void;
  onDeleteTask: (id: number) => void;
}) {
  function nextAction(task: Task) {
    if (task.status === 'todo') {
      return 'Start';
    }

    if (task.status === 'doing') {
      return 'Complete';
    }

    return 'Undo';
  }

  function nextStatus(task: Task): Status {
    if (task.status === 'todo') {
      return 'doing';
    }

    if (task.status === 'doing') {
      return 'completed';
    }

    return 'todo';
  }

  const isDark = theme === 'dark';

  return (
    <section
      className={`mb-6 overflow-hidden rounded-xl border ${
        isDark
          ? 'border-slate-800 bg-slate-900'
          : 'border-slate-200 bg-white'
      }`}
    >
      {/* SECTION HEADER */}

      <div
        className={`flex items-center justify-between border-b px-4 py-3 ${
          isDark
            ? 'border-slate-800'
            : 'border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-xs ${
              isDark
                ? 'text-slate-500'
                : 'text-slate-500'
            }`}
          >
            ▾
          </span>

          <h2
            className={`text-sm font-semibold ${
              isDark
                ? 'text-white'
                : 'text-slate-800'
            }`}
          >
            {title}
          </h2>

          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
              isDark
                ? 'bg-slate-800 text-slate-300'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {taskList.length}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onAddTask(status)}
          className={`text-xs font-medium transition ${
            isDark
              ? 'text-slate-400 hover:text-white'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          + Add Task
        </button>
      </div>

      {/* TASK TABLE */}

      {taskList.length === 0 ? (
        <div
          className={`px-4 py-8 text-center text-sm ${
            isDark
              ? 'text-slate-500'
              : 'text-slate-400'
          }`}
        >
          No tasks
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr
                className={`border-b text-left text-xs font-semibold ${
                  isDark
                    ? 'border-slate-800 bg-slate-800 text-slate-400'
                    : 'border-slate-200 bg-slate-50 text-slate-500'
                }`}
              >
                {visibleFields.task && (
                  <th className="px-4 py-3">
                    Task
                  </th>
                )}

                {visibleFields.priority && (
                  <th className="px-4 py-3">
                    Priority
                  </th>
                )}

                {visibleFields.members && (
                  <th className="px-4 py-3">
                    Members
                  </th>
                )}

                {visibleFields.dueDate && (
                  <th className="px-4 py-3">
                    Due Date
                  </th>
                )}

                {visibleFields.actions && (
                  <th className="px-4 py-3 text-right">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {taskList.map((task) => (
                <tr
                  key={task.id}
                  className={
                    isDark
                      ? 'border-b border-slate-800 last:border-b-0 hover:bg-slate-800/70'
                      : 'border-b border-slate-100 last:border-b-0 hover:bg-slate-50'
                  }
                >
                  {/* TASK */}

                  {visibleFields.task && (
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            onStatusChange(
                              task.id,
                              task.completed
                                ? 'todo'
                                : 'completed',
                            )
                          }
                          aria-label={
                            task.completed
                              ? 'Mark task as pending'
                              : 'Mark task as completed'
                          }
                          className={
                            task.completed
                              ? 'flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs text-white'
                              : isDark
                                ? 'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-600 bg-slate-900 text-transparent'
                                : 'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-transparent'
                          }
                        >
                          ✓
                        </button>

                        <span
                          className={
                            task.completed
                              ? 'text-sm text-slate-400 line-through'
                              : isDark
                                ? 'text-sm font-medium text-slate-100'
                                : 'text-sm font-medium text-slate-800'
                          }
                        >
                          {task.title}
                        </span>
                      </div>
                    </td>
                  )}

                  {/* PRIORITY */}

                  {visibleFields.priority && (
                    <td className="px-4 py-4">
                      <span
                        className={
                          task.priority === 'High'
                            ? 'text-xs font-medium text-red-500'
                            : task.priority === 'Medium'
                              ? 'text-xs font-medium text-orange-500'
                              : 'text-xs font-medium text-slate-400'
                        }
                      >
                        {task.priority}
                      </span>
                    </td>
                  )}

                  {/* MEMBER */}

                  {visibleFields.members && (
                    <td className="px-4 py-4">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-xs font-bold text-white">
                        A
                      </div>
                    </td>
                  )}

                  {/* DATE */}

                  {visibleFields.dueDate && (
                    <td
                      className={`px-4 py-4 text-sm ${
                        isDark
                          ? 'text-slate-300'
                          : 'text-slate-600'
                      }`}
                    >
                      {task.dueDate || '—'}
                    </td>
                  )}

                  {/* ACTIONS */}

                  {visibleFields.actions && (
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onStatusChange(
                              task.id,
                              nextStatus(task),
                            )
                          }
                          className={
                            task.status === 'todo'
                              ? 'rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100'
                              : task.status === 'doing'
                                ? 'rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-100'
                                : isDark
                                  ? 'rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700'
                                  : 'rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200'
                          }
                        >
                          {nextAction(task)}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onDeleteTask(task.id)
                          }
                          className="rounded-lg px-2 py-1.5 text-xs font-medium text-red-400 hover:bg-red-50 hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Home() {
  /* =========================
     TASKS
  ========================= */

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     NAVIGATION
  ========================= */

  const [activePage, setActivePage] =
    useState<'tasks' | 'projects'>('tasks');

  /* =========================
     DROPDOWNS
  ========================= */

  const [showFields, setShowFields] =
    useState(false);

  const [showFilter, setShowFilter] =
    useState(false);

  const [showProfile, setShowProfile] =
    useState(false);

  /* =========================
     THEME
  ========================= */

  const [theme, setTheme] =
    useState<Theme>('light');

  const [themeLoaded, setThemeLoaded] =
    useState(false);

  /* =========================
     FILTER
  ========================= */

  const [filterPriority, setFilterPriority] =
    useState<'All' | Priority>('All');

  const [filterStatus, setFilterStatus] =
    useState<'All' | Status>('All');

  /* =========================
     VISIBLE FIELDS
  ========================= */

  const [visibleFields, setVisibleFields] =
    useState<VisibleFields>({
      task: true,
      priority: true,
      members: true,
      dueDate: true,
      actions: true,
    });

  /* =========================
     ADD TASK FORM
  ========================= */

  const [taskText, setTaskText] =
    useState('');

  const [priority, setPriority] =
    useState<Priority>('Medium');

  const [dueDate, setDueDate] =
    useState('');

  const [showAddForm, setShowAddForm] =
    useState(false);

  const [addStatus, setAddStatus] =
    useState<Status>('todo');

  /* =========================
     SEARCH
  ========================= */

  const [search, setSearch] =
    useState('');

  /* =========================================================
     THEME LOAD
  ========================================================= */

  useEffect(() => {
    const savedTheme =
      localStorage.getItem('theme');

    if (
      savedTheme === 'light' ||
      savedTheme === 'dark'
    ) {
      setTheme(savedTheme);
    }

    setThemeLoaded(true);
  }, []);

  /* =========================================================
     THEME SAVE
  ========================================================= */

  useEffect(() => {
    if (!themeLoaded) {
      return;
    }

    localStorage.setItem(
      'theme',
      theme,
    );

    document.documentElement.style.colorScheme =
      theme;
  }, [theme, themeLoaded]);

  /* =========================================================
     NORMALIZE TASK
  ========================================================= */

  function normalizeTask(task: any): Task {
    const status: Status =
      task?.status === 'todo' ||
      task?.status === 'doing' ||
      task?.status === 'completed'
        ? task.status
        : task?.completed === true
          ? 'completed'
          : 'todo';

    return {
      id: Number(task?.id),

      title:
        typeof task?.title === 'string'
          ? task.title
          : '',

      completed:
        status === 'completed',

      priority:
        task?.priority === 'Low' ||
        task?.priority === 'Medium' ||
        task?.priority === 'High'
          ? task.priority
          : 'Medium',

      dueDate:
        typeof task?.dueDate === 'string'
          ? task.dueDate
          : '',

      status,
    };
  }

  /* =========================================================
     LOAD TASKS
  ========================================================= */

  useEffect(() => {
    async function loadTasks() {
      try {
        const response =
          await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            'Failed to load tasks',
          );
        }

        const data =
          await response.json();

        const normalizedTasks =
          Array.isArray(data)
            ? data.map(normalizeTask)
            : [];

        setTasks(normalizedTasks);
      } catch (error) {
        console.error(
          'Failed to load tasks:',
          error,
        );
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  /* =========================================================
     OPEN ADD TASK FORM
  ========================================================= */

  function openAddTaskForm(
    status: Status,
  ) {
    setAddStatus(status);
    setTaskText('');
    setPriority('Medium');
    setDueDate('');
    setShowAddForm(true);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 50);
  }

  /* =========================================================
     ADD TASK
  ========================================================= */

  async function addTask() {
    const cleanTitle =
      taskText.trim();

    if (!cleanTitle) {
      return;
    }

    try {
      const response =
        await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            title: cleanTitle,
            status: addStatus,
            completed:
              addStatus === 'completed',
            priority,
            dueDate,
          }),
        });

      if (!response.ok) {
        const errorText =
          await response.text();

        console.error(
          'Backend error:',
          errorText,
        );

        throw new Error(
          'Failed to create task',
        );
      }

      const data =
        await response.json();

      const newTask =
        normalizeTask(data);

      setTasks((currentTasks) => [
        newTask,
        ...currentTasks,
      ]);

      setTaskText('');
      setPriority('Medium');
      setDueDate('');
      setShowAddForm(false);
    } catch (error) {
      console.error(
        'Failed to add task:',
        error,
      );

      alert(
        'Unable to add task. Please make sure the backend is running.',
      );
    }
  }

  /* =========================================================
     CHANGE TASK STATUS
  ========================================================= */

  async function changeTaskStatus(
    id: number,
    newStatus: Status,
  ) {
    const existingTask =
      tasks.find(
        (task) => task.id === id,
      );

    if (!existingTask) {
      return;
    }

    try {
      const response =
        await fetch(
          `${API_URL}/${id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              status: newStatus,
              completed:
                newStatus === 'completed',
            }),
          },
        );

      if (!response.ok) {
        throw new Error(
          'Failed to update task',
        );
      }

      const data =
        await response.json();

      const updatedTask: Task =
        normalizeTask({
          ...existingTask,
          ...data,
          id: existingTask.id,
          title:
            typeof data?.title ===
            'string'
              ? data.title
              : existingTask.title,
          priority:
            data?.priority ??
            existingTask.priority,
          dueDate:
            typeof data?.dueDate ===
            'string'
              ? data.dueDate
              : existingTask.dueDate,
          status: newStatus,
          completed:
            newStatus === 'completed',
        });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id
            ? updatedTask
            : task,
        ),
      );
    } catch (error) {
      console.error(
        'Failed to change task status:',
        error,
      );

      alert(
        'Unable to update task.',
      );
    }
  }

  /* =========================================================
     DELETE TASK
  ========================================================= */

  async function deleteTask(id: number) {
    try {
      const response =
        await fetch(
          `${API_URL}/${id}`,
          {
            method: 'DELETE',
          },
        );

      if (!response.ok) {
        throw new Error(
          'Failed to delete task',
        );
      }

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) =>
            task.id !== id,
        ),
      );
    } catch (error) {
      console.error(
        'Failed to delete task:',
        error,
      );

      alert(
        'Unable to delete task.',
      );
    }
  }

  /* =========================================================
     FILTER + SEARCH
  ========================================================= */

  const filteredTasks =
    useMemo(() => {
      const keyword =
        search.trim().toLowerCase();

      return tasks.filter((task) => {
        const matchesSearch =
          !keyword ||
          task.title
            .toLowerCase()
            .includes(keyword);

        const matchesPriority =
          filterPriority === 'All' ||
          task.priority ===
            filterPriority;

        const matchesStatus =
          filterStatus === 'All' ||
          task.status ===
            filterStatus;

        return (
          matchesSearch &&
          matchesPriority &&
          matchesStatus
        );
      });
    }, [
      tasks,
      search,
      filterPriority,
      filterStatus,
    ]);

  /* =========================================================
     STATUS GROUPS
  ========================================================= */

  const todoTasks =
    filteredTasks.filter(
      (task) =>
        task.status === 'todo',
    );

  const doingTasks =
    filteredTasks.filter(
      (task) =>
        task.status === 'doing',
    );

  const completedTasks =
    filteredTasks.filter(
      (task) =>
        task.status === 'completed',
    );

  /* =========================================================
     THEME STYLES
  ========================================================= */

  const isDark = theme === 'dark';

  const pageClass =
    isDark
      ? 'min-h-screen bg-[#111111] text-white'
      : 'min-h-screen bg-white text-slate-900';

  const sidebarClass =
    isDark
      ? 'hidden w-[230px] shrink-0 border-r border-[#2a2a2a] bg-[#111111] md:block'
      : 'hidden w-[230px] shrink-0 border-r border-slate-200 bg-white md:block';

  const headerClass =
    isDark
      ? 'flex h-16 items-center justify-between border-b border-[#2a2a2a] bg-[#111111] px-4 sm:px-6 lg:px-8'
      : 'flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8';

  const cardClass =
    isDark
      ? 'border border-[#2a2a2a] bg-[#181818]'
      : 'border border-slate-200 bg-white';

  return (
    <main className={pageClass}>
      <div className="flex min-h-screen">

        {/* ===================================================
            SIDEBAR
        =================================================== */}

        <aside className={sidebarClass}>

          {/* BRAND / PROFILE */}

          <div
            className={`relative border-b ${
              isDark
                ? 'border-[#2a2a2a]'
                : 'border-slate-100'
            }`}
          >
            <button
              type="button"
              onClick={() =>
                setShowProfile(
                  !showProfile,
                )
              }
              className={`flex h-16 w-full items-center gap-3 px-5 text-left transition ${
                isDark
                  ? 'hover:bg-[#1c1c1c]'
                  : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-xs font-bold text-white">
                A
              </div>

              <div className="min-w-0">
                <p
                  className={`truncate text-sm font-semibold ${
                    isDark
                      ? 'text-white'
                      : 'text-slate-800'
                  }`}
                >
                  ADHIZZ
                </p>

                <p className="text-xs text-slate-400">
                  Guest Account
                </p>
              </div>

              <span className="ml-auto text-xs text-slate-500">
                {showProfile
                  ? '⌃'
                  : '⌄'}
              </span>
            </button>

            {showProfile && (
              <div
                className={`absolute left-4 right-4 top-[68px] z-30 rounded-xl p-3 shadow-lg ${
                  isDark
                    ? 'border border-[#333333] bg-[#1b1b1b]'
                    : 'border border-slate-200 bg-white'
                }`}
              >
                <div
                  className={`mb-3 flex items-center gap-3 border-b pb-3 ${
                    isDark
                      ? 'border-[#2a2a2a]'
                      : 'border-slate-100'
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-bold text-white">
                    A
                  </div>

                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        isDark
                          ? 'text-white'
                          : 'text-slate-800'
                      }`}
                    >
                      ADHIZZ
                    </p>

                    <p className="text-xs text-slate-400">
                      Guest Account
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowProfile(false)
                  }
                  className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium ${
                    isDark
                      ? 'text-slate-300 hover:bg-slate-800'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Profile
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowProfile(false)
                  }
                  className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium ${
                    isDark
                      ? 'text-slate-300 hover:bg-slate-800'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Settings
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowProfile(false)
                  }
                  className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* WORKSPACE */}

          <div className="px-4 pt-6">

            <div className="mb-3 flex items-center justify-between">
              <span
                className={`text-xs font-semibold ${
                  isDark
                    ? 'text-slate-400'
                    : 'text-slate-500'
                }`}
              >
                Workspace
              </span>

              <span className="text-xs text-slate-400">
                ˅
              </span>
            </div>

            <nav className="space-y-1">

              {/* TASKS */}

              <button
                type="button"
                onClick={() =>
                  setActivePage('tasks')
                }
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  activePage === 'tasks'
                    ? isDark
                      ? 'bg-slate-800 font-medium text-white'
                      : 'bg-slate-100 font-medium text-slate-800'
                    : isDark
                      ? 'text-slate-400 hover:bg-slate-800'
                      : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>▦</span>
                Tasks
              </button>

              {/* PROJECTS */}

              <button
                type="button"
                onClick={() =>
                  setActivePage(
                    'projects',
                  )
                }
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  activePage ===
                  'projects'
                    ? isDark
                      ? 'bg-slate-800 font-medium text-white'
                      : 'bg-slate-100 font-medium text-slate-800'
                    : isDark
                      ? 'text-slate-400 hover:bg-slate-800'
                      : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>▱</span>
                Projects
              </button>

            </nav>
          </div>
        </aside>

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <div className="min-w-0 flex-1">

          {/* TOP BAR */}

          <header className={headerClass}>

            {/* MOBILE BRAND */}

            <div className="flex items-center gap-2 md:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-xs font-bold text-white">
                D
              </div>

              <span
                className={`text-sm font-semibold ${
                  isDark
                    ? 'text-white'
                    : 'text-slate-800'
                }`}
              >
                Dexter
              </span>
            </div>

            {/* BREADCRUMB */}

            <div
              className={`hidden items-center gap-2 text-xs md:flex ${
                isDark
                  ? 'text-slate-500'
                  : 'text-slate-400'
              }`}
            >
              {activePage ===
              'tasks' ? (
                <>
                  <span>
                    Projects
                  </span>

                  <span>›</span>

                  <span
                    className={
                      isDark
                        ? 'font-medium text-slate-300'
                        : 'font-medium text-slate-600'
                    }
                  >
                    Design Homepage
                  </span>
                </>
              ) : (
                <span
                  className={
                    isDark
                      ? 'font-medium text-slate-300'
                      : 'font-medium text-slate-600'
                  }
                >
                  Projects
                </span>
              )}
            </div>

            {/* USER + THEME */}

            <div className="ml-auto flex items-center gap-3">

              <button
                type="button"
                onClick={() =>
                  setTheme(
                    (currentTheme) =>
                      currentTheme ===
                      'light'
                        ? 'dark'
                        : 'light',
                  )
                }
                className={
                  isDark
                    ? 'rounded-lg border border-[#333333] bg-[#1f1f1f] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#2a2a2a]'
                    : 'rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50'
                }
              >
                {theme === 'light'
                  ? '☾ Dark'
                  : '☀ Light'}
              </button>

              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                  isDark
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                A
              </div>
            </div>
          </header>

          {/* CONTENT */}

          <div className="p-4 sm:p-6 lg:p-8">

            {activePage ===
            'tasks' ? (
              <>

                {/* TASK PAGE HEADER */}

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <h1
                    className={`text-xl font-semibold ${
                      isDark
                        ? 'text-white'
                        : 'text-slate-900'
                    }`}
                  >
                    Tasks
                  </h1>

                  <div className="flex flex-wrap items-center gap-2">

                    {/* SEARCH */}

                    <input
                      type="text"
                      value={search}
                      onChange={(e) =>
                        setSearch(
                          e.target.value,
                        )
                      }
                      placeholder="Search"
                      className={
                        isDark
                          ? 'w-36 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-500 focus:border-slate-500 sm:w-44'
                          : 'w-36 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 sm:w-44'
                      }
                    />

                    {/* FIELDS */}

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowFields(
                            !showFields,
                          )
                        }
                        className={
                          isDark
                            ? 'rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800'
                            : 'rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50'
                        }
                      >
                        ▤ Fields
                      </button>

                      {showFields && (
                        <div
                          className={
                            isDark
                              ? 'absolute right-0 z-20 mt-2 w-48 rounded-lg border border-slate-700 bg-slate-900 p-3 shadow-lg'
                              : 'absolute right-0 z-20 mt-2 w-48 rounded-lg border border-slate-200 bg-white p-3 shadow-lg'
                          }
                        >
                          <p
                            className={`mb-2 text-xs font-semibold ${
                              isDark
                                ? 'text-white'
                                : 'text-slate-700'
                            }`}
                          >
                            Fields
                          </p>

                          {(
                            [
                              [
                                'task',
                                'Task',
                              ],
                              [
                                'priority',
                                'Priority',
                              ],
                              [
                                'members',
                                'Members',
                              ],
                              [
                                'dueDate',
                                'Due Date',
                              ],
                              [
                                'actions',
                                'Actions',
                              ],
                            ] as const
                          ).map(
                            ([
                              key,
                              label,
                            ]) => (
                              <label
                                key={
                                  key
                                }
                                className={`flex items-center gap-2 py-1.5 text-xs ${
                                  isDark
                                    ? 'text-slate-300'
                                    : 'text-slate-600'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    visibleFields[
                                      key
                                    ]
                                  }
                                  onChange={(
                                    e,
                                  ) =>
                                    setVisibleFields(
                                      (
                                        current,
                                      ) => ({
                                        ...current,
                                        [key]:
                                          e
                                            .target
                                            .checked,
                                      }),
                                    )
                                  }
                                />
                                {label}
                              </label>
                            ),
                          )}
                        </div>
                      )}
                    </div>

                    {/* FILTER */}

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowFilter(
                            !showFilter,
                          )
                        }
                        className={
                          isDark
                            ? 'rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800'
                            : 'rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50'
                        }
                      >
                        ⚱ Filter
                      </button>

                      {showFilter && (
                        <div
                          className={
                            isDark
                              ? 'absolute right-0 z-20 mt-2 w-56 rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-lg'
                              : 'absolute right-0 z-20 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-4 shadow-lg'
                          }
                        >
                          <div className="mb-4">
                            <label
                              className={`mb-2 block text-xs font-semibold ${
                                isDark
                                  ? 'text-white'
                                  : 'text-slate-700'
                              }`}
                            >
                              Status
                            </label>

                            <select
                              value={
                                filterStatus
                              }
                              onChange={(
                                e,
                              ) =>
                                setFilterStatus(
                                  e
                                    .target
                                    .value as
                                    | 'All'
                                    | Status,
                                )
                              }
                              className={
                                isDark
                                  ? 'w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white outline-none'
                                  : 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none'
                              }
                            >
                              <option value="All">
                                All
                              </option>
                              <option value="todo">
                                To Do
                              </option>
                              <option value="doing">
                                Doing
                              </option>
                              <option value="completed">
                                Completed
                              </option>
                            </select>
                          </div>

                          <div className="mb-4">
                            <label
                              className={`mb-2 block text-xs font-semibold ${
                                isDark
                                  ? 'text-white'
                                  : 'text-slate-700'
                              }`}
                            >
                              Priority
                            </label>

                            <select
                              value={
                                filterPriority
                              }
                              onChange={(
                                e,
                              ) =>
                                setFilterPriority(
                                  e
                                    .target
                                    .value as
                                    | 'All'
                                    | Priority,
                                )
                              }
                              className={
                                isDark
                                  ? 'w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white outline-none'
                                  : 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none'
                              }
                            >
                              <option value="All">
                                All
                              </option>
                              <option value="Low">
                                Low
                              </option>
                              <option value="Medium">
                                Medium
                              </option>
                              <option value="High">
                                High
                              </option>
                            </select>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setFilterStatus(
                                'All',
                              );
                              setFilterPriority(
                                'All',
                              );
                            }}
                            className={
                              isDark
                                ? 'w-full rounded-lg bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700'
                                : 'w-full rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200'
                            }
                          >
                            Clear Filters
                          </button>
                        </div>
                      )}
                    </div>

                    {/* GLOBAL ADD */}

                    <button
                      type="button"
                      onClick={() =>
                        openAddTaskForm(
                          'todo',
                        )
                      }
                      className={
                        isDark
                          ? 'rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-slate-200'
                          : 'rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800'
                      }
                    >
                      ＋ Add Task
                    </button>
                  </div>
                </div>

                {/* ADD TASK FORM */}

                {showAddForm && (
                  <section
                    className={`mb-6 rounded-xl p-5 shadow-sm ${cardClass}`}
                  >
                    <div className="mb-4 flex items-center justify-between">

                      <div>
                        <h2
                          className={`text-sm font-semibold ${
                            isDark
                              ? 'text-white'
                              : 'text-slate-800'
                          }`}
                        >
                          Add Task
                        </h2>

                        <p className="mt-1 text-xs text-slate-400">
                          Adding to{' '}
                          <span
                            className={`font-semibold ${
                              isDark
                                ? 'text-slate-200'
                                : 'text-slate-600'
                            }`}
                          >
                            {addStatus ===
                            'todo'
                              ? 'To Do'
                              : addStatus ===
                                  'doing'
                                ? 'Doing'
                                : 'Completed'}
                          </span>
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setShowAddForm(
                            false,
                          )
                        }
                        className={
                          isDark
                            ? 'text-sm text-slate-500 hover:text-white'
                            : 'text-sm text-slate-400 hover:text-slate-700'
                        }
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid gap-3 md:grid-cols-[1fr_160px_170px_auto]">

                      <input
                        type="text"
                        value={taskText}
                        onChange={(e) =>
                          setTaskText(
                            e.target.value,
                          )
                        }
                        onKeyDown={(e) => {
                          if (
                            e.key ===
                            'Enter'
                          ) {
                            addTask();
                          }
                        }}
                        placeholder="Enter task title"
                        className={
                          isDark
                            ? 'rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-slate-500'
                            : 'rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-blue-400'
                        }
                      />

                      <select
                        value={priority}
                        onChange={(e) =>
                          setPriority(
                            e.target.value as Priority,
                          )
                        }
                        className={
                          isDark
                            ? 'rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none'
                            : 'rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none'
                        }
                      >
                        <option value="Low">
                          Low
                        </option>
                        <option value="Medium">
                          Medium
                        </option>
                        <option value="High">
                          High
                        </option>
                      </select>

                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) =>
                          setDueDate(
                            e.target.value,
                          )
                        }
                        className={
                          isDark
                            ? 'rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none'
                            : 'rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none'
                        }
                      />

                      <button
                        type="button"
                        onClick={addTask}
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                  </section>
                )}

                {/* TASK SECTIONS */}

                {loading ? (
                  <div
                    className={`rounded-xl border px-6 py-16 text-center text-sm ${
                      isDark
                        ? 'border-slate-800 bg-slate-900 text-slate-400'
                        : 'border-slate-200 bg-white text-slate-500'
                    }`}
                  >
                    Loading tasks...
                  </div>
                ) : (
                  <div className="space-y-6">

                    <TaskSection
                      title="To Do"
                      taskList={todoTasks}
                      status="todo"
                      theme={theme}
                      visibleFields={
                        visibleFields
                      }
                      onAddTask={
                        openAddTaskForm
                      }
                      onStatusChange={
                        changeTaskStatus
                      }
                      onDeleteTask={
                        deleteTask
                      }
                    />

                    <TaskSection
                      title="Doing"
                      taskList={doingTasks}
                      status="doing"
                      theme={theme}
                      visibleFields={
                        visibleFields
                      }
                      onAddTask={
                        openAddTaskForm
                      }
                      onStatusChange={
                        changeTaskStatus
                      }
                      onDeleteTask={
                        deleteTask
                      }
                    />

                    <TaskSection
                      title="Completed"
                      taskList={
                        completedTasks
                      }
                      status="completed"
                      theme={theme}
                      visibleFields={
                        visibleFields
                      }
                      onAddTask={
                        openAddTaskForm
                      }
                      onStatusChange={
                        changeTaskStatus
                      }
                      onDeleteTask={
                        deleteTask
                      }
                    />
                  </div>
                )}
              </>
            ) : (
              /* PROJECTS PAGE */

              <section
                className={`rounded-xl p-6 ${cardClass}`}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h1
                      className={`text-xl font-semibold ${
                        isDark
                          ? 'text-white'
                          : 'text-slate-900'
                      }`}
                    >
                      Projects
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                      Manage your workspace projects.
                    </p>
                  </div>

                  <button
                    type="button"
                    className={
                      isDark
                        ? 'rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-slate-200'
                        : 'rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800'
                    }
                  >
                    ＋ New Project
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  <div
                    className={`rounded-xl border p-5 hover:shadow-sm ${
                      isDark
                        ? 'border-slate-800 bg-slate-900'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      ◫
                    </div>

                    <h2
                      className={`text-sm font-semibold ${
                        isDark
                          ? 'text-white'
                          : 'text-slate-800'
                      }`}
                    >
                      Design Homepage
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Website design and UI tasks
                    </p>

                    <div className="mt-4 text-xs text-slate-400">
                      Project workspace
                    </div>
                  </div>

                  <div
                    className={`rounded-xl border p-5 hover:shadow-sm ${
                      isDark
                        ? 'border-slate-800 bg-slate-900'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                      ◫
                    </div>

                    <h2
                      className={`text-sm font-semibold ${
                        isDark
                          ? 'text-white'
                          : 'text-slate-800'
                      }`}
                    >
                      Development
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Frontend and backend development
                    </p>

                    <div className="mt-4 text-xs text-slate-400">
                      Project workspace
                    </div>
                  </div>

                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}