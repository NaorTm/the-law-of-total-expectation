import { useState } from 'react';
import ConditionalExpectationVisualizer from '../components/ConditionalExpectationVisualizer';
import MathMarkdown from '../components/MathMarkdown';
import QuickQuiz from '../components/QuickQuiz';
import TreeDiagramBuilder from '../components/TreeDiagramBuilder';
import { tutorialModules } from '../data/tutorialModules';

export default function TutorialPage() {
  const [showOptionalExtension, setShowOptionalExtension] = useState(false);

  return (
    <main className="page tutorial-layout">
      <aside className="tutorial-sidebar" aria-label="Tutorial modules navigation">
        <h3>Modules</h3>
        <ul>
          {tutorialModules.map((module) => (
            <li key={module.id}>
              <a href={`#module-${module.id}`}>{module.title}</a>
            </li>
          ))}
        </ul>
      </aside>

      <div className="tutorial-content">
        <h1>Tutorial</h1>
        <p>
          Every module ends with key takeaways and a quick check. Use the widgets below to build intuition with
          visual and simulation-based feedback.
        </p>
        <label className="toggle-row">
          <input
            type="checkbox"
            checked={showOptionalExtension}
            onChange={(event) => setShowOptionalExtension(event.target.checked)}
          />
          Show optional Module F extension (total variance)
        </label>

        {tutorialModules.map((module) => (
          <section key={module.id} id={`module-${module.id}`} className="tutorial-module">
            <h2>{module.title}</h2>
            {module.sections
              .filter((section) => showOptionalExtension || section.id !== 'F1')
              .map((section) => (
                <article key={section.id} className="tutorial-section">
                  <h3>{section.id}: {section.title}</h3>
                  <MathMarkdown content={section.content} />
                </article>
              ))}

            <div className="takeaways-box">
              <h3>Key Takeaways</h3>
              <ul>
                {module.keyTakeaways.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <QuickQuiz quiz={module.quiz} idPrefix={`quiz-${module.id}`} />
          </section>
        ))}

        <section className="tutorial-widgets">
          <ConditionalExpectationVisualizer />
          <TreeDiagramBuilder />
        </section>
      </div>
    </main>
  );
}
