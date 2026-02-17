import { useState } from 'react';
import Plot from 'react-plotly.js';
import { runSimulation } from '../lib/simulationEngine';

export default function MonteCarloSimulator({ example }) {
  const [sampleCount, setSampleCount] = useState(3000);
  const [seed, setSeed] = useState('lte-demo');
  const [result, setResult] = useState(null);

  const run = () => {
    const output = runSimulation(example, sampleCount, seed);
    setResult(output);
  };

  return (
    <section className="simulator-card" aria-label={`Monte Carlo simulator for example ${example.id}`}>
      <h4>Monte Carlo Simulator</h4>
      <div className="sim-controls">
        <label>
          N samples
          <input
            type="number"
            min={100}
            step={100}
            value={sampleCount}
            onChange={(event) => setSampleCount(Number(event.target.value))}
          />
        </label>
        <label>
          Seed
          <input type="text" value={seed} onChange={(event) => setSeed(event.target.value)} />
        </label>
        <button type="button" onClick={run}>Run simulation</button>
      </div>

      <p>
        Theoretical mean: <strong>{example.finalResult}</strong>
      </p>

      {result ? (
        <div className="sim-results">
          <p>
            Simulated mean: <strong>{result.mean.toFixed(5)}</strong>
          </p>
          <p>
            95% CI: [{result.ciLow.toFixed(5)}, {result.ciHigh.toFixed(5)}]
          </p>
          <Plot
            data={[
              {
                x: result.convergence.x,
                y: result.convergence.y,
                type: 'scatter',
                mode: 'lines',
                name: 'Running mean',
                line: { color: '#105652', width: 2 },
              },
              {
                x: result.convergence.x,
                y: Array(result.convergence.x.length).fill(Number(example.finalResult)),
                type: 'scatter',
                mode: 'lines',
                name: 'Theoretical mean',
                line: { color: '#ce5a30', dash: 'dash' },
              },
            ]}
            layout={{
              autosize: true,
              margin: { l: 40, r: 20, t: 20, b: 35 },
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(255,255,255,0.9)',
              xaxis: { title: 'N' },
              yaxis: { title: 'Mean estimate' },
              legend: { orientation: 'h', y: 1.12 },
            }}
            style={{ width: '100%', height: '280px' }}
            useResizeHandler
            config={{ displayModeBar: false, responsive: true }}
          />
        </div>
      ) : null}
    </section>
  );
}