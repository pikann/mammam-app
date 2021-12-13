const epochs = [
  {name: 'year', seconds: 31536000},
  {name: 'month', seconds: 2592000},
  {name: 'day', seconds: 86400},
  {name: 'hour', seconds: 3600},
  {name: 'minute', seconds: 60},
  {name: 'second', seconds: 1},
];

const getDuration = (timeAgoInSeconds: number) => {
  for (let {name, seconds} of epochs) {
    const interval = Math.floor(timeAgoInSeconds / seconds);
    if (interval >= 1) {
      return {
        interval: interval,
        epoch: name,
      };
    }
  }
};

const timeAgo = (date: number) => {
  console.log(Date.now());
  console.log(date);
  const timeAgoInSeconds = Math.floor((Date.now() - date) / 1000);
  console.log(Date.now() - date);
  const duration = getDuration(timeAgoInSeconds);
  const suffix = duration?.interval === 1 ? '' : 's';
  return `${duration?.interval} ${duration?.epoch}${suffix} ago`;
};

export default timeAgo;
