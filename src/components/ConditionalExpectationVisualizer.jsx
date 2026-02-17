import { useMemo, useState } from 'react';
import Plot from 'react-plotly.js';

const discreteModels = [
  {
    id: 'route',
    label: 'Routes (Travel Time)',
    states: [
      { y: 'Bus', p: 0.7, conditionalMean: 30 },
      { y: 'Train', p: 0.3, conditionalMean: 15 },
    ],
  },
  {
    id: 'coin',
    label: 'Coin Mixture',
    states: [
      { y: 'Coin A', p: 0.6, conditionalMean: 0.2 },
      { y: 'Coin B', p: 0.4, conditionalMean: 0.8 },
    ],
  },
  {
    id: 'service',
    label: 'Service Type',
    states: [
      { y: 'Type A', p: 0.2, conditionalMean: 2 },
      { y: 'Type B', p: 0.5, conditionalMean: 5 },
      { y: 'Type C', p: 0.3, conditionalMean: 1 },
    ],
  },
];

const continuousModels = [
  {
    id: 'uniform-endpoint',
    label: 'Y~Uniform(0,1), E[X|Y=y]=y/2',
    domain: [0, 1],
    conditionalMean: (y) => y / 2,
    density: () => 1,
  },
  {
    id: 'linear',
    label: 'Y~Uniform(0,2), E[X|Y=y]=1+0.8y',
    domain: [0, 2],
    conditionalMean: (y) => 1 + 0.8 * y,
    density: () => 0.5,
  },
  {
    id: 'beta-like',
    label: 'Y density f(y)=2y on [0,1], E[X|Y=y]=2y',
    domain: [0, 1],
    conditionalMean: (y) => 2 * y,
    density: (y) => 2 * y,
  },
];

function numericalIntegral(model, gridSize = 400) {
  const [a, b] = model.domain;
  const width = (b - a) / gridSize;
  let total = 0;
  for (let i = 0; i < gridSize; i += 1) {
    const y = a + (i + 0.5) * width;
    total += model.conditionalMean(y) * model.density(y) * width;
  }
  return total;
}

export default function ConditionalExpectationVisualizer() {
  const [mode, setMode] = useState('discrete');
  const [discreteId, setDiscreteId] = useState(discreteModels[0].id);
  const [continuousId, setContinuousId] = useState(continuousModels[0].id);

  const discreteModel = useMemo(
    () => discreteModels.find((item) => item.id === discreteId) ?? discreteModels[0],
    [discreteId],
  );

  const continuousModel = useMemo(
    () => continuousModels.find((item) => item.id === continuousId) ?? continuousModels[0],
    [continuousId],
  );

  const discreteExpectation = useMemo(
    () => discreteModel.states.reduce((acc, state) => acc + state.p * state.conditionalMean, 0),
    [discreteModel],
  );

  const continuousData = useMemo(() => {
    const [a, b] = continuousModel.domain;
    const n = 180;
    const ys = [];
    const g = [];
    const f = [];
    const integrand = [];
    for (let i = 0; i <= n; i += 1) {
      const y = a + ((b - a) * i) / n;
      ys.push(y);
      const gy = continuousModel.conditionalMean(y);
      const fy = continuousModel.density(y);
      g.push(gy);
      f.push(fy);
      integrand.push(gy * fy);
    }
    return {
      ys,
      g,
      f,
      integrand,
      expectation: numericalIntegral(continuousModel),
    };
  }, [continuousModel]);

  return (
    <section className="widget-card" aria-label="Conditional expectation visualizer">
      <h3>Conditional Expectation Visualizer</h3>
      <p>
        Explore the inner step <code>E[X|Y=y]</code> and the outer averaging step that produces{' '}
        <code>E[X]</code>.
      </p>

      <div className="mode-switch" role="group" aria-label="Mode selection">
        <button type="button" onClick={() => setMode('discrete')} className={mode === 'discrete' ? 'selected' : ''}>
          Discrete
        </button>
        <button type="button" onClick={() => setMode('continuous')} className={mode === 'continuous' ? 'selected' : ''}>
          Continuous
        </button>
      </div>

      {mode === 'discrete' ? (
        <div>
          <label>
            Scenario model
            <select value={discreteId} onChange={(event) => setDiscreteId(event.target.value)}>
              {discreteModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.label}
                </option>
              ))}
            </select>
          </label>

          <Plot
            data={[
              {
                x: discreteModel.states.map((state) => state.y),
                y: discreteModel.states.map((state) => state.p),
                type: 'bar',
                name: 'P(Y=y)',
                marker: { color: '#247b75' },
                yaxis: 'y1',
              },
              {
                x: discreteModel.states.map((state) => state.y),
                y: discreteModel.states.map((state) => state.conditionalMean),
                type: 'scatter',
                mode: 'markers+lines',
                name: 'E[X|Y=y]',
                marker: { color: '#d86f43', size: 9 },
                line: { color: '#d86f43' },
                yaxis: 'y2',
              },
            ]}
            layout={{
              autosize: true,
              margin: { l: 48, r: 48, t: 16, b: 36 },
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(255,255,255,0.9)',
              yaxis: { title: 'Probability', rangemode: 'tozero' },
              yaxis2: {
                title: 'Conditional Mean',
                overlaying: 'y',
                side: 'right',
              },
              legend: { orientation: 'h', y: 1.2 },
            }}
            style={{ width: '100%', height: '300px' }}
            useResizeHandler
            config={{ displayModeBar: false, responsive: true }}
          />

          <p>
            Outer average: <strong>E[X] = {discreteExpectation.toFixed(4)}</strong>
          </p>
        </div>
      ) : (
        <div>
          <label>
            Continuous model
            <select value={continuousId} onChange={(event) => setContinuousId(event.target.value)}>
              {continuousModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.label}
                </option>
              ))}
            </select>
          </label>

          <Plot
            data={[
              {
                x: continuousData.ys,
                y: continuousData.g,
                type: 'scatter',
                mode: 'lines',
                name: 'E[X|Y=y]',
                line: { color: '#0f5954', width: 2.5 },
              },
              {
                x: continuousData.ys,
                y: continuousData.f,
                type: 'scatter',
                mode: 'lines',
                name: 'fY(y)',
                line: { color: '#e2904f', width: 2 },
              },
              {
                x: continuousData.ys,
                y: continuousData.integrand,
                type: 'scatter',
                mode: 'lines',
                name: 'E[X|Y=y] fY(y)',
                line: { color: '#7f5068', width: 2, dash: 'dot' },
              },
            ]}
            layout={{
              autosize: true,
              margin: { l: 48, r: 20, t: 16, b: 36 },
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(255,255,255,0.9)',
              xaxis: { title: 'y' },
              yaxis: { title: 'Value' },
              legend: { orientation: 'h', y: 1.2 },
            }}
            style={{ width: '100%', height: '300px' }}
            useResizeHandler
            config={{ displayModeBar: false, responsive: true }}
          />

          <p>
            Numerical outer average: <strong>E[X] ˜ {continuousData.expectation.toFixed(4)}</strong>
          </p>
        </div>
      )}
    </section>
  );
}