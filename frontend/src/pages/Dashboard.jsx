import { useEffect, useState } from "react";
import api from "../services/api";

import EmployeeForm from "../components/employees/EmployeeForm";
import EmployeeList from "../components/employees/EmployeeList";
import AttendanceForm from "../components/attendance/AttendanceForm";
import AttendanceList from "../components/attendance/AttendanceList";

import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("employees");

  // 🔹 Attendance refresh trigger
  const [attendanceRefreshKey, setAttendanceRefreshKey] = useState(0);

  const handleAttendanceRefresh = () => {
    setAttendanceRefreshKey((prev) => prev + 1);
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* ================= HEADER ================= */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light tracking-tight text-slate-900">
                Human Resource{" "}
                <span className="font-semibold">Management System</span>
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Streamline workforce operations
              </p>
            </div>

            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {employees.length}
              </span>
            </div>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-1 -mb-px">
            {["employees", "attendance"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-4 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab === "employees" ? "Employees" : "Attendance"}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 animate-slideIn" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* ================= EMPLOYEES ================= */}
        {activeTab === "employees" && (
          <section className="animate-fadeIn">
            <div className="mb-8">
              <h2 className="text-xl font-light text-slate-900 mb-2">
                Employee Directory
              </h2>
              <div className="h-px w-16 bg-gradient-to-r from-slate-900 to-transparent" />
            </div>

            <div className="space-y-6">
              <EmployeeForm onSuccess={fetchEmployees} />
              <ErrorMessage message={error} />
              {loading ? (
                <Loader />
              ) : (
                <EmployeeList employees={employees} onDelete={fetchEmployees} />
              )}
            </div>
          </section>
        )}

        {/* ================= ATTENDANCE ================= */}
        {activeTab === "attendance" && (
          <section className="animate-fadeIn">
            <div className="mb-8">
              <h2 className="text-xl font-light text-slate-900 mb-2">
                Attendance Tracking
              </h2>
              <div className="h-px w-16 bg-gradient-to-r from-slate-900 to-transparent" />
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8">
              {/* Attendance Form */}
              <AttendanceForm
                employees={employees}
                onSuccess={handleAttendanceRefresh}
              />

              {/* Employee Selector */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Select Employee
                </label>

                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full appearance-none px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-slate-400"
                >
                  <option value="">Choose an employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.full_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Attendance List */}
              <AttendanceList
                employeeId={selectedEmployee}
                refreshKey={attendanceRefreshKey}
              />
            </div>
          </section>
        )}
      </main>

      {/* ================= ANIMATIONS ================= */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
          transform-origin: left;
        }
      `}</style>
    </div>
  );
}
