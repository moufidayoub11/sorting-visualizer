import Sort from"./Sort.js";export default class BubbleSort extends Sort{constructor(s){super(s)}sort(){const s=this.array.length;for(let t=0;t<s;t++)for(let t=0;t<s-1;t++)this.steps.push({type:"compare",indices:[t,t+1]}),this.array[t]>this.array[t+1]&&([this.array[t],this.array[t+1]]=[this.array[t+1],this.array[t]],this.steps.push({type:"swap",indices:[t,t+1]}));return this.steps.push({type:"finish",indices:[0,s-1]}),this.steps}}
//# sourceMappingURL=BubbleSort.js.map