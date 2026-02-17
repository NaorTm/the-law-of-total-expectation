# AGENTS.md , Authoritative Specification for “Law of Total Expectation” Tutorial Website

## 0) Purpose, Audience, Outcomes

### 0.1 Goal
Build an educational website that teaches the Law of Total Expectation (also called the Tower Property) from intuition to rigorous usage, using many examples, interactive simulations, and practice problems with step by step solutions.

### 0.2 Target Audience
• Undergraduate students in probability and statistics  
• Engineering students who use probabilistic modeling  
• Advanced learners who want a clean bridge to sigma algebra conditioning

### 0.3 Learning Outcomes
By the end, the learner can:
1. State the law in discrete and continuous forms
2. Explain the intuition as “average of conditional averages”
3. Choose a useful conditioning variable in real problems
4. Compute expectations using partitions, random scenarios, mixture models, and random sums
5. Recognize when total expectation is simpler than direct computation
6. Understand the tower property in the sigma algebra form (light but correct)

---

## 1) Site Structure, Pages, Navigation

### 1.1 Global Layout
• Header with: Home, Tutorial, Example Library, Practice, Glossary, References  
• Left side navigation inside Tutorial pages, showing module list  
• Main content area with math rendering (KaTeX or MathJax)  
• Each section ends with: Key takeaways, Quick check quiz

### 1.2 Pages
1. Home
   • One paragraph overview, what you will learn  
   • Button: Start Tutorial  
   • Button: Explore Examples  
2. Tutorial (multi module)
3. Example Library (filterable)
4. Practice (problem sets)
5. Glossary (definitions)
6. References (books, lecture notes suggestions)

---

## 2) Tutorial Modules, Content Requirements

### Module A , Intuition and First Formula
A1. Motivation  
• Explain “complex expectation becomes easy after conditioning”  
• Give the height by faculty analogy  
A2. Core statement  
\[
\mathbb{E}[X] = \mathbb{E}\big[\mathbb{E}[X \mid Y]\big]
\]
A3. Micro example (2 scenarios)  
• A short story example, then compute in 2 lines  
A4. Key takeaways  
• Conditioning creates a simpler inner expectation  
• Outer expectation averages over the conditioning variable distribution

### Module B , Discrete Conditioning, Partitions
B1. Partition form  
If \(\{A_i\}\) is a partition with \(P(A_i) > 0\),
\[
\mathbb{E}[X] = \sum_i \mathbb{E}[X \mid A_i] P(A_i)
\]
B2. Discrete random variable form  
If \(Y\) is discrete:
\[
\mathbb{E}[X] = \sum_y \mathbb{E}[X \mid Y=y] P(Y=y)
\]
B3. Worked examples, at least 6 (see Example Library section)

### Module C , Continuous Conditioning
C1. Continuous form  
If \(Y\) has density \(f_Y\),
\[
\mathbb{E}[X] = \int \mathbb{E}[X \mid Y=y] f_Y(y)\,dy
\]
C2. Practice with integrals  
• At least 4 examples where the inner conditional expectation is simple, but direct expectation is messy

### Module D , Tower Property and Iterated Conditioning
D1. Tower property (nested conditioning)
\[
\mathbb{E}[\mathbb{E}[X \mid Y,Z] \mid Y] = \mathbb{E}[X \mid Y]
\]
D2. Practical meaning  
• “If you already know more information, then averaging it back to less information returns the less informed conditional expectation”
D3. Example with two stage randomness (at least 3)

### Module E , Strategy for Choosing the Conditioning Variable
E1. Heuristic checklist  
Ask:
1. What variable makes \(X\) easy to average if known
2. Can I express \(X\) as a sum of indicators after conditioning
3. Is there a hidden scenario variable, a mixture component, a random count, a random rate, a random environment
E2. Common patterns  
• Mixture distributions  
• Random number of trials, random sums  
• Random parameters (Bayesian style)  
• Two stage experiments (choose, then sample)  
E3. Pitfalls  
• Conditioning on too much, inner expectation becomes as hard as original  
• Forgetting that \(\mathbb{E}[X \mid Y]\) is a random variable  
• Confusing \(\mathbb{E}[X \mid Y]\) with \(\mathbb{E}[X \mid Y=y]\)

### Module F , Connections (Optional but included)
F1. Total variance (brief extension, optional toggle)
\[
\mathrm{Var}(X)=\mathbb{E}[\mathrm{Var}(X\mid Y)] + \mathrm{Var}(\mathbb{E}[X\mid Y])
\]
F2. Law of total probability reminder  
F3. Where it appears in engineering  
• Queueing, reliability, communications, Bayesian filtering, Monte Carlo estimation

---

## 3) Interactive Components, Required Features

### 3.1 Conditional Expectation Visualizer
A widget that shows:
• Choose discrete or continuous  
• Pick a scenario variable \(Y\)  
• Show \(\mathbb{E}[X \mid Y=y]\) as a function of y  
• Then show outer averaging step to compute \(\mathbb{E}[X]\)

Implementation ideas:
• Discrete: bar chart of \(P(Y=y)\) and values \(\mathbb{E}[X\mid Y=y]\)  
• Continuous: plot of \(\mathbb{E}[X\mid Y=y]\), and density \(f_Y(y)\), and numeric integral estimate

### 3.2 Tree Diagram Builder
For two stage experiments:
• Stage 1 branches represent \(Y\) values with probabilities  
• Stage 2 shows conditional distribution of \(X\) given each branch  
• Automatically computes \(\mathbb{E}[X]\) via weighted average

### 3.3 Monte Carlo Simulator
For each example:
• Button: Run simulation (N samples)  
• Display simulated mean with confidence interval  
• Display theoretical mean computed via law of total expectation  
• Show convergence plot versus N

### 3.4 Step by Step Solution Reveal
Each example solution has:
• Step 1, identify conditioning variable  
• Step 2, compute inner expectation  
• Step 3, compute outer expectation  
• Step 4, check intuition, optional simulation

### 3.5 Example Library Filters
Filters:
• Difficulty: Intro, Intermediate, Advanced  
• Type: Discrete, Continuous, Mixed  
• Pattern: Mixture, Random count, Random rate, Two stage, Indicators, Bayesian  
• Domain: Games, Transport, Reliability, Finance, Communications, Queues

---

## 4) Example Library, Many Worked Examples

Provide at least 18 total examples. Each must include:
• Problem statement  
• “Choose Y” explanation  
• Full solution using total expectation  
• Optional alternate method (short)  
• Simulation code snippet in JS or Python style  
• Key takeaway in one sentence

Below is the minimum required set of examples and their solutions.

### Example 1 , Two routes (intro)
Let \(T\) be travel time. Choose route \(Y \in \{\text{bus},\text{train}\}\).
Given:
• \(P(Y=\text{bus})=0.7\), \(\mathbb{E}[T\mid Y=\text{bus}]=30\)  
• \(P(Y=\text{train})=0.3\), \(\mathbb{E}[T\mid Y=\text{train}]=15\)  
Compute:
\[
\mathbb{E}[T]=0.7\cdot 30+0.3\cdot 15=25.5
\]

### Example 2 , Pizza courier (intro, your challenge)
\(P(Y=\text{main})=0.8\), \(\mathbb{E}[T\mid Y=\text{main}]=20\)  
\(P(Y=\text{short})=0.2\), \(T\mid Y=\text{short}=10\)  
\[
\mathbb{E}[T]=0.8\cdot 20+0.2\cdot 10=18
\]

### Example 3 , Random coin bias (mixture)
Pick a coin:
• With prob 0.6 choose coin A with \(p_A=0.2\)  
• With prob 0.4 choose coin B with \(p_B=0.8\)  
Flip once, let \(X=1\) if heads.
Condition on \(Y\in\{A,B\}\):
\[
\mathbb{E}[X]=\mathbb{E}[\mathbb{E}[X\mid Y]] = 0.6\cdot 0.2 + 0.4\cdot 0.8 = 0.44
\]

### Example 4 , Dice, random number of dice (random count)
Let \(N\) be number of fair dice rolled:
• \(P(N=1)=0.5\), \(P(N=2)=0.5\)  
Let \(S\) be the sum.
\[
\mathbb{E}[S\mid N=n]=n\cdot 3.5
\]
So
\[
\mathbb{E}[S]=\mathbb{E}[3.5N]=3.5\mathbb{E}[N]=3.5\cdot (1\cdot 0.5 + 2\cdot 0.5)=5.25
\]

### Example 5 , Random sum of i.i.d. (general pattern)
Let \(S=\sum_{i=1}^N X_i\), with \(X_i\) i.i.d., \(\mathbb{E}[X_i]=\mu\), independent of \(N\).
Condition on \(N\):
\[
\mathbb{E}[S\mid N]=N\mu
\]
Then
\[
\mathbb{E}[S]=\mathbb{E}[N\mu]=\mu\mathbb{E}[N]
\]
Include a concrete numeric instance with \(N\sim\text{Poisson}(\lambda)\), so \(\mathbb{E}[S]=\mu\lambda\).

### Example 6 , Indicator trick (expected number of successes)
There are 10 users. Each user clicks with probability \(P_i\) that depends on segment \(Y\in\{\text{A},\text{B}\}\).
Let \(X\) be total clicks, write \(X=\sum_{i=1}^{10} I_i\).
Conditioning on \(Y\):
\[
\mathbb{E}[X\mid Y]=\sum_{i=1}^{10}\mathbb{E}[I_i\mid Y]=\sum_{i=1}^{10} P(I_i=1\mid Y)
\]
Then average over \(Y\).

### Example 7 , Mixture of Gaussians (continuous mixture)
Let \(Y\in\{1,2\}\) with \(P(Y=1)=0.3\), \(P(Y=2)=0.7\).  
\(X\mid Y=1 \sim \mathcal{N}(0,1)\), \(X\mid Y=2 \sim \mathcal{N}(5,4)\).
Then \(\mathbb{E}[X\mid Y=1]=0\), \(\mathbb{E}[X\mid Y=2]=5\).
\[
\mathbb{E}[X]=0.3\cdot 0+0.7\cdot 5=3.5
\]

### Example 8 , Uniform with random endpoint (continuous)
Let \(Y \sim \text{Uniform}(0,1)\). Given \(Y=y\), let \(X\mid Y=y \sim \text{Uniform}(0,y)\).
Then \(\mathbb{E}[X\mid Y=y]=y/2\).
So
\[
\mathbb{E}[X]=\mathbb{E}[Y/2]=\frac{1}{2}\cdot \mathbb{E}[Y]=\frac{1}{2}\cdot \frac{1}{2}= \frac{1}{4}
\]

### Example 9 , Exponential with random rate (random environment)
Let \(Y\) be the rate. Suppose:
• With prob 0.5, \(Y=1\)  
• With prob 0.5, \(Y=2\)  
Given \(Y=y\), \(X\mid Y=y \sim \text{Exponential}(y)\), so \(\mathbb{E}[X\mid Y=y]=1/y\).
Thus
\[
\mathbb{E}[X]=0.5\cdot 1 + 0.5\cdot \frac{1}{2} = 0.75
\]

### Example 10 , Poisson with random rate (compound)
Given \(\Lambda\), \(N\mid \Lambda \sim \text{Poisson}(\Lambda)\), so \(\mathbb{E}[N\mid \Lambda]=\Lambda\).
Therefore
\[
\mathbb{E}[N]=\mathbb{E}[\Lambda]
\]
Provide numeric: \(\Lambda\) is 3 with prob 0.2, 10 with prob 0.8, so \(\mathbb{E}[N]=0.2\cdot 3+0.8\cdot 10=8.6\).

### Example 11 , Reliability, system lifetime with random stress level
Let stress \(Y\in\{\text{low},\text{high}\}\) with \(P(\text{high})=0.3\).  
Assume \(T\mid Y=\text{low}\) has mean 1000 hours, \(T\mid Y=\text{high}\) has mean 400 hours.
\[
\mathbb{E}[T]=0.7\cdot 1000+0.3\cdot 400=820
\]

### Example 12 , Queueing style, service time depends on job type
Job type \(Y\in\{A,B,C\}\) with probabilities \(0.2,0.5,0.3\).  
Means: \(E[S\mid A]=2\), \(E[S\mid B]=5\), \(E[S\mid C]=1\).
\[
E[S]=0.2\cdot 2+0.5\cdot 5+0.3\cdot 1=3.2
\]

### Example 13 , Finance, expected payoff under scenarios
Scenario \(Y\) is market state. Payoff \(X\) depends on state.  
Compute \(\mathbb{E}[X]\) as weighted average of scenario conditional expectations.  
Include at least one example where \(X\mid Y\) is random, not deterministic.

### Example 14 , Bayesian predictive expectation (light)
Let \(\Theta\) be unknown parameter. We want \(\mathbb{E}[X]\).
\[
\mathbb{E}[X]=\mathbb{E}[\mathbb{E}[X\mid \Theta]]
\]
Concrete: If \(X\mid \Theta=\theta\) is Bernoulli(\(\theta\)), then \(\mathbb{E}[X\mid \Theta]=\Theta\), so \(\mathbb{E}[X]=\mathbb{E}[\Theta]\).

### Example 15 , Two layer tower (Y then Z)
Let \(X\) depend on both \(Y\) and \(Z\).  
Show:
\[
\mathbb{E}[X]=\mathbb{E}\big[\mathbb{E}[X\mid Y,Z]\big]=\mathbb{E}\big[\mathbb{E}[\mathbb{E}[X\mid Y,Z]\mid Y]\big]
\]
Provide a numeric two stage story, for example store choice then discount coupon.

### Example 16 , Conditional expectation as a random variable (conceptual)
Take \(Y\in\{0,1\}\) equally likely, and \(X=10Y\).  
Then \(\mathbb{E}[X\mid Y]=10Y\) which is random, and outer expectation gives 5.

### Example 17 , When conditioning makes it harder (pitfall)
Include a “bad choice” conditioning variable example and explain why it fails, then show a better choice.

### Example 18 , Engineering flavored, SNR depends on channel state
Channel state \(Y\) selects SNR distribution.  
Compute expected capacity \(C=\log_2(1+\text{SNR})\) via:
\[
\mathbb{E}[C]=\mathbb{E}[\mathbb{E}[C\mid Y]]
\]
Use simple numeric approximations or discrete SNR states to keep it accessible.

Minimum requirement: implement all 18 examples above, plus add at least 6 additional examples of the same patterns, total at least 24.

---

## 5) Practice Section, Problem Sets

### 5.1 Levels
• Level 1, direct scenario weighted averages, 10 problems  
• Level 2, random sums, mixtures, indicators, 12 problems  
• Level 3, continuous conditioning integrals, 12 problems  
• Level 4, tower property with two conditioning variables, 8 problems

### 5.2 Each Problem Must Include
• Problem statement  
• Hint 1, identify Y  
• Hint 2, compute inner expectation  
• Full solution with steps  
• Optional simulation check

---

## 6) Glossary Requirements
Include definitions with examples:
• Random variable, expectation  
• Conditional expectation, both \(\mathbb{E}[X\mid Y]\) and \(\mathbb{E}[X\mid Y=y]\)  
• Partition of sample space  
• Density and pmf  
• Tower property  
Optional advanced toggle:
• Sigma algebra intuition, “information sets”

---

## 7) References Section
List reputable sources, no long quotes:
• Sheldon Ross, A First Course in Probability  
• Grimmett and Stirzaker, Probability and Random Processes  
• Durrett, Probability, for advanced learners  
• Any university lecture notes linkouts are optional

---

## 8) Technical Implementation Requirements (Web)

### 8.1 Frontend
• Next.js or React SPA  
• KaTeX or MathJax for math  
• Charts using Plotly or D3  
• Clean UI, mobile friendly

### 8.2 Data Model for Examples
Store each example as JSON:
• id, title, difficulty, patternTags, domainTags  
• problemMarkdown  
• solutionSteps, array of step objects {title, explanationMarkdown, mathLatex}  
• simulation, with parameters and JS function to sample  
• expectedValueLatex, final result  

### 8.3 Deterministic Randomness
Simulation should support a seeded RNG so that results are reproducible for demos.

### 8.4 Accessibility
• Keyboard navigation for step reveals  
• Math readable, good contrast

---

## 9) Acceptance Criteria
A build is accepted when:
1. All tutorial modules A to F exist and render correctly
2. Example Library contains at least 24 examples, including the required 18 above
3. Each example has full step by step solution, plus simulation check
4. Practice section includes the required problem counts with hints and solutions
5. Visualizer, Tree Builder, and Monte Carlo widgets are implemented
6. Math rendering and charts work on desktop and mobile
7. No broken navigation, no missing content

