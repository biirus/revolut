/**
 * Rounds towards nearest neighbour.
 * If equidistant, rounds towards even neighbour.
 * @param {BigJs} big
 */
export default function(big) {
  return big
    .round(2, 2)
    .toFixed(2)
    .toString();
}
