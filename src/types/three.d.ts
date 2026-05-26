declare module "three" {
  export const DynamicDrawUsage: number;
  export const SRGBColorSpace: string;

  export class Color {
    constructor(color?: number | string);
    lerp(color: Color, alpha: number): this;
  }

  export class Vector2 {
    constructor(x?: number, y?: number);
    x: number;
    y: number;
    set(x: number, y: number): this;
  }

  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    copy(vector: Vector3): this;
    lerp(vector: Vector3, alpha: number): this;
    set(x: number, y: number, z: number): this;
    lerpVectors(v1: Vector3, v2: Vector3, alpha: number): this;
  }

  export class Object3D {
    matrix: unknown;
    position: Vector3;
    add(...objects: Object3D[]): this;
    lookAt(vector: Vector3): void;
    lookAt(x: number, y: number, z: number): void;
    updateMatrix(): void;
  }

  export class Scene extends Object3D {
    background: Color | null;
  }

  export class Group extends Object3D {}

  export class OrthographicCamera extends Object3D {
    constructor(
      left: number,
      right: number,
      top: number,
      bottom: number,
      near?: number,
      far?: number
    );
    left: number;
    right: number;
    top: number;
    bottom: number;
    zoom: number;
    updateProjectionMatrix(): void;
  }

  export class WebGLRenderer {
    constructor(options?: {
      antialias?: boolean;
      powerPreference?: string;
      alpha?: boolean;
    });
    domElement: HTMLCanvasElement;
    outputColorSpace: string;
    setPixelRatio(ratio: number): void;
    setSize(width: number, height: number): void;
    render(scene: Scene, camera: OrthographicCamera): void;
    dispose(): void;
  }

  export class AmbientLight extends Object3D {
    constructor(color?: number, intensity?: number);
  }

  export class DirectionalLight extends Object3D {
    constructor(color?: number, intensity?: number);
  }

  export class BoxGeometry {
    constructor(width?: number, height?: number, depth?: number);
    dispose(): void;
  }

  export class MeshStandardMaterial {
    constructor(options?: {
      color?: number;
      roughness?: number;
      metalness?: number;
      flatShading?: boolean;
    });
    dispose(): void;
  }

  export class InstancedBufferAttribute {
    needsUpdate: boolean;
    setUsage(usage: number): this;
  }

  export class InstancedMesh extends Object3D {
    constructor(geometry: BoxGeometry, material: MeshStandardMaterial, count: number);
    instanceMatrix: InstancedBufferAttribute;
    instanceColor: InstancedBufferAttribute | null;
    setMatrixAt(index: number, matrix: unknown): void;
    setColorAt(index: number, color: Color): void;
  }

  export class Raycaster {
    setFromCamera(coords: Vector2, camera: OrthographicCamera): void;
    intersectObject(
      object: Object3D
    ): Array<{
      instanceId?: number;
    }>;
  }

  export const MathUtils: {
    lerp(start: number, end: number, alpha: number): number;
  };
}

declare module "three/examples/jsm/controls/OrbitControls.js" {
  import type { OrthographicCamera, Vector3 } from "three";

  export class OrbitControls {
    constructor(camera: OrthographicCamera, domElement: HTMLElement);
    enableDamping: boolean;
    dampingFactor: number;
    enablePan: boolean;
    enableZoom: boolean;
    enabled: boolean;
    target: Vector3;
    update(): void;
    dispose(): void;
  }
}
