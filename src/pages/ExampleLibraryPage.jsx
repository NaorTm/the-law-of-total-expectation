import { useMemo, useState } from 'react';
import { BlockMath } from 'react-katex';
import MathMarkdown from '../components/MathMarkdown';
import MonteCarloSimulator from '../components/MonteCarloSimulator';
import StepReveal from '../components/StepReveal';
import examples from '../data/examples.json';

function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export default function ExampleLibraryPage() {
  const [difficulty, setDifficulty] = useState('All');
  const [type, setType] = useState('All');
  const [pattern, setPattern] = useState('All');
  const [domain, setDomain] = useState('All');

  const difficultyOptions = useMemo(() => uniqueSorted(examples.map((item) => item.difficulty)), []);
  const typeOptions = useMemo(() => uniqueSorted(examples.map((item) => item.type)), []);
  const patternOptions = useMemo(() => uniqueSorted(examples.flatMap((item) => item.patternTags)), []);
  const domainOptions = useMemo(() => uniqueSorted(examples.flatMap((item) => item.domainTags)), []);

  const filteredExamples = useMemo(
    () =>
      examples.filter((example) => {
        const difficultyMatch = difficulty === 'All' || example.difficulty === difficulty;
        const typeMatch = type === 'All' || example.type === type;
        const patternMatch = pattern === 'All' || example.patternTags.includes(pattern);
        const domainMatch = domain === 'All' || example.domainTags.includes(domain);
        return difficultyMatch && typeMatch && patternMatch && domainMatch;
      }),
    [difficulty, type, pattern, domain],
  );

  return (
    <main className="page">
      <h1>Example Library</h1>
      <p>
        Filter by difficulty, type, pattern, and domain. Every example includes full steps, simulation snippet, and
        a seeded Monte Carlo checker.
      </p>

      <section className="filters" aria-label="Example filters">
        <label>
          Difficulty
          <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
            <option>All</option>
            {difficultyOptions.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Type
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option>All</option>
            {typeOptions.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Pattern
          <select value={pattern} onChange={(event) => setPattern(event.target.value)}>
            <option>All</option>
            {patternOptions.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Domain
          <select value={domain} onChange={(event) => setDomain(event.target.value)}>
            <option>All</option>
            {domainOptions.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
      </section>

      <p>
        Showing <strong>{filteredExamples.length}</strong> of <strong>{examples.length}</strong> examples.
      </p>

      <div className="example-list">
        {filteredExamples.map((example) => (
          <article key={example.id} className="example-card">
            <header className="example-header">
              <h2>
                Example {example.id}: {example.title}
              </h2>
              <div className="badge-row">
                <span className="badge">{example.difficulty}</span>
                <span className="badge">{example.type}</span>
                {example.patternTags.map((tag) => (
                  <span key={`${example.id}-p-${tag}`} className="badge muted">
                    {tag}
                  </span>
                ))}
                {example.domainTags.map((tag) => (
                  <span key={`${example.id}-d-${tag}`} className="badge muted">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <section>
              <h3>Problem</h3>
              <MathMarkdown content={example.problemMarkdown} />
            </section>

            <section>
              <h3>Choose Y</h3>
              <MathMarkdown content={example.chooseYMarkdown} />
            </section>

            <StepReveal steps={example.solutionSteps} />

            <section>
              <h3>Final Expression</h3>
              <BlockMath math={example.expectedValueLatex} />
            </section>
            <p>
              <strong>Key takeaway:</strong> {example.keyTakeaway}
            </p>

            <details>
              <summary>Alternate method</summary>
              <p>{example.alternateMethod}</p>
            </details>

            <details>
              <summary>Simulation code snippet</summary>
              <pre>
                <code>{example.simulation.samplerJs}</code>
              </pre>
            </details>

            <MonteCarloSimulator example={example} />
          </article>
        ))}
      </div>
    </main>
  );
}
