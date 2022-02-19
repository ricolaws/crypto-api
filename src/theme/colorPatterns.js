export const colorList = [
	"#0D265E",
	// "#ddad9d",
	"#C3BF6D",
	"#a8ac9b",
	"#3F8EFC",
	"#0Ca45A",
	"#db504a",
	// "#a6EAb8",
];

export const patternList = [
	"diagonal-right-left",
	"cross-dash",
	"zigzag",
	"weave",
	"plus",
	"dot",
	"diamond-box",
];

let c = 0;
export const colorPatterns = [];
for (let i = 0; i < colorList.length; i++) {
	for (let p = 0; p < patternList.length; p++) {
		colorPatterns.push([colorList[c], patternList[p]]);
		c++;
		if (c >= colorList.length) {
			c = 0;
		}
	}
}

export default colorList;
