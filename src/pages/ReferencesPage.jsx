import { references } from '../data/references';

export default function ReferencesPage() {
  return (
    <main className="page">
      <h1>References</h1>
      <p>Recommended texts and notes for further study.</p>

      <div className="reference-list">
        {references.map((reference) => (
          <article key={reference.title} className="reference-card">
            <h2>{reference.title}</h2>
            <p>{reference.note}</p>
            {reference.link ? (
              <p>
                Link:{' '}
                <a href={reference.link} target="_blank" rel="noreferrer">
                  {reference.link}
                </a>
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </main>
  );
}