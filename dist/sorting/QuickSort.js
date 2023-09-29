import Sort from"./Sort.js";export default class QuickSort extends Sort{constructor(t){super(t)}partition(t,s){const r=this.array[s];let i=t-1;for(let e=t;e<=s-1;e++)this.steps.push({type:"compare",indices:[e,s]}),this.array[e]<r&&(i++,[this.array[i],this.array[e]]=[this.array[e],this.array[i]],this.steps.push({type:"swap",indices:[i,e]}));return[this.array[i+1],this.array[s]]=[this.array[s],this.array[i+1]],this.steps.push({type:"swap",indices:[i+1,s]}),i+1}quickSortHelper(t,s){if(t<s){const r=this.partition(t,s);this.quickSortHelper(t,r-1),this.quickSortHelper(r+1,s)}else t===s&&this.steps.push({type:"sorted",indices:[t,s]})}sort(){return this.quickSortHelper(0,this.array.length-1),this.steps.push({type:"finish",indices:[0,this.array.length-1]}),this.steps}}
//# sourceMappingURL=QuickSort.js.map