// =============================================================
//  OpenSystemScene. The hero's one idea, drawn once.
//
//  A closed system: a few thousand points on a sphere, each tied
//  to its nearest neighbours by a hairline. As the page scrolls
//  the sphere opens. Points lift off the surface in slow bands,
//  the ties stretch and thin, and a handful of clay nodes
//  carry the eye. Inside the net sits one flat clay disc, a sun
//  printed as a single ink pass and locked to the sphere's centre,
//  so opening reads as the cage lifting away from a solid core.
//  A hairline orbit crosses the type. Pointer position tilts the whole thing a few
//  degrees. Nothing spins fast, nothing glows.
// =============================================================

import {
  BufferAttribute,
  BufferGeometry,
  CircleGeometry,
  Color,
  Group,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three'

// The points and the orbit are gem turquoise, the way the stone reads in
// daylight; the ties and the anchor nodes are the deeper turquoise of its
// shadow. The sun alone is clay.
const NET = new Color('#127a78')
const GEM = new Color('#1fb1b3')
const CLAY = new Color('#b4401f')

const COUNT = 2600
const NEIGHBOURS = 2

const DISPLACE = /* glsl */ `
uniform float uTime;
uniform float uOpen;
uniform float uReveal;
attribute float aSeed;
varying float vSeed;
varying float vZ;

vec3 displace(vec3 p, float s) {
  vec3 n = normalize(p);
  float band = 0.5 + 0.5 * sin(n.y * 5.0 - uTime * 0.22 + s * 1.7);
  float open = uOpen * (0.12 + 0.88 * band) * (0.45 + s);
  float breathe = 0.014 * sin(uTime * 0.85 + s * 6.2831);
  float r = uReveal * (1.0 + open * 0.9 + breathe);
  return n * r;
}
`

const POINT_VERT = /* glsl */ `
${DISPLACE}
uniform float uPixel;
void main() {
  vec3 p = displace(position, aSeed);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float big = step(0.978, aSeed);
  gl_PointSize = uPixel * (1.7 + big * 3.4) * (3.3 / -mv.z);
  vSeed = aSeed;
  vZ = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`

const POINT_FRAG = /* glsl */ `
uniform vec3 uInk;
uniform vec3 uSignal;
uniform float uAlpha;
varying float vSeed;
varying float vZ;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float a = smoothstep(0.5, 0.18, d);
  float big = step(0.978, vSeed);
  vec3 col = mix(uInk, uSignal, big);
  float depth = smoothstep(5.4, 2.3, vZ);
  float alpha = a * mix(0.3, 0.95, depth) * mix(0.7, 1.0, big) * uAlpha;
  gl_FragColor = vec4(col, alpha);
}
`

const LINE_VERT = /* glsl */ `
${DISPLACE}
void main() {
  vec3 p = displace(position, aSeed);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vSeed = aSeed;
  vZ = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`

const LINE_FRAG = /* glsl */ `
uniform vec3 uLine;
uniform float uAlpha;
uniform float uOpen;
varying float vZ;
void main() {
  float depth = smoothstep(5.4, 2.3, vZ);
  float alpha = mix(0.1, 0.3, depth) * (1.0 - uOpen * 0.55) * uAlpha;
  gl_FragColor = vec4(uLine, alpha);
}
`

function fibonacciSphere(n: number): Float32Array {
  const out = new Float32Array(n * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const t = golden * i
    out[i * 3] = Math.cos(t) * r
    out[i * 3 + 1] = y
    out[i * 3 + 2] = Math.sin(t) * r
  }
  return out
}

// Nearest-neighbour ties. Fibonacci points are ordered by latitude, so a
// neighbour is always within a small index window; no need for a full scan.
function buildEdges(pos: Float32Array, n: number, k: number): Uint32Array {
  const window = 40
  const seen = new Set<number>()
  const edges: number[] = []
  const best: { d: number; j: number }[] = []
  for (let i = 0; i < n; i++) {
    best.length = 0
    const ax = pos[i * 3]!, ay = pos[i * 3 + 1]!, az = pos[i * 3 + 2]!
    const lo = Math.max(0, i - window)
    const hi = Math.min(n - 1, i + window)
    for (let j = lo; j <= hi; j++) {
      if (j === i) continue
      const dx = pos[j * 3]! - ax
      const dy = pos[j * 3 + 1]! - ay
      const dz = pos[j * 3 + 2]! - az
      const d = dx * dx + dy * dy + dz * dz
      if (best.length < k) {
        best.push({ d, j })
        best.sort((a, b) => a.d - b.d)
      } else if (d < best[k - 1]!.d) {
        best[k - 1] = { d, j }
        best.sort((a, b) => a.d - b.d)
      }
    }
    for (const b of best) {
      const key = i < b.j ? i * n + b.j : b.j * n + i
      if (seen.has(key)) continue
      seen.add(key)
      edges.push(i, b.j)
    }
  }
  return new Uint32Array(edges)
}

export interface SceneOptions {
  reducedMotion?: boolean
}

export class OpenSystemScene {
  private renderer: WebGLRenderer
  private scene = new Scene()
  private camera: PerspectiveCamera
  private group = new Group()
  private points: Points
  private lines: LineSegments
  private ring: LineLoop
  private sun: Mesh
  private sunScale = 1
  private uniforms: Record<string, { value: number | Color }>
  private raf = 0
  private start = performance.now()
  private ro: ResizeObserver
  private host: HTMLElement
  private reduced: boolean

  private openTarget = 0.12
  private open = 0
  private alphaTarget = 1
  private alpha = 1
  private presence = 1
  private pointer = { x: 0, y: 0 }
  private tilt = { x: 0, y: 0 }
  private reveal = 0

  constructor(canvas: HTMLCanvasElement, opts: SceneOptions = {}) {
    this.reduced = !!opts.reducedMotion
    this.host = canvas.parentElement ?? document.body
    this.renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    this.renderer.setClearColor(0x000000, 0)

    this.camera = new PerspectiveCamera(38, 1, 0.1, 40)
    this.camera.position.set(0, 0, 3.4)

    const pos = fibonacciSphere(COUNT)
    const seeds = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) seeds[i] = Math.random()

    this.uniforms = {
      uTime: { value: 0 },
      uOpen: { value: 0 },
      uReveal: { value: 0 },
      uAlpha: { value: 1 },
      uPixel: { value: this.renderer.getPixelRatio() },
      uInk: { value: GEM },
      uSignal: { value: NET },
      uLine: { value: NET },
    }

    const pGeo = new BufferGeometry()
    pGeo.setAttribute('position', new BufferAttribute(pos, 3))
    pGeo.setAttribute('aSeed', new BufferAttribute(seeds, 1))
    const pMat = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: POINT_VERT,
      fragmentShader: POINT_FRAG,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: NormalBlending,
    })
    this.points = new Points(pGeo, pMat)

    const edges = buildEdges(pos, COUNT, NEIGHBOURS)
    const lPos = new Float32Array(edges.length * 3)
    const lSeed = new Float32Array(edges.length)
    for (let e = 0; e < edges.length; e++) {
      const i = edges[e]!
      lPos[e * 3] = pos[i * 3]!
      lPos[e * 3 + 1] = pos[i * 3 + 1]!
      lPos[e * 3 + 2] = pos[i * 3 + 2]!
      lSeed[e] = seeds[i]!
    }
    const lGeo = new BufferGeometry()
    lGeo.setAttribute('position', new BufferAttribute(lPos, 3))
    lGeo.setAttribute('aSeed', new BufferAttribute(lSeed, 1))
    const lMat = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: LINE_VERT,
      fragmentShader: LINE_FRAG,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: NormalBlending,
    })
    this.lines = new LineSegments(lGeo, lMat)

    // A single hairline orbit, tilted, like a drafting circle behind the type.
    const ringN = 256
    const ringPos = new Float32Array(ringN * 3)
    for (let i = 0; i < ringN; i++) {
      const t = (i / ringN) * Math.PI * 2
      ringPos[i * 3] = Math.cos(t) * 1.62
      ringPos[i * 3 + 1] = 0
      ringPos[i * 3 + 2] = Math.sin(t) * 1.62
    }
    const rGeo = new BufferGeometry()
    rGeo.setAttribute('position', new BufferAttribute(ringPos, 3))
    this.ring = new LineLoop(rGeo, new LineBasicMaterial({ color: GEM, transparent: true, opacity: 0.55, blending: NormalBlending, depthTest: false }))
    this.ring.rotation.x = 1.15
    this.ring.rotation.z = 0.35

    // The sun. A flat disc that faces the camera and shares the sphere's
    // centre, drawn first so every point and tie prints over it. It lives
    // outside the group so the group's tilt never turns it into an ellipse,
    // and it is smaller than the closed sphere so it sits inside the net.
    this.sun = new Mesh(
      new CircleGeometry(1, 96),
      new MeshBasicMaterial({ color: CLAY, transparent: true, opacity: 0, depthWrite: false, depthTest: false }),
    )
    this.sun.renderOrder = -1
    this.lines.renderOrder = 1
    this.points.renderOrder = 2
    this.ring.renderOrder = 1

    this.group.add(this.lines, this.points, this.ring)
    this.scene.add(this.sun, this.group)

    this.ro = new ResizeObserver(() => this.resize())
    this.ro.observe(this.host)
    this.resize()

    window.addEventListener('visibilitychange', this.onVisibility)
    if (this.reduced) {
      this.reveal = 1
      this.open = 0.35
      this.uniforms.uReveal!.value = 1
      this.uniforms.uOpen!.value = 0.35
      this.uniforms.uTime!.value = 4
      this.sun.scale.setScalar(this.sunScale)
      ;(this.sun.material as MeshBasicMaterial).opacity = 1
      this.renderer.render(this.scene, this.camera)
    } else {
      this.syncLoop()
    }
  }

  private inView = true
  private running = false

  private onVisibility = () => this.syncLoop()

  // Only spend frames while the hero is actually on screen.
  setInView(v: boolean) {
    this.inView = v
    this.syncLoop()
  }

  private syncLoop() {
    if (this.reduced) return
    const should = this.inView && !document.hidden
    if (should && !this.running) {
      this.running = true
      this.loop()
    } else if (!should && this.running) {
      this.running = false
      cancelAnimationFrame(this.raf)
    }
  }

  // 0 at rest, 1 when the hero has scrolled fully out of view.
  setScroll(p: number) {
    const t = Math.min(1, Math.max(0, p))
    this.openTarget = 0.12 + t * 1.15
    this.alphaTarget = 1 - Math.pow(t, 1.6) * 0.92
    if (this.reduced) this.renderOnce()
  }

  setPointer(nx: number, ny: number) {
    this.pointer.x = nx
    this.pointer.y = ny
  }

  private resize() {
    const w = this.host.clientWidth || 1
    const h = this.host.clientHeight || 1
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    const wide = w / h > 1.1
    // Wide: upper right, beside the headline. Narrow: tucked into the top
    // right corner and cropped by the edge, above the headline.
    this.group.position.x = wide ? 1.0 : 0.58
    this.group.position.y = wide ? 0.6 : 0.98
    this.group.scale.setScalar(wide ? 0.64 : 0.55)
    // The sun sits inside the closed sphere. As the page scrolls and the
    // net opens, the points lift off its edge.
    this.sun.position.copy(this.group.position)
    this.sunScale = (wide ? 0.64 : 0.55) * 0.74
    // The orbit stays wide so its arc still crosses the headline.
    this.ring.scale.setScalar(wide ? 1.5 : 1.15)
    // On a phone part of the net crosses the headline, so it steps back.
    this.presence = wide ? 1 : 0.7
    if (this.reduced) this.renderOnce()
  }

  private renderOnce() {
    this.uniforms.uOpen!.value = this.openTarget
    this.uniforms.uAlpha!.value = this.alphaTarget * this.presence
    this.sun.scale.setScalar(this.sunScale)
    ;(this.sun.material as MeshBasicMaterial).opacity = this.alphaTarget
    this.renderer.render(this.scene, this.camera)
  }

  private loop = () => {
    this.raf = requestAnimationFrame(this.loop)
    const t = (performance.now() - this.start) / 1000

    // Entry: the sphere grows in over the first two seconds.
    this.reveal += (1 - this.reveal) * 0.035
    this.open += (this.openTarget - this.open) * 0.06
    this.alpha += (this.alphaTarget * this.presence - this.alpha) * 0.08
    this.tilt.x += (this.pointer.y * 0.16 - this.tilt.x) * 0.04
    this.tilt.y += (this.pointer.x * 0.22 - this.tilt.y) * 0.04

    this.uniforms.uTime!.value = t
    this.uniforms.uReveal!.value = this.reveal
    this.uniforms.uOpen!.value = this.open
    this.uniforms.uAlpha!.value = this.alpha

    this.group.rotation.y = t * 0.045 + this.tilt.y
    this.group.rotation.x = this.tilt.x + 0.12
    this.ring.rotation.y = t * 0.05
    ;(this.ring.material as LineBasicMaterial).opacity = 0.55 * this.reveal * this.alpha

    // The sun grows in with the sphere and fades out with the scroll, but
    // ignores the pointer tilt so it always reads as a flat printed disc.
    const ease = 1 - Math.pow(1 - this.reveal, 3)
    this.sun.scale.setScalar(this.sunScale * ease)
    ;(this.sun.material as MeshBasicMaterial).opacity = ease * (this.alpha / Math.max(this.presence, 0.01))

    this.camera.position.z = 3.4 + this.open * 0.35

    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    cancelAnimationFrame(this.raf)
    window.removeEventListener('visibilitychange', this.onVisibility)
    this.ro.disconnect()
    this.points.geometry.dispose()
    ;(this.points.material as ShaderMaterial).dispose()
    this.lines.geometry.dispose()
    ;(this.lines.material as ShaderMaterial).dispose()
    this.ring.geometry.dispose()
    ;(this.ring.material as LineBasicMaterial).dispose()
    this.sun.geometry.dispose()
    ;(this.sun.material as MeshBasicMaterial).dispose()
    this.renderer.dispose()
  }
}
