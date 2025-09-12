// frontend/js/perlin.js
// Implementación básica de ruido Perlin 2D

let permutation = [];
for (let i = 0; i < 256; i++) {
  permutation[i] = Math.floor(Math.random() * 256);
}
permutation = permutation.concat(permutation);

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}

function grad(hash, x, y) {
  const h = hash & 3;
  const u = h < 2 ? x : y;
  const v = h < 2 ? y : x;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

export function perlin2(x, y) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;

  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);

  const u = fade(xf);
  const v = fade(yf);

  const aa = permutation[X + permutation[Y]];
  const ab = permutation[X + permutation[Y + 1]];
  const ba = permutation[X + 1 + permutation[Y]];
  const bb = permutation[X + 1 + permutation[Y + 1]];

  const x1 = lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u);
  const x2 = lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u);

  return lerp(x1, x2, v);
}