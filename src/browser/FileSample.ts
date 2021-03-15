import { Readable } from "stream";
const totalRangesize = 2097152;
const sliceSize = 20;
const buf = Buffer.alloc(totalRangesize, "a");

export const readStream = new Readable({
	read() {
		this.push(buf);
		this.push(null);
	},
});
