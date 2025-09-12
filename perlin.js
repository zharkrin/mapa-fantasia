// perlin.js con soporte de semillas

let Perlin = {
  permutation: [],
  p: [],
  seed: 0,
  init: function(seed = Math.random() * 10000) {
    this.seed = seed;
    function randomSeeded(seed) {
      let x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }
    this.permutation = [];
    for (let i = 0; i < 256; i++) {
      this.permutation[i] = Math.floor(randomSeeded(seed + i) * 256);
    }
    this.p = this.permutation.concat(this.permutation);
  },
  fade: function(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  },
  lerp: function(t, a, b) {
    return a + t * (b - a);
  },
  grad: function(hash, x, y, z) {
    let h = hash & 15;
    let u = h < 8 ? x : y;
    let v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  },
  noise: function(x, y, z) {
    let X = Math.floor(x) & 255;
    let Y = Math.floor(y) & 255;
    let Z = Math.floor(z) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);

    let u = this.fade(x);
    let v = this.fade(y);
    let w = this.fade(z);

    let A = this.p[X] + Y;
    let AA = this.p[A] + Z;
    let AB = this.p[A + 1] + Z;
    let B = this.p[X + 1] + Y;
    let BA = this.p[B] + Z;
    let BB = this.p[B + 1] + Z;

    return this.lerp(w,
      this.lerp(v,
        this.lerp(u, this.grad(this.p[AA], x, y, z),
                     this.grad(this.p[BA], x - 1, y, z)),
        this.lerp(u, this.grad(this.p[AB], x, y - 1, z),
                     this.grad(this.p[BB], x - 1, y - 1, z))),
      this.lerp(v,
        this.lerp(u, this.grad(this.p[AA + 1], x, y, z - 1),
                     this.grad(this.p[BA + 1], x - 1, y, z - 1)),
        this.lerp(u, this.grad(this.p[AB + 1], x, y - 1, z - 1),
                     this.grad(this.p[BB + 1], x - 1, y - 1, z - 1)))
    );
  }
};