import { useMemo, useState } from 'react';
import { BlockMath } from 'react-katex';

export default function StepReveal({ steps }) {
  const [visibleCount, setVisibleCount] = useState(1);
  const cappedVisible = Math.min(visibleCount, steps.length);
  const progress = useMemo(() => `${cappedVisible}/${steps.length}`, [cappedVisible, steps.length]);

  const revealNext = () => setVisibleCount((prev) => Math.min(steps.length, prev + 1));
  const hideLast = () => setVisibleCount((prev) => Math.max(1, prev - 1));
  const revealAll = () => setVisibleCount(steps.length);

  return (
    <section
      className="step-reveal"
      tabIndex={0}
      aria-label="Step-by-step solution reveal"
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          revealNext();
        }
        if (event.key === 'ArrowLeft') {
          hideLast();
        }
      }}
    >
      <div className="step-reveal-controls">
        <strong>Steps ({progress})</strong>
        <div className="step-actions">
          <button type="button" onClick={hideLast} disabled={cappedVisible <= 1}>
            Back
          </button>
          <button type="button" onClick={revealNext} disabled={cappedVisible >= steps.length}>
            Reveal Next
          </button>
          <button type="button" onClick={revealAll} disabled={cappedVisible >= steps.length}>
            Reveal All
          </button>
        </div>
      </div>
      <ol>
        {steps.slice(0, cappedVisible).map((step, index) => (
          <li key={`${step.title}-${index}`} className="step-item">
            <h4>{step.title}</h4>
            <p>{step.explanationMarkdown || step.text}</p>
            {step.mathLatex ? <BlockMath math={step.mathLatex} /> : null}
          </li>
        ))}
      </ol>
      <p className="step-hint">Keyboard: use left/right arrows while this panel is focused.</p>
    </section>
  );
}