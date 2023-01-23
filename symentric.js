const a = [1, 2, 3];
const b = [2, 3, 4];

const x = a.filter((x) => !b.includes(x));
const y = b.filter((x) => !a.includes(x));

console.log(c);
