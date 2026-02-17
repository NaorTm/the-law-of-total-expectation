import { useMemo, useState } from 'react';

const initialRows = [
  { id: 1, label: 'Y1', pY: 0.5, xLow: 10, xHigh: 30, pHigh: 0.4 },
  { id: 2, label: 'Y2', pY: 0.3, xLow: 20, xHigh: 45, pHigh: 0.5 },
  { id: 3, label: 'Y3', pY: 0.2, xLow: 5, xHigh: 18, pHigh: 0.35 },
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default function TreeDiagramBuilder() {
  const [rows, setRows] = useState(initialRows);

  const updateRow = (id, key, rawValue) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== id) {
          return row;
        }
        if (key === 'label') {
          return { ...row, label: rawValue };
        }
        const value = Number(rawValue);
        if (Number.isNaN(value)) {
          return row;
        }
        if (key === 'pY' || key === 'pHigh') {
          return { ...row, [key]: clamp(value, 0, 1) };
        }
        return { ...row, [key]: value };
      }),
    );
  };

  const normalizedRows = useMemo(() => {
    const total = rows.reduce((acc, row) => acc + row.pY, 0) || 1;
    return rows.map((row) => {
      const pNorm = row.pY / total;
      const conditionalMean = row.xLow * (1 - row.pHigh) + row.xHigh * row.pHigh;
      return {
        ...row,
        pNorm,
        conditionalMean,
        contribution: pNorm * conditionalMean,
      };
    });
  }, [rows]);

  const expectation = useMemo(
    () => normalizedRows.reduce((acc, row) => acc + row.contribution, 0),
    [normalizedRows],
  );

  return (
    <section className="widget-card" aria-label="Tree diagram builder">
      <h3>Tree Diagram Builder</h3>
      <p>
        Stage 1 sets scenario probabilities for <code>Y</code>. Stage 2 defines a conditional two-point distribution
        for <code>X|Y</code>. The weighted conditional means are summed automatically.
      </p>

      <div className="tree-grid">
        {rows.map((row) => (
          <fieldset key={row.id} className="tree-input-group">
            <legend>{row.label || `Y${row.id}`}</legend>
            <label>
              Label
              <input value={row.label} onChange={(event) => updateRow(row.id, 'label', event.target.value)} />
            </label>
            <label>
              Stage 1 P(Y)
              <input
                type="number"
                min={0}
                max={1}
                step={0.01}
                value={row.pY}
                onChange={(event) => updateRow(row.id, 'pY', event.target.value)}
              />
            </label>
            <label>
              Stage 2 X low
              <input
                type="number"
                value={row.xLow}
                onChange={(event) => updateRow(row.id, 'xLow', event.target.value)}
              />
            </label>
            <label>
              Stage 2 X high
              <input
                type="number"
                value={row.xHigh}
                onChange={(event) => updateRow(row.id, 'xHigh', event.target.value)}
              />
            </label>
            <label>
              P(high | Y)
              <input
                type="number"
                min={0}
                max={1}
                step={0.01}
                value={row.pHigh}
                onChange={(event) => updateRow(row.id, 'pHigh', event.target.value)}
              />
            </label>
          </fieldset>
        ))}
      </div>

      <div className="tree-diagram">
        {normalizedRows.map((row) => (
          <div key={row.id} className="tree-branch">
            <div className="branch-node">{row.label || `Y${row.id}`}</div>
            <div className="branch-meta">P(Y) normalized = {row.pNorm.toFixed(3)}</div>
            <div className="branch-meta">
              E[X|{row.label || `Y${row.id}`}] = {row.conditionalMean.toFixed(3)}
            </div>
            <div className="branch-meta">Contribution = {row.contribution.toFixed(3)}</div>
          </div>
        ))}
      </div>

      <p>
        Computed outer average: <strong>E[X] = {expectation.toFixed(4)}</strong>
      </p>
    </section>
  );
}