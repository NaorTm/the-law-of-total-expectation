import { useMemo, useState } from 'react';
import StepReveal from '../components/StepReveal';
import practiceProblems from '../data/practice.json';

const levels = [
  { id: 1, label: 'Level 1', description: 'Direct scenario weighted averages', requiredCount: 10 },
  { id: 2, label: 'Level 2', description: 'Random sums, mixtures, indicators', requiredCount: 12 },
  { id: 3, label: 'Level 3', description: 'Continuous conditioning integrals', requiredCount: 12 },
  { id: 4, label: 'Level 4', description: 'Tower property with two variables', requiredCount: 8 },
];

export default function PracticePage() {
  const [activeLevel, setActiveLevel] = useState(1);

  const counts = useMemo(() => {
    const byLevel = { 1: 0, 2: 0, 3: 0, 4: 0 };
    practiceProblems.forEach((problem) => {
      byLevel[problem.level] += 1;
    });
    return byLevel;
  }, []);

  const filteredProblems = useMemo(
    () => practiceProblems.filter((problem) => problem.level === activeLevel),
    [activeLevel],
  );

  return (
    <main className="page">
      <h1>Practice</h1>
      <p>
        Four levels are included with the required problem counts. Each item includes two hints and a full step-by-step
        solution reveal.
      </p>

      <section className="level-tabs" aria-label="Practice levels">
        {levels.map((level) => (
          <button
            type="button"
            key={level.id}
            className={activeLevel === level.id ? 'selected' : ''}
            onClick={() => setActiveLevel(level.id)}
          >
            {level.label} ({counts[level.id]}/{level.requiredCount})
          </button>
        ))}
      </section>

      <section className="level-summary">
        {levels
          .filter((level) => level.id === activeLevel)
          .map((level) => (
            <div key={level.id}>
              <h2>{level.label}</h2>
              <p>{level.description}</p>
            </div>
          ))}
      </section>

      <div className="practice-list">
        {filteredProblems.map((problem) => (
          <article key={problem.id} className="practice-card">
            <h3>
              Problem {problem.id}: {problem.title}
            </h3>
            <p>{problem.problemStatement}</p>

            <details>
              <summary>Hint 1</summary>
              <p>{problem.hint1}</p>
            </details>

            <details>
              <summary>Hint 2</summary>
              <p>{problem.hint2}</p>
            </details>

            <StepReveal steps={problem.solutionSteps} />

            <p>
              <strong>Final result:</strong> {problem.finalResult}
            </p>
            <p>
              <strong>Pattern:</strong> {problem.pattern}
            </p>
            <p>
              <strong>Optional simulation check:</strong> {problem.simulationCheck}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}