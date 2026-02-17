import {
  betaSample,
  createSeededRng,
  drawCategorical,
  exponentialSample,
  gammaSample,
  normalSample,
  poissonSample,
} from './rng.js';

function sampleByType(type, parameters, rng) {
  switch (type) {
    case 'route_time':
      return rng() < parameters.busProb ? parameters.busTime : parameters.trainTime;
    case 'pizza_time':
      return rng() < parameters.mainProb ? parameters.mainTime : parameters.shortTime;
    case 'coin_mixture': {
      const p = rng() < parameters.coinAProb ? parameters.headA : parameters.headB;
      return rng() < p ? 1 : 0;
    }
    case 'dice_random_count': {
      const n = rng() < parameters.pOneDie ? 1 : 2;
      let sum = 0;
      for (let i = 0; i < n; i += 1) {
        sum += 1 + Math.floor(rng() * 6);
      }
      return sum;
    }
    case 'random_sum_poisson': {
      const n = poissonSample(parameters.lambda, rng);
      let sum = 0;
      for (let i = 0; i < n; i += 1) {
        sum += normalSample(parameters.mu, parameters.sigma, rng);
      }
      return sum;
    }
    case 'indicator_clicks': {
      const p = rng() < parameters.segmentAProb ? parameters.pA : parameters.pB;
      let x = 0;
      for (let i = 0; i < parameters.nUsers; i += 1) {
        if (rng() < p) {
          x += 1;
        }
      }
      return x;
    }
    case 'gaussian_mixture':
      return rng() < parameters.w1
        ? normalSample(parameters.m1, parameters.s1, rng)
        : normalSample(parameters.m2, parameters.s2, rng);
    case 'uniform_random_endpoint': {
      const y = rng();
      return rng() * y;
    }
    case 'exponential_random_rate': {
      const rate = rng() < parameters.rate1Prob ? parameters.rate1 : parameters.rate2;
      return exponentialSample(rate, rng);
    }
    case 'poisson_random_rate': {
      const lambda = rng() < parameters.pLow ? parameters.low : parameters.high;
      return poissonSample(lambda, rng);
    }
    case 'reliability_stress': {
      const mean = rng() < parameters.pHigh ? parameters.meanHigh : parameters.meanLow;
      const rate = 1 / mean;
      return exponentialSample(rate, rng);
    }
    case 'service_job_type': {
      const idx = drawCategorical(parameters.probs, rng);
      return parameters.means[idx];
    }
    case 'finance_scenarios': {
      const idx = drawCategorical(parameters.probs, rng);
      return normalSample(parameters.means[idx], parameters.stds[idx], rng);
    }
    case 'bayesian_predictive': {
      const theta = betaSample(parameters.alpha, parameters.beta, rng);
      return rng() < theta ? 1 : 0;
    }
    case 'tower_store_coupon': {
      const mall = rng() < parameters.pMall;
      const pCoupon = mall ? parameters.pCouponMall : parameters.pCouponLocal;
      const z = rng() < pCoupon ? 1 : 0;
      return 40 + (mall ? 20 : 0) - 10 * z;
    }
    case 'conditional_random_variable': {
      const y = rng() < 0.5 ? 0 : 1;
      return 10 * y;
    }
    case 'bad_conditioning_demo': {
      const congested = rng() < parameters.pCongested;
      return congested
        ? normalSample(parameters.meanCongested, 12, rng)
        : normalSample(parameters.meanClear, 6, rng);
    }
    case 'snr_capacity': {
      const good = rng() < parameters.pGood;
      const pool = good ? parameters.snrGood : parameters.snrBad;
      const snr = pool[Math.floor(rng() * pool.length)];
      return Math.log2(1 + snr);
    }
    case 'insurance_claims': {
      const lambda = rng() < parameters.pStandard ? parameters.lambdaStandard : parameters.lambdaPremium;
      return poissonSample(lambda, rng);
    }
    case 'manufacturing_defects': {
      const p = rng() < parameters.pDay ? parameters.defDay : parameters.defNight;
      let x = 0;
      for (let i = 0; i < parameters.nUnits; i += 1) {
        if (rng() < p) {
          x += 1;
        }
      }
      return x;
    }
    case 'bus_waiting': {
      const mean = rng() < parameters.pSmooth ? parameters.meanSmooth : parameters.meanHeavy;
      return exponentialSample(1 / mean, rng);
    }
    case 'clinical_response': {
      const p = rng() < parameters.pHigh ? parameters.respHigh : parameters.respLow;
      return rng() < p ? 1 : 0;
    }
    case 'network_packets': {
      const idx = drawCategorical(parameters.probs, rng);
      return poissonSample(parameters.lambdas[idx], rng);
    }
    case 'rainfall_regime': {
      const mild = rng() < parameters.pMild;
      const cfg = mild ? parameters.mild : parameters.intense;
      return gammaSample(cfg.shape, cfg.scale, rng);
    }
    default:
      return 0;
  }
}

function summarize(samples) {
  const n = samples.length;
  const mean = samples.reduce((acc, value) => acc + value, 0) / n;
  const variance = samples.reduce((acc, value) => acc + (value - mean) ** 2, 0) / Math.max(1, n - 1);
  const stdError = Math.sqrt(variance / n);
  const ciHalfWidth = 1.96 * stdError;
  return {
    mean,
    variance,
    ciLow: mean - ciHalfWidth,
    ciHigh: mean + ciHalfWidth,
  };
}

function buildConvergence(samples) {
  let runningTotal = 0;
  const x = [];
  const y = [];
  for (let i = 0; i < samples.length; i += 1) {
    runningTotal += samples[i];
    if ((i + 1) % Math.max(1, Math.floor(samples.length / 100)) === 0 || i === samples.length - 1) {
      x.push(i + 1);
      y.push(runningTotal / (i + 1));
    }
  }
  return { x, y };
}

export function runSimulation(example, sampleCount = 2000, seed = 'demo-seed') {
  const n = Math.max(100, Number(sampleCount) || 2000);
  const rng = createSeededRng(`${seed}-${example.id}`);
  const samples = [];

  for (let i = 0; i < n; i += 1) {
    samples.push(sampleByType(example.simulation.type, example.simulation.parameters, rng));
  }

  const stats = summarize(samples);
  const convergence = buildConvergence(samples);
  return {
    ...stats,
    convergence,
    count: n,
  };
}
