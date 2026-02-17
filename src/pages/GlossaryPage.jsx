import { useState } from 'react';
import glossaryItems from '../data/glossary.json';

export default function GlossaryPage() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const filtered = glossaryItems.filter((item) => {
    if (!showAdvanced && item.term.toLowerCase().includes('sigma algebra')) {
      return false;
    }
    return true;
  });

  return (
    <main className="page">
      <h1>Glossary</h1>
      <p>Core definitions used throughout the tutorial and examples.</p>

      <label className="toggle-row">
        <input
          type="checkbox"
          checked={showAdvanced}
          onChange={(event) => setShowAdvanced(event.target.checked)}
        />
        Show advanced sigma-algebra toggle
      </label>

      <div className="glossary-grid">
        {filtered.map((item) => (
          <article key={item.term} className="glossary-card">
            <h2>{item.term}</h2>
            <p>{item.definition}</p>
            <p>
              <strong>Example:</strong> {item.example}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}