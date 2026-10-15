import React, { useState } from 'react';
import { useExam } from '../context/ExamContext';
import {
  BookOpen,
  ShieldCheck,
  GraduationCap,
  Award,
  LayoutDashboard,
  Zap,
  Bookmark,
  Search,
  Moon,
  Sun,
  Wifi,
  WifiOff,
  LogOut,
  Users,
  Menu,
  X,
  Sliders,
  ChevronRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    authProfile,
    isAuthenticated,
    logout,
    theme,
    toggleTheme,
    setIsCommandPaletteOpen,
    isOnline,
    bookmarks,
    mistakeQuestions,
  } = useExam();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide standard navigation during active full-screen CBT examination or Login screens
  if (
    currentView === 'cbt-exam' ||
    currentView === 'login' ||
    currentView === 'first-login-reset' ||
    !isAuthenticated ||
    !authProfile
  ) {
    return null;
  }

  const role = authProfile.role;
  const studentCourse =
    authProfile.courseType ||
    (authProfile.examCategory === 'NEET'
      ? 'NEET'
      : authProfile.examCategory === 'JEE_ADVANCED'
      ? 'JEE_ADVANCED'
      : 'JEE');
  const coursePrefix = studentCourse === 'NEET' ? 'NEET' : 'JEE';

  const navigateTo = (view: any) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  const totalSavedCount = bookmarks.length + mistakeQuestions.length;

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <div
            onClick={() => {
              if (role === 'ADMIN') navigateTo('admin-dashboard');
              else if (role === 'TEACHER') navigateTo('teacher-dashboard');
              else navigateTo('student-dashboard');
            }}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0 min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-inner shadow-indigo-400/30 group-hover:bg-indigo-500 transition-colors shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black tracking-tight text-base sm:text-lg text-white">NTA-PULSE</span>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                  {role === 'STUDENT' ? `${studentCourse} CBT` : 'CBT 2026'}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block truncate max-w-[280px]">
                {role === 'STUDENT'
                  ? studentCourse === 'NEET'
                    ? 'NEET UG Medical Examination Portal'
                    : 'JEE Engineering Candidate Portal'
                  : 'National Competitive Examination Portal'}
              </p>
            </div>
          </div>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {role === 'STUDENT' && (
              <>
                <button
                  onClick={() => navigateTo('student-dashboard')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'student-dashboard'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{coursePrefix} Dashboard</span>
                </button>

                <button
                  onClick={() => navigateTo('tests')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'tests' || currentView === 'test-details'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{coursePrefix} Mock Tests</span>
                </button>

                <button
                  onClick={() => navigateTo('practice-engine')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'practice-engine'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{coursePrefix} Practice</span>
                </button>

                <button
                  onClick={() => navigateTo('bookmarks-mistakes')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'bookmarks-mistakes'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 text-rose-400" />
                  <span>Saved &amp; Mistakes</span>
                  {totalSavedCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-rose-500/20 text-rose-300">
                      {totalSavedCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => navigateTo('result')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'result'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-sky-400" />
                  <span>{coursePrefix} Results</span>
                </button>
              </>
            )}

            {role === 'TEACHER' && (
              <>
                <button
                  onClick={() => navigateTo('teacher-dashboard')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'teacher-dashboard'
                      ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-700/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Faculty Dashboard ({authProfile.courseType || 'JEE'})</span>
                </button>

                <button
                  onClick={() => navigateTo('tests')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'tests' || currentView === 'test-details'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Course Mock Library</span>
                </button>
              </>
            )}

            {role === 'ADMIN' && (
              <>
                <button
                  onClick={() => navigateTo('admin-dashboard')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    currentView.startsWith('admin')
                      ? 'bg-purple-950/90 text-purple-300 border border-purple-700/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Admin Control Center</span>
                </button>

                <button
                  onClick={() => navigateTo('teacher-dashboard')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'teacher-dashboard'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Faculty View</span>
                </button>

                <button
                  onClick={() => navigateTo('tests')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'tests' || currentView === 'test-details'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Test Library</span>
                </button>
              </>
            )}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Command Search */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 transition-colors cursor-pointer"
              title="Quick Command Search (Ctrl+K)"
              aria-label="Quick search"
            >
              <Search className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline text-[11px]">Search...</span>
              <kbd className="hidden lg:inline px-1 py-0.2 text-[9px] font-mono bg-slate-900 text-slate-400 rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Sync Status Badge (Desktop only) */}
            <div
              className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold border ${
                isOnline
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50'
                  : 'bg-rose-950/80 text-rose-300 border-rose-700 animate-pulse'
              }`}
            >
              {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              <span>{isOnline ? 'SYNCED' : 'OFFLINE'}</span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Role & User Badge (Desktop) */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
              <div
                className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border flex items-center gap-1 max-w-[160px] truncate ${
                  role === 'ADMIN'
                    ? 'bg-purple-950/80 border-purple-700 text-purple-300'
                    : role === 'TEACHER'
                    ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                    : 'bg-indigo-950/80 border-indigo-700 text-indigo-300'
                }`}
              >
                <span>{role}</span>
                {role === 'STUDENT' && (
                  <span className="text-emerald-300 truncate">· {studentCourse}</span>
                )}
              </div>

              <button
                onClick={logout}
                className="p-1.5 rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/70 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer touch-target flex items-center justify-center"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ================= Mobile Navigation Drawer (Dropdown Panel) ================= */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-5 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            {/* Mobile User Profile Card */}
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{authProfile.fullName}</div>
                <div className="text-[11px] font-mono text-slate-400 truncate">
                  {role === 'STUDENT'
                    ? `${studentCourse} Candidate • ID: ${authProfile.studentId || 'N/A'}`
                    : role === 'TEACHER'
                    ? `Faculty • ${authProfile.courseType || 'JEE'}`
                    : `Administrator • ${authProfile.email}`}
                </div>
              </div>

              <div
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                  isOnline
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                    : 'bg-rose-950 text-rose-300 border border-rose-700/60'
                }`}
              >
                {isOnline ? 'SYNCED' : 'OFFLINE'}
              </div>
            </div>

            {/* Navigation Links for Mobile */}
            <div className="space-y-1">
              {role === 'STUDENT' && (
                <>
                  <button
                    onClick={() => navigateTo('student-dashboard')}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      currentView === 'student-dashboard'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                      <span>{coursePrefix} Dashboard</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <button
                    onClick={() => navigateTo('tests')}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      currentView === 'tests' || currentView === 'test-details'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-indigo-400" />
                      <span>{coursePrefix} Mock Tests</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <button
                    onClick={() => navigateTo('practice-engine')}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      currentView === 'practice-engine'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>{coursePrefix} Topic Practice</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <button
                    onClick={() => navigateTo('student-custom-test')}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      currentView === 'student-custom-test'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Sliders className="w-4 h-4 text-teal-400" />
                      <span>Custom Sprint Builder</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <button
                    onClick={() => navigateTo('bookmarks-mistakes')}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      currentView === 'bookmarks-mistakes'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Bookmark className="w-4 h-4 text-rose-400" />
                      <span>Saved &amp; Mistakes</span>
                    </div>
                    {totalSavedCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500 text-white">
                        {totalSavedCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => navigateTo('result')}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      currentView === 'result'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-sky-400" />
                      <span>{coursePrefix} Test Results</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </>
              )}

              {role === 'TEACHER' && (
                <>
                  <button
                    onClick={() => navigateTo('teacher-dashboard')}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      currentView === 'teacher-dashboard'
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-emerald-400" />
                      <span>Faculty Dashboard</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <button
                    onClick={() => navigateTo('tests')}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      currentView === 'tests' || currentView === 'test-details'
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-indigo-400" />
                      <span>Course Mock Tests</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </>
              )}

              {role === 'ADMIN' && (
                <>
                  <button
                    onClick={() => navigateTo('admin-dashboard')}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      currentView.startsWith('admin')
                        ? 'bg-purple-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      <span>Admin Control Center</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <button
                    onClick={() => navigateTo('teacher-dashboard')}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      currentView === 'teacher-dashboard'
                        ? 'bg-purple-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-emerald-400" />
                      <span>Faculty View</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <button
                    onClick={() => navigateTo('tests')}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      currentView === 'tests' || currentView === 'test-details'
                        ? 'bg-purple-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-indigo-400" />
                      <span>Test Library</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </>
              )}
            </div>

            {/* Mobile Sign Out Button */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={logout}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer touch-target"
              >
                <LogOut className="w-4 h-4" /> Sign Out of Platform
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ================= Student Mobile Bottom Navigation Dock ================= */}
      {role === 'STUDENT' && (
        <nav
          aria-label="Student Mobile Navigation"
          className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1 shadow-2xl safe-area-bottom"
        >
          <div className="grid grid-cols-5 gap-1 max-w-lg mx-auto">
            <button
              onClick={() => navigateTo('student-dashboard')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
                currentView === 'student-dashboard'
                  ? 'text-indigo-400 font-bold bg-slate-800/80'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] leading-tight truncate">Home</span>
            </button>

            <button
              onClick={() => navigateTo('tests')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
                currentView === 'tests' || currentView === 'test-details'
                  ? 'text-indigo-400 font-bold bg-slate-800/80'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] leading-tight truncate">Mocks</span>
            </button>

            <button
              onClick={() => navigateTo('practice-engine')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
                currentView === 'practice-engine'
                  ? 'text-amber-400 font-bold bg-slate-800/80'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] leading-tight truncate">Practice</span>
            </button>

            <button
              onClick={() => navigateTo('bookmarks-mistakes')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all relative cursor-pointer ${
                currentView === 'bookmarks-mistakes'
                  ? 'text-rose-400 font-bold bg-slate-800/80'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Bookmark className="w-4 h-4 mb-0.5" />
                {totalSavedCount > 0 && (
                  <span className="absolute -top-1 -right-2.5 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-mono font-bold flex items-center justify-center">
                    {totalSavedCount > 9 ? '9+' : totalSavedCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] leading-tight truncate">Saved</span>
            </button>

            <button
              onClick={() => navigateTo('result')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
                currentView === 'result'
                  ? 'text-sky-400 font-bold bg-slate-800/80'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] leading-tight truncate">Results</span>
            </button>
          </div>
        </nav>
      )}
    </>
  );
};
