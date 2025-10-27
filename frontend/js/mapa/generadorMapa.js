// =========================================
// generadorMapa.js
// =========================================
// Generador coherente de mapa (biomas, montañas, ríos, terrenos especiales)
// Ruta recomendada: frontend/js/mapa/generadorMapa.js
// =========================================

(function (global) {
  'use strict';

  // -----------------------------
  // Configuración
  // -----------------------------
  const CELL = 32; // tamaño de celda en px (cuadrícula)
  const MARGIN = 8; // margen en px para no dibujar en el borde exacto

  // Definición simple de biomas según temperatura y humedad
  const BIOMAS = [
    { id: 'tundra', label: 'Tundra', color: '#cfe8f2' },
    { id: 'glaciar', label: 'Glaciar', color: '#eaf6ff' },
    { id: 'taiga', label: 'Taiga', color: '#9fc5a1' },
    { id: 'bosque', label: 'Bosque', color: '#3b7a57' },
    { id: 'pradera', label: 'Pradera', color: '#a7d49b' },
    { id: 'sabana', label: 'Sabana', color: '#d6c27a' },
    { id: 'desierto', label: 'Desierto', color: '#e6c68a' },
    { id: 'pantano', label: 'Pantano', color: '#6b8b6b' },
    { id: 'costa', label: 'Costa', color: '#8fcde4' },
    { id: 'oceano', label: 'Océano', color: '#6fb0e6' }
  ];

  // Íconos / clases opcionales (si usas iconos en carpeta, puedes enlazarlos luego)
  // Aquí solo integramos tipos; el dibujo de iconos se hace en el DOM principal.

  // -----------------------------
  // Funciones utilitarias
  // -----------------------------
  function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Generador pseudoaleatorio con semilla (LCG simple)
  function LCG(seed) {
    let state = seed >>> 0;
    return function () {
      state = (1664525 * state + 1013904223) >>> 0;
      return state / 0xffffffff;
    };
  }

  // Interpolación lineal
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // Noise 2D simple (value noise) para variaciones suaves
  function makeNoise2D(seed) {
    const rnd = LCG(seed || Date.now());
    // crear una cuadrícula de valores aleatorios
    const grid = {};
    function valueAt(ix, iy) {
      const key = ix + ',' + iy;
      if (grid[key] !== undefined) return grid[key];
      // nuevo valor pseudoaleatorio en [-1,1]
      grid[key] = rnd() * 2 - 1;
      return grid[key];
    }
    return function (x, y, scale = 1) {
      const fx = x / scale;
      const fy = y / scale;
      const ix = Math.floor(fx);
      const iy = Math.floor(fy);
      const tx = fx - ix;
      const ty = fy - iy;
      // los cuatro valores de la celda
      const v00 = valueAt(ix, iy);
      const v10 = valueAt(ix + 1, iy);
      const v01 = valueAt(ix, iy + 1);
      const v11 = valueAt(ix + 1, iy + 1);
      // interpolaciones
      const ix0 = lerp(v00, v10, tx);
      const ix1 = lerp(v01, v11, tx);
      return lerp(ix0, ix1, ty); // en [-1,1]
    };
  }

  // -----------------------------
  // Generador de mapa coherente
  // -----------------------------
  const GeneradorMapa = {
    config: {
      cellSize: CELL,
      mountainCount: 3,
      riverAttempts: 6,
      specialCount: 3
    },

    // genera estructura interna del mapa (grilla)
    generarGrid: function (width, height) {
      const cols = Math.ceil(width / this.config.cellSize);
      const rows = Math.ceil(height / this.config.cellSize);
      const grid = new Array(rows);
      for (let r = 0; r < rows; r++) {
        grid[r] = new Array(cols);
      }
      return { cols, rows, grid, width, height };
    },

    // Mapear temperatura por latitud (arriba = frío, abajo = cálido) + ruido
    asignarTemperaturaHumedad: function (mapa, seed) {
      const noise = makeNoise2D(seed || 12345);
      for (let r = 0; r < mapa.rows; r++) {
        for (let c = 0; c < mapa.cols; c++) {
          const y = (r + 0.5) * this.config.cellSize;
          // temperatura básica: 1 en sur (y mayor), 0 en norte
          const tempLat = 1 - (y / mapa.height);
          const tempNoise = (noise(c * 0.7, r * 0.7, 8) + 1) * 0.5 * 0.15; // pequeño ruido
          const temperature = Math.max(0, Math.min(1, tempLat + tempNoise));
          // humedad por pseudo-aleatorio (más humedad cerca de 'centro horizontal' o con ruido)
          const moisture = Math.max(0, Math.min(1, (noise(c * 1.1 + 50, r * 0.8 + 50, 10) + 1) * 0.5));
          mapa.grid[r][c] = {
            r, c,
            temperature,
            moisture,
            elevation: 0,
            biome: null,
            terrain: null,
            river: false
          };
        }
      }
    },

    // Asignar biomas en función de temperature + moisture
    asignarBiomas: function (mapa) {
      for (let r = 0; r < mapa.rows; r++) {
        for (let c = 0; c < mapa.cols; c++) {
          const cell = mapa.grid[r][c];
          const t = cell.temperature;
          const m = cell.moisture;
          // heurísticas simples
          if (t < 0.15 && m < 0.4) cell.biome = 'glaciar';
          else if (t < 0.25) cell.biome = 'tundra';
          else if (t < 0.4) cell.biome = (m > 0.5 ? 'taiga' : 'pradera');
          else if (t < 0.6) {
            if (m < 0.2) cell.biome = 'desierto';
            else if (m < 0.4) cell.biome = 'pradera';
            else cell.biome = 'bosque';
          } else {
            if (m < 0.25) cell.biome = 'desierto';
            else if (m < 0.45) cell.biome = 'sabana';
            else cell.biome = 'selva';
          }
          // costeras / oceano si fila en borde y humedad alta
          if (r >= mapa.rows - 2 && cell.moisture > 0.6) cell.biome = 'oceano';
          if (r === mapa.rows - 1) cell.biome = 'oceano';
        }
      }
    },

    // Crear cordilleras montañosas: random walk desde un seed
    generarMontanas: function (mapa, seed) {
      const rnd = LCG(seed || Date.now());
      const count = this.config.mountainCount;
      for (let i = 0; i < count; i++) {
        // elegir borde norte/centro como origen montañoso
        const startC = Math.floor(rnd() * mapa.cols);
        const startR = Math.floor((rnd() * 0.35) * mapa.rows); // preferencia hacia norte/centro
        let len = Math.floor(rnd() * (mapa.rows * 0.5)) + 6;
        let r = startR, c = startC;
        for (let s = 0; s < len; s++) {
          // marcar montaña y aumentar elevación
          if (r >= 0 && r < mapa.rows && c >= 0 && c < mapa.cols) {
            mapa.grid[r][c].elevation += Math.floor(3 + rnd() * 6);
            mapa.grid[r][c].terrain = 'montanas';
          }
          // moverse con cierta tendencia hacia el sur y lateral
          r += Math.round((rnd() - 0.5) * 1.5 + 0.5); // tender al sur
          c += Math.round((rnd() - 0.5) * 1.2);
        }
      }
    },

    // Suavizar elevación y propagar
    suavizarElevacion: function (mapa) {
      // propagar elevación a vecinos para crear pendientes
      for (let iter = 0; iter < 2; iter++) {
        const copia = mapa.grid.map(row => row.map(c => c.elevation));
        for (let r = 0; r < mapa.rows; r++) {
          for (let c = 0; c < mapa.cols; c++) {
            let sum = copia[r][c];
            let cnt = 1;
            [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]].forEach(offset => {
              const rr = r + offset[0], cc = c + offset[1];
              if (rr >= 0 && rr < mapa.rows && cc >= 0 && cc < mapa.cols) {
                sum += copia[rr][cc];
                cnt++;
              }
            });
            mapa.grid[r][c].elevation = Math.round(sum / cnt);
          }
        }
      }
    },

    // Generar ríos: tomar fuentes en elevación alta y bajar hacia borde
    generarRios: function (mapa, seed) {
      const rnd = LCG(seed || Date.now() + 9876);
      const attempts = this.config.riverAttempts;
      for (let a = 0; a < attempts; a++) {
        // buscar una celda con elevación alta
        let tries = 0;
        let sr, sc;
        do {
          sr = Math.floor(rnd() * mapa.rows);
          sc = Math.floor(rnd() * mapa.cols);
          tries++;
        } while ((mapa.grid[sr][sc].elevation < 4 || mapa.grid[sr][sc].biome === 'oceano') && tries < 200);
        // simular flujo: cada paso moverse a vecino con menor elevación (o hacia sur si empate)
        let r = sr, c = sc; let path = [];
        for (let step = 0; step < mapa.rows * 2; step++) {
          path.push([r, c]);
          mapa.grid[r][c].river = true;
          // si estamos en la orilla sur o en océano, terminar
          if (r >= mapa.rows - 1 || mapa.grid[r][c].biome === 'oceano') break;
          // buscar vecino con menor elevación
          let best = { rr: r, cc: c, elev: mapa.grid[r][c].elevation };
          [[1,0], [1,1], [1,-1], [0,1], [0,-1], [-1,0], [ -1,1], [-1,-1]].forEach(off => {
            const rr = r + off[0], cc = c + off[1];
            if (rr >= 0 && rr < mapa.rows && cc >= 0 && cc < mapa.cols) {
              const elev = mapa.grid[rr][cc].elevation;
              if (elev < best.elev) {
                best = { rr, cc, elev };
              }
            }
          });
          // si no encontramos descenso, empujar hacia sur
          if (best.rr === r && best.cc === c) {
            r = Math.min(mapa.rows - 1, r + 1);
          } else {
            r = best.rr; c = best.cc;
          }
        }
      }
    },

    // Asignar terrenos concretos (ríos, lagos, montañas) al grid para dibujo
    asignarTerrenosDesdeGrid: function (mapa) {
      for (let r = 0; r < mapa.rows; r++) {
        for (let c = 0; c < mapa.cols; c++) {
          const cell = mapa.grid[r][c];
          if (cell.elevation >= 6) cell.terrain = 'montanas';
          if (cell.river) cell.terrain = 'rio';
          if (cell.biome === 'oceano') cell.terrain = 'oceano';
          // pequeños lagos: si humedad alta y no oceano y no montaña
          if (!cell.terrain && cell.moisture > 0.75 && cell.biome !== 'oceano') cell.terrain = 'lago';
          // pantano si humedad alta y baja elevación
          if (!cell.terrain && cell.moisture > 0.6 && cell.elevation <= 1) cell.terrain = 'pantano';
        }
      }
    },

    // Generar terrenos especiales usando función externa si existe, si no usa interno
    generarTerrenosEspecialesIntegrados: function (mapa) {
      // si existe la función global generarTerrenosEspeciales(mapa,cantidad), la usamos
      if (typeof global.generarTerrenosEspeciales === 'function') {
        try {
          const externos = global.generarTerrenosEspeciales(mapa, this.config.specialCount);
          // esperamos array de {nombre, icono, x, y} o similar; adaptamos
          return externos.map(e => {
            // si vienen x,y en px: ok; si vienen r,c las convertimos
            return {
              nombre: e.nombre || (e.tipo || 'Especial'),
              icono: e.icono || (e.tipo ? `frontend/static/Img/icons/terreno_especial/${e.tipo}.png` : ''),
              x: (typeof e.x === 'number') ? e.x : Math.floor(Math.random() * mapa.width),
              y: (typeof e.y === 'number') ? e.y : Math.floor(Math.random() * mapa.height)
            };
          });
        } catch (err) {
          console.warn('Generador externo falló, usando interno:', err);
        }
      }

      // Fallback interno: colocar especiales con preferencia por determinadas zonas
      const specials = [];
      // volcanes -> en montañas activas (elevacion alta)
      const volcanoes = this._buscarCeldasPorCondicion(mapa, cell => cell.elevation >= 6);
      const glaciers = this._buscarCeldasPorCondicion(mapa, cell => cell.biome === 'tundra' || cell.biome === 'glaciar');
      const lakes = this._buscarCeldasPorCondicion(mapa, cell => cell.terrain === 'lago');
      // crear una mezcla con prioridades
      // 1 volcano (si available), 1 glacier (si available), 1 lake special
      if (volcanoes.length) {
        const v = volcanoes[Math.floor(Math.random() * volcanoes.length)];
        specials.push({
          nombre: 'Volcán ' + this._nombreAleatorioCorto(),
          icono: 'frontend/static/Img/icons/terreno_especial/volcan_especial.png',
          x: (v.c + 0.5) * this.config.cellSize,
          y: (v.r + 0.5) * this.config.cellSize
        });
      }
      if (glaciers.length) {
        const g = glaciers[Math.floor(Math.random() * glaciers.length)];
        specials.push({
          nombre: 'Glaciar ' + this._nombreAleatorioCorto(),
          icono: 'frontend/static/Img/icons/terreno_especial/glaciar_especial.png',
          x: (g.c + 0.5) * this.config.cellSize,
          y: (g.r + 0.5) * this.config.cellSize
        });
      }
      // lake special
      if (lakes.length) {
        const l = lakes[Math.floor(Math.random() * lakes.length)];
        specials.push({
          nombre: 'Lago ' + this._nombreAleatorioCorto(),
          icono: 'frontend/static/Img/icons/terreno_especial/lago_especial.png',
          x: (l.c + 0.5) * this.config.cellSize,
          y: (l.r + 0.5) * this.config.cellSize
        });
      }
      // if still less than desired, place random specials in forests/praderas
      const attempts = this.config.specialCount - specials.length;
      for (let i = 0; i < attempts; i++) {
        const r = Math.floor(Math.random() * mapa.rows);
        const c = Math.floor(Math.random() * mapa.cols);
        specials.push({
          nombre: 'Lugar ' + this._nombreAleatorioCorto(),
          icono: 'frontend/static/Img/icons/terreno_especial/bosque_especial.png',
          x: (c + 0.5) * this.config.cellSize,
          y: (r + 0.5) * this.config.cellSize
        });
      }

      return specials;
    },

    _buscarCeldasPorCondicion: function (mapa, fn) {
      const out = [];
      for (let r = 0; r < mapa.rows; r++) {
        for (let c = 0; c < mapa.cols; c++) {
          const cell = mapa.grid[r][c];
          if (fn(cell)) out.push(cell);
        }
      }
      return out;
    },

    _nombreAleatorioCorto: function () {
      const a = ['Al', 'Bel', 'Cal', 'Dor', 'El', 'Fal', 'Gal', 'Har', 'Il', 'Jar'];
      const b = ['dor', 'mir', 'thas', 'wen', 'gorn', 'lith', 'nar', 'vorn', 'dell', 'crest'];
      return a[Math.floor(Math.random() * a.length)] + b[Math.floor(Math.random() * b.length)];
    },

    // DIBUJO: renderizar en el contenedor (DOM)
    renderizarMapa: function (mapa, opciones = {}) {
      const cont = document.getElementById(opciones.contenedorId || 'mapa-container');
      if (!cont) {
        console.warn('Contenedor no encontrado para dibujar mapa');
        return;
      }
      // limpiar
      cont.innerHTML = '';
      cont.style.position = 'relative';
      cont.style.overflow = 'hidden';

      // Crear canvas para pintar biomas de fondo (mejor rendimiento)
      const canvas = document.createElement('canvas');
      canvas.width = mapa.width;
      canvas.height = mapa.height;
      canvas.style.width = mapa.width + 'px';
      canvas.style.height = mapa.height + 'px';
      const ctx = canvas.getContext('2d');

      // Dibujar biomas por celdas
      for (let r = 0; r < mapa.rows; r++) {
        for (let c = 0; c < mapa.cols; c++) {
          const cell = mapa.grid[r][c];
          const x = c * this.config.cellSize;
          const y = r * this.config.cellSize;
          // color por biome
          const color = this._colorPorBiome(cell.biome);
          ctx.fillStyle = color;
          ctx.fillRect(x, y, this.config.cellSize, this.config.cellSize);
        }
      }

      // Dibujar elevación ligera (sombras para montañas)
      for (let r = 0; r < mapa.rows; r++) {
        for (let c = 0; c < mapa.cols; c++) {
          const cell = mapa.grid[r][c];
          if (cell.elevation >= 4) {
            const x = c * this.config.cellSize;
            const y = r * this.config.cellSize;
            const h = Math.min(1, cell.elevation / 10);
            ctx.fillStyle = `rgba(60,60,60,${0.06 * h})`;
            ctx.fillRect(x, y, this.config.cellSize, this.config.cellSize);
          }
        }
      }

      // Append canvas
      cont.appendChild(canvas);

      // Dibujar ríos con elementos SVG para mejor apariencia
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('width', mapa.width);
      svg.setAttribute('height', mapa.height);
      svg.style.position = 'absolute';
      svg.style.left = '0';
      svg.style.top = '0';
      svg.style.pointerEvents = 'none';

      // recorrer y dibujar lineas en celdas donde river=true
      for (let r = 0; r < mapa.rows; r++) {
        for (let c = 0; c < mapa.cols; c++) {
          const cell = mapa.grid[r][c];
          if (cell.river) {
            const cx = c * this.config.cellSize + this.config.cellSize / 2;
            const cy = r * this.config.cellSize + this.config.cellSize / 2;
            const circle = document.createElementNS(svgNS, 'circle');
            circle.setAttribute('cx', cx);
            circle.setAttribute('cy', cy);
            circle.setAttribute('r', Math.max(3, Math.min(6, 4)));
            circle.setAttribute('fill', '#2e9fff');
            svg.appendChild(circle);
          }
        }
      }

      cont.appendChild(svg);

      // Dibujar iconos de terrenos concretos (montañas/lago/pantano) como imgs
      for (let r = 0; r < mapa.rows; r++) {
        for (let c = 0; c < mapa.cols; c++) {
          const cell = mapa.grid[r][c];
          const x = c * this.config.cellSize;
          const y = r * this.config.cellSize;

          if (cell.terrain === 'montanas') {
            this._crearElementoIcono(cont, x + 4, y + 4, 'montanas');
          } else if (cell.terrain === 'lago') {
            this._crearElementoIcono(cont, x + 4, y + 4, 'lago');
          } else if (cell.terrain === 'pantano') {
            this._crearElementoIcono(cont, x + 4, y + 4, 'pantano');
          } else if (cell.terrain === 'oceano') {
            // nada, el fondo ya representa océano
          }
        }
      }

      // Generar y dibujar terrenos especiales
      const especiales = this.generarTerrenosEspecialesIntegrados(mapa);
      especiales.forEach(es => {
        const imgEl = document.createElement('img');
        imgEl.src = es.icono;
        imgEl.alt = es.nombre;
        imgEl.title = es.nombre;
        imgEl.style.position = 'absolute';
        // centrar icono en coordenadas
        imgEl.style.left = Math.max(MARGIN, Math.min(mapa.width - 48, Math.round(es.x - 24))) + 'px';
        imgEl.style.top = Math.max(MARGIN, Math.min(mapa.height - 48, Math.round(es.y - 24))) + 'px';
        imgEl.style.width = '48px';
        imgEl.style.height = '48px';
        imgEl.className = 'icono-terreno-especial';
        imgEl.onerror = function () {
          // fallback a placeholder localizado en terreno
          this.src = 'frontend/static/Img/icons/terreno/placeholder.png';
          this.style.opacity = '0.6';
        };
        cont.appendChild(imgEl);
      });

      // devolver info útil
      return {
        canvas, svg, especiales
      };
    },

    _colorPorBiome: function (biome) {
      switch (biome) {
        case 'glaciar': return '#f0fbff';
        case 'tundra': return '#d7eef9';
        case 'taiga': return '#bfe0c2';
        case 'bosque': return '#4a7a4e';
        case 'pradera': return '#a9d49a';
        case 'sabana': return '#dbc57f';
        case 'desierto': return '#e8d4a4';
        case 'selva': return '#2f7a45';
        case 'pantano': return '#6a8a6a';
        case 'oceano': return '#7fc0e8';
        default: return '#9fb6a0';
      }
    },

    _crearElementoIcono: function (contenedor, x, y, tipo) {
      // intentamos buscar icono disponible en static folder; si no existe se ignora
      const rutas = {
        montanas: 'frontend/static/Img/icons/terreno/montanas.png',
        lago: 'frontend/static/Img/icons/terreno/lago.png',
        pantano: 'frontend/static/Img/icons/terreno/pantano.png'
      };
      const src = rutas[tipo];
      if (!src) return;
      const img = document.createElement('img');
      img.src = src;
      img.style.position = 'absolute';
      img.style.left = Math.round(x) + 'px';
      img.style.top = Math.round(y) + 'px';
      img.style.width = '40px';
      img.style.height = '40px';
      img.alt = tipo;
      img.onerror = function () {
        this.style.display = 'none';
      };
      contenedor.appendChild(img);
    },

    // Función pública principal para generar todo el mapa
    generarMapaCompleto: function (opciones = {}) {
      // opciones: contenedorId, width, height, seed
      const contId = opciones.contenedorId || 'mapa-container';
      const cont = document.getElementById(contId);
      if (!cont) {
        console.error('Contenedor', contId, 'no encontrado');
        return;
      }
      // determinar tamaño
      const width = opciones.width || cont.clientWidth || 1000;
      const height = opciones.height || cont.clientHeight || 600;

      // crear estructura
      const mapa = this.generarGrid(width, height);
      // asignar temperatura y humedad
      this.asignarTemperaturaHumedad(mapa, opciones.seed || Date.now());
      // biomas
      this.asignarBiomas(mapa);
      // montañas
      this.generarMontanas(mapa, opciones.seed || Date.now() + 11);
      // suavizar elevacion
      this.suavizarElevacion(mapa);
      // ríos
      this.generarRios(mapa, opciones.seed || Date.now() + 22);
      // asignar terrenos concretos
      this.asignarTerrenosDesdeGrid(mapa);

      // render
      const renderInfo = this.renderizarMapa(mapa, { contenedorId: contId });

      // devolver objeto con información del mapa para uso posterior
      return {
        mapa,
        especiales: renderInfo.especiales
      };
    }

  }; // end GeneradorMapa

  // Publicar en global
  global.GeneradorMapa = GeneradorMapa;

})(window);