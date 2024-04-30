export enum Experiment {
  IV_FORCE_THREAD_UNROLL = 'IV_FORCE_THREAD_UNROLL',
  ELONGATOR_BY_DEFAULT = 'ELONGATOR_BY_DEFAULT',
  ELONGATOR_PROFILE_API = 'ELONGATOR_PROFILE_API',
  TWEET_DETAIL_API = 'TWEET_DETAIL_API',
  DISCORD_NATIVE_MULTI_IMAGE = 'DISCORD_NATIVE_MULTI_IMAGE',
  TRANSCODE_GIFS = 'TRANSCODE_GIFS'
}

type ExperimentConfig = {
  name: string;
  description: string;
  percentage: number;
};

const Experiments: { [key in Experiment]: ExperimentConfig } = {
  [Experiment.IV_FORCE_THREAD_UNROLL]: {
    name: 'IV force thread unroll',
    description: 'Force thread unroll for IVs',
    percentage: 0.1
  },
  [Experiment.ELONGATOR_BY_DEFAULT]: {
    name: 'Elongator by default',
    description: 'Enable Elongator by default (guest token lockout bypass)',
    percentage: 1
  },
  [Experiment.ELONGATOR_PROFILE_API]: {
    name: 'Elongator profile API',
    description: 'Use Elongator to load profiles',
    percentage: 1
  },
  [Experiment.TWEET_DETAIL_API]: {
    name: 'Tweet detail API',
    description: 'Use Tweet Detail API (where available with elongator)',
    percentage: 0.75
  },
  [Experiment.DISCORD_NATIVE_MULTI_IMAGE]: {
    name: 'Discord native multi-image',
    description: 'Use Discord native multi-image',
    percentage: 1
  },
  [Experiment.TRANSCODE_GIFS]: {
    name: 'Transcode GIFs',
    description: 'Transcode GIFs for Discord, etc.',
    percentage: 1
  }
};

export const experimentCheck = (experiment: Experiment, condition = true) => {
  console.log(`Checking experiment ${experiment}`);
  const experimentEnabled = Experiments[experiment].percentage > Math.random() && condition;
  console.log(`Experiment ${experiment} enabled: ${experimentEnabled}`);
  return experimentEnabled;
};
