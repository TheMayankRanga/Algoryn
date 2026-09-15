import { CheckCircle2, FileText, TriangleAlert } from "lucide-react";

const lesson = {
  title: "Two Pointers",
  difficulty: "Medium",
  summary: "Use two moving indices to avoid repeated comparisons and shrink the problem space.",
  steps: [
    "Identify whether one side of the array is fixed while the other moves.",
    "Keep the invariant true across each iteration.",
    "Move the pointer that reduces the search space or satisfies the condition.",
  ],
  tips: [
    "Use a left and right pointer when the answer depends on a pair or a range.",
    "Check sortedness before assuming a two-pointer solution is valid.",
    "Remember to move both pointers carefully when the condition changes.",
  ],
  mistakes: [
    "Moving the wrong pointer and losing the valid window.",
    "Forgetting to update the invariant after a swap or shift.",
    "Checking the full range instead of the reduced one.",
  ],
};

export function LessonDetail() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Lesson spotlight</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">{lesson.title}</h3>
        </div>
        <span className="w-fit rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200">
          {lesson.difficulty}
        </span>
      </div>

      <p className="mt-4 text-slate-300">{lesson.summary}</p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <div className="mb-3 flex items-center gap-2 text-cyan-200">
            <FileText size={16} />
            <span className="text-sm uppercase tracking-[0.2em]">Flow</span>
          </div>
          <ul className="space-y-2 text-sm text-slate-300">
            {lesson.steps.map((step) => (
              <li key={step}>• {step}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <div className="mb-3 flex items-center gap-2 text-emerald-200">
            <CheckCircle2 size={16} />
            <span className="text-sm uppercase tracking-[0.2em]">Tips</span>
          </div>
          <ul className="space-y-2 text-sm text-slate-300">
            {lesson.tips.map((tip) => (
              <li key={tip}>• {tip}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <div className="mb-3 flex items-center gap-2 text-amber-200">
            <TriangleAlert size={16} />
            <span className="text-sm uppercase tracking-[0.2em]">Mistakes</span>
          </div>
          <ul className="space-y-2 text-sm text-slate-300">
            {lesson.mistakes.map((mistake) => (
              <li key={mistake}>• {mistake}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
