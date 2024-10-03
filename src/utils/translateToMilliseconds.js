export default function translateToMilliseconds(min, sec) {
  const minToSec = min * 60;
  return (minToSec + sec) * 1000;
}
