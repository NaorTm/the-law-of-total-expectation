export const tutorialModules = [
  {
    id: 'A',
    title: 'Module A: Intuition and First Formula',
    sections: [
      {
        id: 'A1',
        title: 'Motivation',
        content: `Directly computing \(\\mathbb{E}[X]\) can be messy when many scenarios are mixed together. The Law of Total Expectation says: split by a useful scenario variable \(Y\), compute easier conditional averages first, then average those.`
      },
      {
        id: 'A2',
        title: 'Core Statement',
        content: `\\[
\\mathbb{E}[X] = \\mathbb{E}(\\mathbb{E}[X \\mid Y])
\\]`
      },
      {
        id: 'A3',
        title: 'Micro Example (2 Scenarios)',
        content: `Suppose a class has two faculties: Engineering (60%) and Arts (40%). Average heights are 172 cm and 166 cm. Then total expected height is \(0.6\\cdot 172 + 0.4\\cdot 166 = 169.6\) cm.`
      }
    ],
    keyTakeaways: [
      'Conditioning creates a simpler inner expectation.',
      'The outer expectation averages over the distribution of the conditioning variable.'
    ],
    quiz: {
      question: 'Why does choosing a good conditioning variable help?',
      options: [
        'It converts one hard expectation into easier conditional expectations.',
        'It always removes randomness completely.',
        'It only works for continuous variables.'
      ],
      answerIndex: 0,
      explanation: 'A good choice of Y organizes randomness into simpler subproblems.'
    }
  },
  {
    id: 'B',
    title: 'Module B: Discrete Conditioning and Partitions',
    sections: [
      {
        id: 'B1',
        title: 'Partition Form',
        content: `If \(\\{A_i\\}\) is a partition with positive probability,
\\[
\\mathbb{E}[X]=\\sum_i \\mathbb{E}[X\\mid A_i]P(A_i)
\\]`
      },
      {
        id: 'B2',
        title: 'Discrete Random Variable Form',
        content: `For discrete \(Y\),
\\[
\\mathbb{E}[X]=\\sum_y \\mathbb{E}[X\\mid Y=y]P(Y=y)
\\]`
      },
      {
        id: 'B3',
        title: 'Worked Example Pattern',
        content: `Most two-stage stories (pick route, pick market regime, pick machine mode) are weighted averages of conditional means.`
      }
    ],
    keyTakeaways: [
      'Partitioning the sample space gives a direct weighted-average formula.',
      'The conditional mean values are numbers; weights come from scenario probabilities.'
    ],
    quiz: {
      question: 'In the discrete formula, what are the weights?',
      options: ['P(Y=y)', 'E[X|Y=y]', 'Var(X|Y=y)'],
      answerIndex: 0,
      explanation: 'Each conditional expectation is weighted by the chance of that y value.'
    }
  },
  {
    id: 'C',
    title: 'Module C: Continuous Conditioning',
    sections: [
      {
        id: 'C1',
        title: 'Continuous Form',
        content: `If \(Y\) has density \(f_Y\),
\\[
\\mathbb{E}[X]=\\int \\mathbb{E}[X\\mid Y=y]f_Y(y)\\,dy
\\]`
      },
      {
        id: 'C2',
        title: 'Interpretation',
        content: `Think of \(\\mathbb{E}[X\\mid Y=y]\) as a curve over y. The final expectation is the density-weighted average of that curve.`
      },
      {
        id: 'C3',
        title: 'Practical Workflow',
        content: `1) Derive \(\\mathbb{E}[X\\mid Y=y]\). 2) Multiply by \(f_Y(y)\). 3) Integrate over y.`
      }
    ],
    keyTakeaways: [
      'Continuous conditioning replaces sums with integrals.',
      'The inner conditional expectation is often far simpler than direct integration on X.'
    ],
    quiz: {
      question: 'What changes from discrete to continuous total expectation?',
      options: ['A sum becomes an integral weighted by density.', 'The inner expectation disappears.', 'The law no longer holds.'],
      answerIndex: 0,
      explanation: 'Same idea, different averaging operator.'
    }
  },
  {
    id: 'D',
    title: 'Module D: Tower Property and Iterated Conditioning',
    sections: [
      {
        id: 'D1',
        title: 'Tower Property',
        content: `\\[
\\mathbb{E}[\\mathbb{E}[X\\mid Y,Z]\\mid Y]=\\mathbb{E}[X\\mid Y]
\\]`
      },
      {
        id: 'D2',
        title: 'Meaning',
        content: `Averaging from more information (Y,Z) back to less information (Y) recovers the less-informed conditional expectation.`
      },
      {
        id: 'D3',
        title: 'Two-Stage Randomness',
        content: `Common in experiments where stage 1 selects context and stage 2 produces outcomes.`
      }
    ],
    keyTakeaways: [
      'Conditioning is information-based averaging.',
      'Nested expectations collapse in a consistent way.'
    ],
    quiz: {
      question: 'What does the tower property do conceptually?',
      options: ['Averages from fine information to coarse information.', 'Eliminates all uncertainty.', 'Only applies to Bernoulli variables.'],
      answerIndex: 0,
      explanation: 'Conditioning on more then averaging back to less returns the less-conditioned object.'
    }
  },
  {
    id: 'E',
    title: 'Module E: Choosing the Conditioning Variable',
    sections: [
      {
        id: 'E1',
        title: 'Heuristic Checklist',
        content: `Ask: which variable makes \(X\) easy to average if known? Is there a hidden mixture component, random count, or random environment?`
      },
      {
        id: 'E2',
        title: 'Common Patterns',
        content: `Mixtures, random sums, random parameters, and two-stage experiments are the highest-yield use cases.`
      },
      {
        id: 'E3',
        title: 'Pitfalls',
        content: `Bad conditioning can make inner expectation as hard as original. Also remember: \(\\mathbb{E}[X\\mid Y]\) is itself a random variable.`
      }
    ],
    keyTakeaways: [
      'Pick Y for simplification, not because it is available.',
      'Do not confuse E[X|Y] (random variable) with E[X|Y=y] (number).' 
    ],
    quiz: {
      question: 'Which is usually a strong conditioning choice?',
      options: ['A hidden scenario variable controlling the distribution of X.', 'Any variable with many categories.', 'A variable unrelated to X.'],
      answerIndex: 0,
      explanation: 'Good choices expose structure in X.'
    }
  },
  {
    id: 'F',
    title: 'Module F: Connections and Extensions',
    sections: [
      {
        id: 'F1',
        title: 'Total Variance (Optional)',
        content: `\\[
\\mathrm{Var}(X)=\\mathbb{E}[\\mathrm{Var}(X\\mid Y)] + \\mathrm{Var}(\\mathbb{E}[X\\mid Y])
\\]`
      },
      {
        id: 'F2',
        title: 'Law of Total Probability',
        content: `Total expectation parallels total probability: both average conditional quantities over scenarios.`
      },
      {
        id: 'F3',
        title: 'Engineering Uses',
        content: `Queueing, reliability, communications, Bayesian filtering, and Monte Carlo all use iterated expectations.`
      }
    ],
    keyTakeaways: [
      'Total expectation is the backbone of several decomposition identities.',
      'Engineering models often hide a natural conditioning variable.'
    ],
    quiz: {
      question: 'Which identity is a direct extension of total expectation?',
      options: ['Law of total variance', 'Cauchy-Schwarz inequality', 'Central limit theorem'],
      answerIndex: 0,
      explanation: 'Total variance decomposes total spread into conditional and between-scenario pieces.'
    }
  }
];