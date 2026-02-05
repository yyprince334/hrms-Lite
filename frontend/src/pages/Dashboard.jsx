import { useEffect, useState } from "react";
import api from "../services/api";
import EmployeeForm from "../components/employees/EmployeeForm";
import EmployeeList from "../components/employees/EmployeeList";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import AttendanceForm from "../components/attendance/AttendanceForm";
import AttendanceList from "../components/attendance/AttendanceList";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("employees"); // "employees" or "attendance"

  const handleAttendanceRefresh = () => {};

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
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light tracking-tight text-slate-900">
                Human Resource <span className="font-semibold">Management System</span>
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Streamline workforce operations
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {employees.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-1 -mb-px">
            <button
              onClick={() => setActiveTab("employees")}
              className={`relative px-6 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === "employees"
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Employees
              </span>
              {activeTab === "employees" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 animate-slideIn"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("attendance")}
              className={`relative px-6 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === "attendance"
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Attendance
              </span>
              {activeTab === "attendance" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 animate-slideIn"></div>
              )}
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Employee Section */}
        {activeTab === "employees" && (
          <section className="animate-fadeIn">
            <div className="mb-8">
              <h2 className="text-xl font-light text-slate-900 mb-2">
                Employee Directory
              </h2>
              <div className="h-px w-16 bg-gradient-to-r from-slate-900 to-transparent"></div>
            </div>

            <div className="space-y-6">
              <EmployeeForm onSuccess={fetchEmployees} />
              <ErrorMessage message={error} />
              {loading ? <Loader /> : <EmployeeList employees={employees} onDelete={fetchEmployees} />}
            </div>
          </section>
        )}

        {/* Attendance Section */}
        {activeTab === "attendance" && (
          <section className="animate-fadeIn">
            <div className="mb-8">
              <h2 className="text-xl font-light text-slate-900 mb-2">
                Attendance Tracking
              </h2>
              <div className="h-px w-16 bg-gradient-to-r from-slate-900 to-transparent"></div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all duration-300">
              {/* Employee Selector */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Select Employee
                </label>
                <div className="relative">
                  <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-slate-400"
                  >
                    <option value="">Choose an employee</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.full_name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <AttendanceForm employees={employees} onSuccess={handleAttendanceRefresh} />
              <AttendanceList employeeId={selectedEmployee} />
            </div>
          </section>
        )}
      </main>

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