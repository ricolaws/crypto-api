export const colorList = [
  "#0D265E",
  "#a8ac9b",
  "#3F8EFC",
  "#0Ca45A",
  "#D6EAF8",
];

const patternList = [
  "diagonal-right-left",
  "cross-dash",
  "zigzag",
  "weave",
  "plus",
  "dot",
  "diabond-box",
];

export const colorPatterns = colorList.flatMap((d) =>
  patternList.map((v) => v + d)
);

export default colorList;
