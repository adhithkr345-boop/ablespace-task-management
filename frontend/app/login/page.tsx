'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-[400px]">

        {/* BRAND */}

        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
            <span className="text-lg font-bold text-slate-800">
              T
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            TaskFlow Pro
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Professional productivity dashboard
          </p>
        </div>

        {/* LOGIN CARD */}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              Welcome
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Continue as a guest to explore the task management dashboard.
            </p>
          </div>

          {/* GUEST LOGIN */}

          <button
            type="button"
            onClick={() => router.push('/')}
            className="mt-8 w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            Continue as Guest
          </button>

          <p className="mt-5 text-center text-xs leading-5 text-slate-400">
            No account required. Guest access is available for evaluation.
          </p>
        </div>

        {/* FOOTER */}

        <p className="mt-6 text-center text-xs text-slate-400">
          © 2026 TaskFlow Pro
        </p>

      </div>
    </main>
  );
}