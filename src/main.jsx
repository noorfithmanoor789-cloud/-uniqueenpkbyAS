import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BookOpenCheck,
  CheckCircle2,
  ChevronLeft,
  Download,
  FileClock,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  Upload,
  UserRound,
  Users,
} from "lucide-react";
import "./styles.css";

const API_BASE = "/api";
const STORAGE_KEY = "cnfn_session";

const blankQuestion = (index = 0) => ({
  id: `q${index + 1}`,
  prompt: "",
  options: ["", "", "", ""],
  correctOption: 0,
  marks: 1,
});

const todayInput = (offsetHours = 0) => {
  const date = new Date(Date.now() + offsetHours * 60 * 60 * 1000);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
};

function getInitialSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

async function api(path, options = {}, token) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatDuration(seconds) {
  const safe = Math.max(0, Number(seconds || 0));
  const minutes = Math.floor(safe / 60);
  const remaining = safe % 60;
  return `${minutes}:${String(remaining).padStart(2, "0")}`;
}

function LogoMark() {
  return (
    <div className="logo-wrap" aria-label="College of Nursing Female Nawabshah logo">
      <div className="logo-ring">
        <GraduationCap size={34} />
        <span className="logo-cross">+</span>
      </div>
    </div>
  );
}

function BrandHeader({ compact = false }) {
  return (
    <div className={compact ? "brand brand-compact" : "brand"}>
      <LogoMark />
      <div>
        <p className="eyebrow">Nawabshah</p>
        <h1>College of Nursing Female Nawabshah</h1>
        <p>Online Examination Portal</p>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  return <span className={`status status-${status || "old"}`}>{status || "old"}</span>;
}

function App() {
  const [route, setRoute] = useState(location.hash.replace("#", "") || "home");
  const [session, setSession] = useState(getInitialSession);

  useEffect(() => {
    const onHash = () => setRoute(location.hash.replace("#", "") || "home");
    addEventListener("hashchange", onHash);
    return () => removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (next) => {
    location.hash = next;
    setRoute(next);
  };

  const saveSession = (next) => {
    setSession(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem(STORAGE_KEY);
    navigate("home");
  };

  if (route === "admin-login") {
    return <LoginPage role="admin" onLogin={saveSession} navigate={navigate} />;
  }

  if (route === "student-login") {
    return <LoginPage role="student" onLogin={saveSession} navigate={navigate} />;
  }

  if (route === "admin") {
    if (session?.user?.role !== "admin") return <LoginPage role="admin" onLogin={saveSession} navigate={navigate} />;
    return <AdminDashboard session={session} logout={logout} />;
  }

  if (route === "student") {
    if (session?.user?.role !== "student") {
      return <LoginPage role="student" onLogin={saveSession} navigate={navigate} />;
    }
    return <StudentPortal session={session} logout={logout} />;
  }

  return <Home navigate={navigate} />;
}

function Home({ navigate }) {
  return (
    <main className="portal-shell">
      <section className="hero-panel">
        <BrandHeader />
        <div className="portal-card">
          <h2>Examination Portal</h2>
          <p className="muted">
            Secure access for students and college administration.
          </p>
          <div className="portal-actions">
            <button className="primary action-button" onClick={() => navigate("student-login")}>
              <UserRound size={19} />
              Student Login
            </button>
            <button className="secondary action-button" onClick={() => navigate("admin-login")}>
              <ShieldCheck size={19} />
              Admin Login
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function LoginPage({ role, onLogin, navigate }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isAdmin = role === "admin";

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ ...form, role }),
      });
      onLogin(data);
      navigate(isAdmin ? "admin" : "student");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="portal-shell">
      <section className="login-grid">
        <BrandHeader />
        <form className="login-card" onSubmit={submit}>
          <button type="button" className="link-button" onClick={() => navigate("home")}>
            <ChevronLeft size={17} />
            Back
          </button>
          <h2>{isAdmin ? "Admin Login" : "Student Login"}</h2>
          <label>
            Username
            <input
              value={form.username}
              onChange={(event) => setForm({ ...form, username: event.target.value })}
              autoComplete="username"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              autoComplete="current-password"
              required
            />
          </label>
          {error && <div className="alert">{error}</div>}
          <button className="primary full" disabled={busy}>
            {busy ? "Checking..." : "Login"}
          </button>
          {!isAdmin && <p className="hint">Use the student ID and password issued by admin.</p>}
          {isAdmin && <p className="hint">Use the admin credentials configured on Netlify.</p>}
        </form>
      </section>
    </main>
  );
}

function AppTopbar({ title, session, logout }) {
  return (
    <header className="topbar">
      <BrandHeader compact />
      <div className="topbar-right">
        <span>{session.user.name || session.user.username}</span>
        <button className="icon-button" onClick={logout} title="Logout" aria-label="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}

function AdminDashboard({ session, logout }) {
  const [activeTab, setActiveTab] = useState("active");
  const [tests, setTests] = useState([]);
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    setLoading(true);
    setError("");
    try {
      const [testData, studentData, resultData] = await Promise.all([
        api("/admin/tests", {}, session.token),
        api("/admin/students", {}, session.token),
        api("/admin/results", {}, session.token),
      ]);
      setTests(testData.tests);
      setStudents(studentData.students);
      setResults(resultData.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const tabs = [
    ["active", LayoutDashboard, "Active Test"],
    ["upload", Upload, "Upload New Test"],
    ["old", FileClock, "Old Tests"],
    ["results", BookOpenCheck, "Results"],
    ["students", Users, "Students"],
  ];

  return (
    <div className="app-frame">
      <AppTopbar title="Admin Dashboard" session={session} logout={logout} />
      <div className="dashboard">
        <nav className="tabs" aria-label="Admin dashboard">
          {tabs.map(([key, Icon, label]) => (
            <button
              key={key}
              className={activeTab === key ? "active" : ""}
              onClick={() => setActiveTab(key)}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
        <section className="workspace">
          {error && <div className="alert">{error}</div>}
          {loading ? (
            <div className="empty">Loading dashboard...</div>
          ) : (
            <>
              {activeTab === "active" && <ActiveTest tests={tests} />}
              {activeTab === "upload" && (
                <UploadTest session={session} onUploaded={loadAll} students={students} />
              )}
              {activeTab === "old" && <OldTests tests={tests} results={results} />}
              {activeTab === "results" && <ResultsTable results={results} tests={tests} />}
              {activeTab === "students" && (
                <StudentsManager session={session} students={students} onChanged={loadAll} />
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function ActiveTest({ tests }) {
  const current = tests.filter((test) => ["active", "scheduled"].includes(test.status));
  if (!current.length) return <div className="empty">No active or scheduled test is published.</div>;
  return (
    <div className="stack">
      {current.map((test) => (
        <article className="panel" key={test.id}>
          <div className="panel-title">
            <div>
              <h2>{test.title}</h2>
              <p>{test.instructions || "No instructions added."}</p>
            </div>
            <StatusPill status={test.status} />
          </div>
          <div className="metrics">
            <span>{test.questions.length} questions</span>
            <span>{test.durationMinutes} minutes</span>
            <span>Starts {formatDate(test.startAt)}</span>
            <span>Ends {formatDate(test.endAt)}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

function UploadTest({ session, onUploaded, students }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: "",
    instructions: "",
    durationMinutes: 30,
    startAt: todayInput(),
    endAt: todayInput(48),
    active: true,
    allowMultipleActive: false,
    assignedStudentIds: [],
    questions: [blankQuestion(0)],
  });

  const setQuestion = (index, patch) => {
    const questions = form.questions.map((question, questionIndex) =>
      questionIndex === index ? { ...question, ...patch } : question
    );
    setForm({ ...form, questions });
  };

  const setOption = (questionIndex, optionIndex, value) => {
    const question = form.questions[questionIndex];
    const options = question.options.map((option, index) => (index === optionIndex ? value : option));
    setQuestion(questionIndex, { options });
  };

  const loadTwentyFive = () => {
    setForm({
      ...form,
      questions: Array.from({ length: 25 }, (_, index) => blankQuestion(index)),
    });
  };

  const importJson = (value) => {
    try {
      const parsed = JSON.parse(value);
      setForm({
        ...form,
        ...parsed,
        questions: parsed.questions || form.questions,
      });
      setError("");
    } catch {
      setError("Invalid JSON file or text");
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await api("/admin/tests", {
        method: "POST",
        body: JSON.stringify(form),
      }, session.token);
      setMessage("Test published. Previous active test moved to Old Tests.");
      setForm({
        title: "",
        instructions: "",
        durationMinutes: 30,
        startAt: todayInput(),
        endAt: todayInput(48),
        active: true,
        allowMultipleActive: false,
        assignedStudentIds: [],
        questions: [blankQuestion(0)],
      });
      onUploaded();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="panel form-panel" onSubmit={submit}>
      <div className="panel-title">
        <div>
          <h2>Upload New Test</h2>
          <p>Publishing a new active test archives the current active test automatically.</p>
        </div>
      </div>
      <div className="form-grid">
        <label>
          Test title
          <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
        </label>
        <label>
          Duration minutes
          <input
            type="number"
            min="1"
            value={form.durationMinutes}
            onChange={(event) => setForm({ ...form, durationMinutes: Number(event.target.value) })}
            required
          />
        </label>
        <label>
          Start date/time
          <input
            type="datetime-local"
            value={form.startAt}
            onChange={(event) => setForm({ ...form, startAt: event.target.value })}
            required
          />
        </label>
        <label>
          End date/time
          <input
            type="datetime-local"
            value={form.endAt}
            onChange={(event) => setForm({ ...form, endAt: event.target.value })}
            required
          />
        </label>
      </div>
      <label>
        Instructions
        <textarea
          rows="3"
          value={form.instructions}
          onChange={(event) => setForm({ ...form, instructions: event.target.value })}
        />
      </label>
      <div className="check-row">
        <label>
          <input
            type="checkbox"
            checked={form.active}
            onChange={(event) => setForm({ ...form, active: event.target.checked })}
          />
          Publish as active
        </label>
        <label>
          <input
            type="checkbox"
            checked={form.allowMultipleActive}
            onChange={(event) => setForm({ ...form, allowMultipleActive: event.target.checked })}
          />
          Allow multiple active tests
        </label>
      </div>
      <label>
        Assign to selected students
        <select
          multiple
          value={form.assignedStudentIds}
          onChange={(event) =>
            setForm({
              ...form,
              assignedStudentIds: Array.from(event.target.selectedOptions).map((option) => option.value),
            })
          }
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name} ({student.username})
            </option>
          ))}
        </select>
        <span className="hint">Leave empty to assign the test to all students.</span>
      </label>
      <div className="question-toolbar">
        <button type="button" className="secondary" onClick={loadTwentyFive}>
          <Plus size={17} />
          25 Question Template
        </button>
        <label className="file-button">
          <Upload size={17} />
          Import JSON
          <input
            type="file"
            accept="application/json"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              file.text().then(importJson);
            }}
          />
        </label>
      </div>
      <div className="stack">
        {form.questions.map((question, questionIndex) => (
          <div className="question-editor" key={`${question.id}-${questionIndex}`}>
            <div className="question-head">
              <h3>Question {questionIndex + 1}</h3>
              <button
                type="button"
                className="icon-button danger"
                onClick={() =>
                  setForm({
                    ...form,
                    questions: form.questions.filter((_, index) => index !== questionIndex),
                  })
                }
                disabled={form.questions.length === 1}
                title="Remove question"
                aria-label="Remove question"
              >
                <Trash2 size={17} />
              </button>
            </div>
            <label>
              Prompt
              <textarea
                rows="2"
                value={question.prompt}
                onChange={(event) => setQuestion(questionIndex, { prompt: event.target.value })}
                required
              />
            </label>
            <div className="options-grid">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex}>
                  Option {optionIndex + 1}
                  <input
                    value={option}
                    onChange={(event) => setOption(questionIndex, optionIndex, event.target.value)}
                    required
                  />
                </label>
              ))}
            </div>
            <label>
              Correct answer
              <select
                value={question.correctOption}
                onChange={(event) => setQuestion(questionIndex, { correctOption: Number(event.target.value) })}
              >
                <option value={0}>Option 1</option>
                <option value={1}>Option 2</option>
                <option value={2}>Option 3</option>
                <option value={3}>Option 4</option>
              </select>
            </label>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="secondary"
        onClick={() =>
          setForm({
            ...form,
            questions: [...form.questions, blankQuestion(form.questions.length)],
          })
        }
      >
        <Plus size={17} />
        Add Question
      </button>
      {error && <div className="alert">{error}</div>}
      {message && <div className="success">{message}</div>}
      <button className="primary full" disabled={busy}>
        {busy ? "Publishing..." : "Publish Test"}
      </button>
    </form>
  );
}

function OldTests({ tests, results }) {
  const [selectedId, setSelectedId] = useState("");
  const oldTests = tests.filter((test) => !["active", "scheduled"].includes(test.status));
  const selected = oldTests.find((test) => test.id === selectedId) || oldTests[0];
  const testResults = results.filter((result) => result.testId === selected?.id);

  if (!oldTests.length) return <div className="empty">No old tests yet.</div>;

  return (
    <div className="split">
      <div className="panel">
        <h2>Old Tests</h2>
        <div className="list">
          {oldTests.map((test) => (
            <button
              key={test.id}
              className={selected?.id === test.id ? "list-item selected" : "list-item"}
              onClick={() => setSelectedId(test.id)}
            >
              <strong>{test.title}</strong>
              <span>{test.questions.length} questions · {test.durationMinutes} minutes</span>
              <StatusPill status={test.status} />
            </button>
          ))}
        </div>
      </div>
      {selected && (
        <div className="panel">
          <div className="panel-title">
            <div>
              <h2>{selected.title}</h2>
              <p>{formatDate(selected.startAt)} to {formatDate(selected.endAt)}</p>
            </div>
            <StatusPill status={selected.status} />
          </div>
          <h3>Questions</h3>
          <ol className="question-list">
            {selected.questions.map((question) => (
              <li key={question.id}>
                <strong>{question.prompt}</strong>
                <span>Correct: Option {Number(question.correctOption) + 1}</span>
              </li>
            ))}
          </ol>
          <h3>Results for this test</h3>
          <p className="muted">{testResults.length} submissions recorded.</p>
        </div>
      )}
    </div>
  );
}

function ResultsTable({ results, tests }) {
  const [search, setSearch] = useState("");
  const [testId, setTestId] = useState("all");

  const filtered = useMemo(() => {
    const needle = search.toLowerCase();
    return results.filter((result) => {
      const matchesText = [result.studentName, result.username, result.testTitle]
        .join(" ")
        .toLowerCase()
        .includes(needle);
      const matchesTest = testId === "all" || result.testId === testId;
      return matchesText && matchesTest;
    });
  }, [results, search, testId]);

  const exportCsv = () => {
    const rows = [
      ["Student name", "Username", "Test title", "Score", "Total marks", "Percentage", "Submitted at", "Time taken"],
      ...filtered.map((result) => [
        result.studentName,
        result.username,
        result.testTitle,
        result.score,
        result.totalMarks,
        `${result.percentage}%`,
        formatDate(result.submittedAt),
        formatDuration(result.timeTakenSeconds),
      ]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "exam-results.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="panel">
      <div className="panel-title">
        <div>
          <h2>Results</h2>
          <p>All submitted student results in one table.</p>
        </div>
        <button className="secondary" onClick={exportCsv} disabled={!filtered.length}>
          <Download size={17} />
          CSV
        </button>
      </div>
      <div className="filters">
        <label className="search-field">
          <Search size={17} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search results" />
        </label>
        <select value={testId} onChange={(event) => setTestId(event.target.value)}>
          <option value="all">All tests</option>
          {tests.map((test) => (
            <option key={test.id} value={test.id}>{test.title}</option>
          ))}
        </select>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Student name</th>
              <th>Username</th>
              <th>Test title</th>
              <th>Score</th>
              <th>Total</th>
              <th>Percentage</th>
              <th>Submitted at</th>
              <th>Time taken</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((result) => (
              <tr key={result.id}>
                <td>{result.studentName}</td>
                <td>{result.username}</td>
                <td>{result.testTitle}</td>
                <td>{result.score}</td>
                <td>{result.totalMarks}</td>
                <td>{result.percentage}%</td>
                <td>{formatDate(result.submittedAt)}</td>
                <td>{formatDuration(result.timeTakenSeconds)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!filtered.length && <div className="empty small">No results match this filter.</div>}
    </div>
  );
}

function StudentsManager({ session, students, onChanged }) {
  const [form, setForm] = useState({ name: "", username: "", password: "", batch: "" });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const reset = () => {
    setForm({ name: "", username: "", password: "", batch: "" });
    setEditing(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api(editing ? `/admin/students/${editing}` : "/admin/students", {
        method: editing ? "PUT" : "POST",
        body: JSON.stringify(form),
      }, session.token);
      reset();
      onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (student) => {
    if (!confirm(`Delete ${student.name}?`)) return;
    await api(`/admin/students/${student.id}`, { method: "DELETE" }, session.token);
    onChanged();
  };

  return (
    <div className="split">
      <form className="panel form-panel" onSubmit={submit}>
        <h2>{editing ? "Edit Student" : "Add Student"}</h2>
        <label>
          Student name
          <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        </label>
        <label>
          Roll number / username
          <input value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} required />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            required={!editing}
          />
          {editing && <span className="hint">Leave blank to keep current password.</span>}
        </label>
        <label>
          Class / batch
          <input value={form.batch} onChange={(event) => setForm({ ...form, batch: event.target.value })} />
        </label>
        {error && <div className="alert">{error}</div>}
        <div className="button-row">
          <button className="primary" disabled={busy}>{busy ? "Saving..." : "Save Student"}</button>
          {editing && <button type="button" className="secondary" onClick={reset}>Cancel</button>}
        </div>
      </form>
      <div className="panel">
        <h2>Students</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Batch</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.username}</td>
                  <td>{student.batch || "-"}</td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="secondary compact"
                        onClick={() => {
                          setEditing(student.id);
                          setForm({ ...student, password: "" });
                        }}
                      >
                        Edit
                      </button>
                      <button className="icon-button danger" onClick={() => remove(student)} title="Delete" aria-label="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StudentPortal({ session, logout }) {
  const [tests, setTests] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [answers, setAnswers] = useState({});
  const [startedAt, setStartedAt] = useState("");
  const [remaining, setRemaining] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api("/student/active-test", {}, session.token)
      .then((data) => {
        setTests(data.tests);
        setSelectedId(data.tests[0]?.id || "");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const selected = tests.find((test) => test.id === selectedId);

  useEffect(() => {
    if (!selected || selected.alreadySubmitted) return;
    const key = `started_${selected.id}_${session.user.id}`;
    const existing = localStorage.getItem(key) || new Date().toISOString();
    localStorage.setItem(key, existing);
    setStartedAt(existing);
    const tick = () => {
      const elapsed = Math.floor((Date.now() - new Date(existing).getTime()) / 1000);
      setRemaining(Math.max(0, selected.durationMinutes * 60 - elapsed));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [selected?.id]);

  const submit = async (auto = false) => {
    if (!selected || selected.alreadySubmitted || submitting || result) return;
    setSubmitting(true);
    setError("");
    try {
      const data = await api("/student/submit", {
        method: "POST",
        body: JSON.stringify({ testId: selected.id, answers, startedAt }),
      }, session.token);
      setResult(data.result);
      setTests((items) =>
        items.map((item) => (item.id === selected.id ? { ...item, alreadySubmitted: true } : item))
      );
    } catch (err) {
      setError(auto ? `Auto-submit failed: ${err.message}` : err.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (selected && remaining === 0 && startedAt && !selected.alreadySubmitted && !result) {
      submit(true);
    }
  }, [remaining, selected?.id, startedAt, result]);

  if (loading) {
    return (
      <div className="app-frame">
        <AppTopbar session={session} logout={logout} />
        <div className="empty">Loading active test...</div>
      </div>
    );
  }

  return (
    <div className="app-frame">
      <AppTopbar session={session} logout={logout} />
      <main className="student-layout">
        {error && <div className="alert">{error}</div>}
        {!tests.length && <div className="empty">No active test is available for your account.</div>}
        {tests.length > 1 && (
          <label className="test-picker">
            Select test
            <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
              {tests.map((test) => (
                <option key={test.id} value={test.id}>{test.title}</option>
              ))}
            </select>
          </label>
        )}
        {selected && (
          <section className="test-panel">
            <div className="test-header">
              <div>
                <h2>{selected.title}</h2>
                <p>{selected.instructions}</p>
              </div>
              <div className={remaining < 60 ? "timer warning" : "timer"}>
                {selected.alreadySubmitted || result ? "Submitted" : formatDuration(remaining)}
              </div>
            </div>
            <div className="metrics">
              <span>{selected.questions.length} questions</span>
              <span>{selected.durationMinutes} minutes</span>
              <span>Ends {formatDate(selected.endAt)}</span>
            </div>
            {selected.alreadySubmitted && !result ? (
              <div className="success">
                Your test has already been submitted. Results are available to the administrator.
              </div>
            ) : result ? (
              <div className="result-card">
                <CheckCircle2 size={36} />
                <h2>Test Submitted</h2>
                <p>Your answers have been saved successfully.</p>
                <strong>{result.score} / {result.totalMarks} marks · {result.percentage}%</strong>
              </div>
            ) : (
              <>
                <div className="stack">
                  {selected.questions.map((question, questionIndex) => (
                    <article className="student-question" key={question.id}>
                      <h3>{questionIndex + 1}. {question.prompt}</h3>
                      <div className="answer-list">
                        {question.options.map((option, optionIndex) => (
                          <label key={optionIndex}>
                            <input
                              type="radio"
                              name={question.id}
                              checked={Number(answers[question.id]) === optionIndex}
                              onChange={() => setAnswers({ ...answers, [question.id]: optionIndex })}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
                <button className="primary full sticky-submit" onClick={() => submit(false)} disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Test"}
                </button>
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
