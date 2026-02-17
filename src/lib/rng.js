export function hashStringToSeed(input) {
  const str = String(input ?? 'seed');
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i += 1) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  h ^= h >>> 16;
  return h >>> 0;
}

export function createSeededRng(seedInput = 'seed') {
  let state = hashStringToSeed(seedInput) || 1;
  return function rng() {
    state += 0x6D2B79F5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function drawCategorical(probabilities, rng) {
  const u = rng();
  let cumulative = 0;
  for (let i = 0; i < probabilities.length; i += 1) {
    cumulative += probabilities[i];
    if (u <= cumulative) {
      return i;
    }
  }
  return probabilities.length - 1;
}

export function normalSample(mean, std, rng) {
  const u1 = Math.max(rng(), 1e-12);
  const u2 = rng();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + std * z;
}

export function exponentialSample(rate, rng) {
  return -Math.log(1 - rng()) / rate;
}

export function poissonSample(lambda, rng) {
  if (lambda <= 0) {
    return 0;
  }
  if (lambda < 30) {
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
      k += 1;
      p *= rng();
    } while (p > L);
    return k - 1;
  }
  const value = Math.round(normalSample(lambda, Math.sqrt(lambda), rng));
  return Math.max(0, value);
}

export function gammaSample(shape, scale, rng) {
  if (shape <= 0 || scale <= 0) {
    return 0;
  }
  if (shape < 1) {
    const u = rng();
    return gammaSample(shape + 1, scale, rng) * Math.pow(u, 1 / shape);
  }

  const d = shape - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);

  while (true) {
    let x;
    let v;
    do {
      x = normalSample(0, 1, rng);
      v = 1 + c * x;
    } while (v <= 0);

    v = v ** 3;
    const u = rng();
    if (u < 1 - 0.0331 * (x ** 4)) {
      return scale * d * v;
    }
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) {
      return scale * d * v;
    }
  }
}

export function betaSample(alpha, beta, rng) {
  const x = gammaSample(alpha, 1, rng);
  const y = gammaSample(beta, 1, rng);
  if (x + y === 0) {
    return 0.5;
  }
  return x / (x + y);
}