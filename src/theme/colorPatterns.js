export const colorList = [
	"#4ab18c",
	"#a8bbfc",
	"#e74f37",
	"#f7c945",
	"#C2D1D6",
	// "#13293D",
];

export const patternList = [
	"diagonal-right-left",
	"cross-dash",
	"zigzag",
	"weave",
	"diamond-box",
	"dot",

	"plus",
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
