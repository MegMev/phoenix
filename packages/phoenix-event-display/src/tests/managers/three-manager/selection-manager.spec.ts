import { InfoLogger } from '../../../helpers/info-logger';
import { EffectsManager } from '../../../managers/three-manager/effects-manager';
import THREE, { Camera, Object3D, Scene } from 'three';
import { SelectionManager } from '../../../managers/three-manager/selection-manager';
import { ActiveVariable } from '../../../helpers/active-variable';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';

describe('SelectionManager', () => {
  let selectionManager: SelectionManager;
  let selectionManagerPrivate: any;

  beforeEach(() => {
    selectionManager = new SelectionManager();
    selectionManagerPrivate = selectionManager as any;
  });

  afterEach(() => {
    selectionManager = null;
  });

  it('should be created', () => {
    expect(selectionManager).toBeTruthy();
  });

  it('should initialize the selection manager', () => {
    const camera = new Camera();
    const scene = new Scene();
    const renderer = new THREE.WebGLRenderer();
    const effectsManager = new EffectsManager(camera, scene, renderer);
    const infoLogger = new InfoLogger();

    selectionManager.init(camera, scene, effectsManager, infoLogger);

    expect(selectionManagerPrivate.camera).toBe(camera);
    expect(selectionManagerPrivate.scene).toBe(scene);
    expect(selectionManagerPrivate.effectsManager).toBe(effectsManager);
    expect(selectionManagerPrivate.infoLogger).toBe(infoLogger);
  });

  it('should set the currently selected object', () => {
    const test = {
      name: 'test',
      attributes: [],
    };
    selectionManager.setSelectedObject(test);

    expect(selectionManagerPrivate.selectedObject).toBe(test);
  });

  it('should get the uuid of the currently selected object', () => {
    expect(selectionManager.getActiveObjectId()).toBeInstanceOf(ActiveVariable);
  });

  it('should set if selecting is to be enabled or disabled', () => {
    spyOn(selectionManagerPrivate, 'enableSelecting').and.callThrough();
    selectionManager['isInit'] = true;
    spyOn(document, 'addEventListener').and.callThrough();
    spyOn(window, 'addEventListener').and.callThrough();

    selectionManager['effectsManager'] = new EffectsManager(
      new Camera(),
      new Scene(),
      new THREE.WebGLRenderer()
    );

    selectionManager.setSelecting(true);

    expect(selectionManagerPrivate.enableSelecting).toHaveBeenCalled();

    spyOn(selectionManagerPrivate, 'disableSelecting').and.callThrough();

    selectionManager['outlinePass'] = new OutlinePass(
      new THREE.Vector2(100, 100),
      new THREE.Scene(),
      new THREE.Camera()
    );

    selectionManager.setSelecting(false);

    expect(selectionManagerPrivate.disableSelecting).toHaveBeenCalled();
  });

  it('should highlight the object with the given uuid by giving it an outline', () => {
    const objectGroup = new Object3D();
    spyOn(objectGroup, 'getObjectByProperty').and.callThrough();

    selectionManager.highlightObject('uuid', objectGroup);

    expect(objectGroup.getObjectByProperty).toHaveBeenCalledWith(
      'uuid',
      'uuid'
    );
  });
});
