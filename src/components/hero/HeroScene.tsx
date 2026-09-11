"use client";

import { Edges, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";

import { buildProgress, trackProgress } from "./track";

/* ---------------------------------------------------------------------------
   Scena 3D din spatele hero-ului: o casa din dulapi care se "construieste" pe
   masura ce pagina e derulata — toate piesele stau de la inceput imprastiate in
   jurul casei, in haos, si zboara la locul lor de jos in sus, iar casa se
   roteste usor. Nicio piesa nu apare din senin si niciuna nu dispare.

   Animatia nu stie nimic despre model: sorteaza toate mesh-urile dupa inaltime
   si le aduce pe rand. Merge la fel pentru casa generata mai jos si pentru un
   GLB exportat din SketchUp — cu cat modelul are mai multe piese separate
   (componente/grupuri), cu atat constructia se vede mai bine.
   --------------------------------------------------------------------------- */

type Props = {
  /** Id-ul elementului pe a carui derulare se calculeaza progresul. */
  trackId: string;
  /** GLB-ul real; `null` pana cand exista, si atunci se foloseste casa generata. */
  modelUrl: string | null;
};

/**
 * Cat din progres ocupa zborul unei singure piese. Ferestrele se suprapun larg,
 * deci multe piese sunt in miscare deodata — haosul se aduna treptat, nu piesa
 * cu piesa.
 */
const PIECE_WINDOW = 0.45;
/**
 * Norul de piese imprastiate, fata de dimensiunea modelului: cat de larg e pe
 * fiecare axa si cat e impins spre dreapta, in sus si in spate — departe de
 * textul hero-ului (stanga) si de camera. Un nor centrat pe casa, de 0.9x
 * marimea ei, umplea tot ecranul si trecea piese peste titlu.
 */
const SCATTER = new THREE.Vector3(0.6, 0.5, 0.6);
const SCATTER_SHIFT = new THREE.Vector3(0.25, 0.15, -0.3);
/** Rotatia casei la inceputul si la sfarsitul pistei (radiani). */
const ROT_START = -0.6;
const ROT_SPAN = 0.9;
/** Latimea la care e adus orice model, ca GLB-ul sa incapa in cadru ca si casa generata. */
const FIT_WIDTH = 7;

/* --- Casa generata: pereti din dulapi chertati la colturi, frontoane, capriori -- */

type Piece = {
  size: [number, number, number];
  pos: [number, number, number];
  rotX?: number;
  base?: boolean;
};

const BASE_H = 0.3; // placa de beton
const COURSE = 0.2; // inaltimea unui dulap
const THICK = 0.14; // grosimea peretelui
const LEN_X = 6; // lungimea casei
const LEN_Z = 4.2; // latimea casei
const OVER = 0.3; // capetele chertate ies dincolo de colt
const COURSES = 12; // randuri de dulapi pe perete
const GABLE = 7; // randuri de fronton

/** Taie intervalul [a, b] in bucati, sarind peste goluri (usi, ferestre). */
function spans(a: number, b: number, gaps: [number, number][]): [number, number][] {
  const out: [number, number][] = [];
  let start = a;
  for (const [g0, g1] of gaps) {
    if (g0 > start) out.push([start, g0]);
    start = g1;
  }
  if (b > start) out.push([start, b]);
  return out;
}

function buildHouse(): Piece[] {
  const pieces: Piece[] = [];
  const h = COURSE * 0.96; // un rost fin intre dulapi, ca randurile sa se citeasca
  const xEnd = LEN_X / 2 + OVER;
  const zEnd = LEN_Z / 2 + OVER;

  pieces.push({ size: [LEN_X + 1.2, BASE_H, LEN_Z + 1.2], pos: [0, BASE_H / 2, 0], base: true });

  for (let k = 0; k < COURSES; k++) {
    const y = BASE_H + k * COURSE + COURSE / 2;
    // Peretii laterali sunt decalati cu o jumatate de dulap: asa se imbina la colturi.
    const ySide = y + COURSE / 2;

    const door: [number, number][] = k < 10 ? [[-0.5, 0.5]] : [];
    for (const [a, b] of spans(-xEnd, xEnd, door)) {
      pieces.push({ size: [b - a, h, THICK], pos: [(a + b) / 2, y, LEN_Z / 2] });
    }
    const windows: [number, number][] = k >= 4 && k <= 8 ? [[-2.2, -1.2], [1.2, 2.2]] : [];
    for (const [a, b] of spans(-xEnd, xEnd, windows)) {
      pieces.push({ size: [b - a, h, THICK], pos: [(a + b) / 2, y, -LEN_Z / 2] });
    }
    const sideWindow: [number, number][] = k >= 4 && k <= 8 ? [[-0.6, 0.6]] : [];
    for (const [a, b] of spans(-zEnd, zEnd, sideWindow)) {
      pieces.push({ size: [THICK, h, b - a], pos: [LEN_X / 2, ySide, (a + b) / 2] });
    }
    pieces.push({ size: [THICK, h, zEnd * 2], pos: [-LEN_X / 2, ySide, 0] });
  }

  const wallTop = BASE_H + COURSES * COURSE + COURSE / 2;
  for (let g = 0; g < GABLE; g++) {
    const len = zEnd * 2 * (1 - (g + 0.5) / GABLE);
    const y = wallTop + g * COURSE + COURSE / 2;
    pieces.push({ size: [THICK, h, len], pos: [LEN_X / 2, y, 0] });
    pieces.push({ size: [THICK, h, len], pos: [-LEN_X / 2, y, 0] });
  }

  const rise = GABLE * COURSE;
  const run = zEnd;
  const angle = Math.atan2(rise, run);
  const rafter = Math.hypot(run, rise) + 0.5;
  const count = 8;
  for (let i = 0; i < count; i++) {
    const x = -xEnd + (i * (xEnd * 2)) / (count - 1);
    for (const side of [1, -1]) {
      pieces.push({
        size: [0.12, 0.18, rafter],
        pos: [x, wallTop + rise / 2 + 0.05, side * (run / 2 + 0.2)],
        rotX: side * angle,
      });
    }
  }
  pieces.push({ size: [xEnd * 2 + 0.6, 0.22, 0.22], pos: [0, wallTop + rise + 0.12, 0] });

  return pieces;
}

const HOUSE = buildHouse();

function StandInHouse() {
  return (
    <group>
      {HOUSE.map((p, i) => (
        <mesh
          key={i}
          position={p.pos}
          rotation={[p.rotX ?? 0, 0, 0]}
          userData={p.base ? { anchor: true } : undefined}
        >
          <boxGeometry args={p.size} />
          <meshStandardMaterial color={p.base ? "#5f5f5c" : "#c9a26b"} roughness={0.85} />
          <Edges color="#2b1d12" threshold={15} />
        </mesh>
      ))}
    </group>
  );
}

/* --- Modelul real (GLB), adus la aceeasi scara si asezat pe sol --------------- */

function GlbModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  // Clona: animatia muta piesele, iar `useGLTF` tine scena in cache.
  const [model] = useState(() => scene.clone(true));
  const [fit] = useState(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const scale = FIT_WIDTH / Math.max(size.x, size.z, 1e-6);
    const center = box.getCenter(new THREE.Vector3());
    return {
      scale,
      position: [-center.x * scale, -box.min.y * scale, -center.z * scale] as [number, number, number],
    };
  });
  return (
    <group scale={fit.scale} position={fit.position}>
      <primitive object={model} />
    </group>
  );
}

/* --- Animatia --------------------------------------------------------------- */

/** Generator determinist (mulberry32): acelasi "haos" la fiecare incarcare, nu altul la fiecare vizita. */
function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Part = {
  obj: THREE.Object3D;
  /**
   * Centrul piesei in spatiul ei local (cu scara aplicata) — pivotul rotatiei.
   * Intr-un GLB exportat din SketchUp originea fiecarei piese e originea
   * modelului, la zeci de metri de piesa; rotita in jurul ei, piesa ar fi
   * aruncata pe un cerc urias in loc sa se invarta pe loc.
   */
  pivot: THREE.Vector3;
  /** Centrul piesei, in spatiul parintelui: la locul ei si in haos. */
  baseCenter: THREE.Vector3;
  chaosCenter: THREE.Vector3;
  baseQuat: THREE.Quaternion;
  chaosQuat: THREE.Quaternion;
  order: number;
};

const pivotTmp = new THREE.Vector3();

/**
 * Aseaza fiecare piesa pentru un progres de constructie dat. Sta in afara
 * componentei: e mutatie pe graful three.js, rulata din bucla de cadre — nu in
 * randare —, iar React Compiler n-ar avea cum sa stie asta despre un callback
 * dat lui `useFrame` si ar semnala-o ca mutatie a unei valori imutabile.
 */
function applyBuild(parts: Part[], build: number) {
  for (const part of parts) {
    const s = THREE.MathUtils.clamp((build * (1 + PIECE_WINDOW) - part.order) / PIECE_WINDOW, 0, 1);
    // easeInOutCubic: piesa se desprinde lin din haos si se aseaza lin la loc.
    const e = s < 0.5 ? 4 * s * s * s : 1 - (-2 * s + 2) ** 3 / 2;
    part.obj.quaternion.slerpQuaternions(part.chaosQuat, part.baseQuat, e);
    // Se interpoleaza centrul, iar pozitia se deduce din el: piesa se roteste in
    // jurul propriului centru pe tot drumul, oriunde i-ar fi originea.
    pivotTmp.copy(part.pivot).applyQuaternion(part.obj.quaternion);
    part.obj.position.lerpVectors(part.chaosCenter, part.baseCenter, e).sub(pivotTmp);
  }
}

function Build({
  progressRef,
  children,
}: {
  progressRef: { current: number };
  children: ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const partsRef = useRef<Part[]>([]);
  const shownRef = useRef(-1);
  const { size, invalidate } = useThree();

  // Dupa montare: fiecare mesh primeste un rang dupa inaltimea la care sta, iar
  // "in sus" se traduce in spatiul local al parintelui — la un GLB, grupurile
  // din SketchUp pot fi rotite, iar un simplu `position.y += …` le-ar muta stramb.
  useLayoutEffect(() => {
    const root = groupRef.current;
    if (!root) return;
    root.updateWorldMatrix(true, true);
    const found: { obj: THREE.Object3D; y: number }[] = [];
    const box = new THREE.Box3();
    root.traverse((o) => {
      // O piesa = un mesh care NU sta in alt mesh. Conturul de la `<Edges>` e si
      // el un Mesh (LineSegments2), copil al piesei; luat drept piesa separata,
      // zbura singur prin haos si umplea scena de "fantome" — cutii doar din contur.
      if ((o as THREE.Mesh).isMesh && !(o.parent as THREE.Mesh | null)?.isMesh) {
        found.push({ obj: o, y: box.setFromObject(o).min.y });
      }
    });
    found.sort((a, b) => a.y - b.y);
    const last = Math.max(found.length - 1, 1);
    const bounds = new THREE.Box3().setFromObject(root);
    const size = bounds.getSize(new THREE.Vector3());
    const span = size.clone().multiply(SCATTER);
    const cloud = bounds.getCenter(new THREE.Vector3()).add(size.clone().multiply(SCATTER_SHIFT));
    const rand = seeded(1993);
    partsRef.current = found.map(({ obj }, i) => {
      const geometry = (obj as THREE.Mesh).geometry;
      geometry.computeBoundingBox();
      const pivot = (geometry.boundingBox ?? new THREE.Box3())
        .getCenter(new THREE.Vector3())
        .multiply(obj.scale);
      const baseQuat = obj.quaternion.clone();
      const baseCenter = obj.position.clone().add(pivot.clone().applyQuaternion(baseQuat));
      const order = i / last;

      // Fundatia (orice mesh marcat `anchor`) sta pe loc: placa de beton rotita
      // prin aer iesea ca o banda gri peste toata scena.
      if (obj.userData.anchor) {
        return {
          obj,
          pivot,
          baseCenter,
          chaosCenter: baseCenter.clone(),
          baseQuat,
          chaosQuat: baseQuat.clone(),
          order,
        };
      }
      const parent = obj.parent ?? root;
      // Locul piesei in "haos": un punct din norul din dreapta-spatele casei, peste sol.
      const scattered = new THREE.Vector3(
        cloud.x + (rand() * 2 - 1) * span.x,
        Math.max(cloud.y + (rand() * 2 - 1) * span.y, bounds.min.y + 0.3),
        cloud.z + (rand() * 2 - 1) * span.z,
      );
      const spin = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          (rand() * 2 - 1) * Math.PI,
          (rand() * 2 - 1) * Math.PI,
          (rand() * 2 - 1) * Math.PI,
        ),
      );
      return {
        obj,
        pivot,
        baseCenter,
        chaosCenter: parent.worldToLocal(scattered),
        baseQuat,
        chaosQuat: baseQuat.clone().multiply(spin),
        order,
      };
    });
    shownRef.current = -1;
    invalidate();
  }, [invalidate]);

  useFrame(() => {
    const root = groupRef.current;
    if (!root) return;
    const p = progressRef.current;
    if (Math.abs(p - shownRef.current) < 1e-4) return;
    shownRef.current = p;

    applyBuild(partsRef.current, p);
    root.rotation.y = ROT_START + ROT_SPAN * p;
  });

  // Pe ecrane late textul hero-ului sta in stanga, deci casa se muta in dreapta.
  const wide = size.width / size.height > 1.1;
  return (
    /* Rotatia de start sta si pe grup, nu doar in bucla de cadre: efectul de
       mai sus calculeaza norul in spatiul lumii, deci trebuie sa vada casa
       exact cum arata la inceputul pistei. */
    <group
      ref={groupRef}
      position={[wide ? 2.6 : 0, wide ? -0.2 : -0.6, 0]}
      rotation={[0, ROT_START, 0]}
      scale={wide ? 0.9 : 0.75}
    >
      {children}
    </group>
  );
}

/**
 * Progresul derularii: 0 cand elementul-pista incepe, 1 cand s-a terminat.
 * Tinta vine din scroll, iar valoarea afisata o urmareste amortizat — altfel o
 * rotita de mouse ar face constructia sa sara in trepte.
 */
function ScrollDriver({
  trackId,
  targetRef,
  currentRef,
  still,
}: {
  trackId: string;
  targetRef: { current: number };
  currentRef: { current: number };
  still: boolean;
}) {
  const { invalidate } = useThree();

  useEffect(() => {
    if (still) {
      targetRef.current = 1;
      currentRef.current = 1;
      invalidate();
      return;
    }
    const read = () => {
      const el = document.getElementById(trackId);
      if (!el) return;
      targetRef.current = buildProgress(trackProgress(el));
      invalidate();
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, [trackId, targetRef, currentRef, still, invalidate]);

  // `frameloop="demand"`: se randeaza doar cat timp valoarea inca se apropie de
  // tinta. Cu pagina oprita, scena nu consuma nimic.
  useFrame((_, delta) => {
    const gap = targetRef.current - currentRef.current;
    if (Math.abs(gap) < 1e-4) {
      currentRef.current = targetRef.current;
      return;
    }
    // Constanta de ~0.2s: miscare lina, fara trepte de la rotita de mouse, dar
    // destul de scurta cat constructia sa se termine in pauza de dupa `BUILD_END`.
    currentRef.current += gap * (1 - Math.exp(-delta * 5));
    invalidate();
  });

  return null;
}

export default function HeroScene({ trackId, modelUrl }: Props) {
  const reduced = useReducedMotion() ?? false;
  const targetRef = useRef(0);
  const currentRef = useRef(0);

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      camera={{ position: [10, 6, 13], fov: 32 }}
      onCreated={({ camera }) => camera.lookAt(0, 2.1, 0)}
      aria-hidden
    >
      <hemisphereLight args={["#fff6e8", "#3a2e22", 0.9]} />
      <directionalLight position={[6, 10, 4]} intensity={1.6} />
      <ambientLight intensity={0.25} />

      <ScrollDriver
        trackId={trackId}
        targetRef={targetRef}
        currentRef={currentRef}
        still={reduced}
      />
      <Suspense fallback={null}>
        <Build progressRef={currentRef}>
          {modelUrl ? <GlbModel url={modelUrl} /> : <StandInHouse />}
        </Build>
      </Suspense>
    </Canvas>
  );
}
