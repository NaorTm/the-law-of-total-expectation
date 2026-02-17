import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="page page-home">
      <section className="hero-card">
        <h1>Law of Total Expectation</h1>
        <p>
          Learn how to turn difficult expectation problems into structured two-step averages: first compute
          conditional expectations, then average across scenarios. This tutorial moves from intuition to tower
          property and sigma-algebra-level meaning with worked examples, simulations, and practice sets.
        </p>
        <div className="hero-actions">
          <Link className="cta" to="/tutorial">
            Start Tutorial
          </Link>
          <Link className="cta secondary" to="/examples">
            Explore Examples
          </Link>
        </div>
      </section>

      <section className="outcomes-card">
        <h2>Learning Outcomes</h2>
        <ol>
          <li>State total expectation in discrete and continuous forms.</li>
          <li>Use the intuition: average of conditional averages.</li>
          <li>Pick useful conditioning variables in real models.</li>
          <li>Solve mixture, random-count, and two-stage problems.</li>
          <li>Apply tower property correctly.</li>
          <li>Connect to total variance and information sets.</li>
        </ol>
      </section>
    </main>
  );
}