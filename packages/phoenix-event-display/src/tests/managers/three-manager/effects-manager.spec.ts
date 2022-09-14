import THREE, { Camera, Scene, WebGLRenderer, NormalBlending } from 'three';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectsManager } from '../../../managers/three-manager/effects-manager';

describe('EffectsManager', () => {
  let effectsManager: EffectsManager;
  let camera: Camera;
  let scene: Scene;

  beforeEach(() => {
    camera = new Camera();
    scene = new Scene();

    effectsManager = new EffectsManager(
      camera,
      scene,
      new THREE.WebGLRenderer()
    );
  });

  it('should create an instance', () => {
    expect(effectsManager).toBeTruthy();
  });

  it('should initialize the outline pass for highlighting hovered over event display elements', () => {
    const outlinePass = effectsManager.addOutlinePassForSelection();

    expect(outlinePass).toBeInstanceOf(OutlinePass);
    expect(outlinePass.overlayMaterial.blending).toBe(NormalBlending);
    expect(outlinePass.visibleEdgeColor.getHex()).toBe(0xdf5330);
    expect(effectsManager.composer.passes.length).toBe(2);
  });

  it('should remove a pass from the effect composer', () => {
    const pass = new RenderPass(scene, camera);
    effectsManager.removePass(pass);

    expect(effectsManager.composer.passes.length).toBe(0);
  });

  it('should set the antialiasing of renderer', () => {
    effectsManager.setAntialiasing(true);
    expect(effectsManager.antialiasing).toBe(true);

    effectsManager.setAntialiasing(false);
    expect(effectsManager.antialiasing).toBe(false);
  });
});
