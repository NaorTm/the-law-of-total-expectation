import { useState } from 'react';

export default function QuickQuiz({ quiz, idPrefix }) {
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);

  return (
    <section className="quick-quiz" aria-label="Quick check quiz">
      <h4>Quick Check</h4>
      <p>{quiz.question}</p>
      <div role="radiogroup" aria-label={quiz.question}>
        {quiz.options.map((option, index) => (
          <label key={`${idPrefix}-${index}`} className="quiz-option">
            <input
              type="radio"
              name={`${idPrefix}-quiz`}
              checked={selected === index}
              onChange={() => setSelected(index)}
            />
            {option}
          </label>
        ))}
      </div>
      <div className="quiz-actions">
        <button type="button" onClick={() => setChecked(true)} disabled={selected === null}>
          Check
        </button>
        <button
          type="button"
          onClick={() => {
            setSelected(null);
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
      {checked ? (
        <p className={selected === quiz.answerIndex ? 'quiz-correct' : 'quiz-incorrect'}>
          {selected === quiz.answerIndex ? 'Correct.' : 'Not quite.'} {quiz.explanation}
        </p>
      ) : null}
    </section>
  );
}