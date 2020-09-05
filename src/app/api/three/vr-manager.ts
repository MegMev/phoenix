import { WebGLRenderer, Group, Camera, Vector3, PerspectiveCamera } from "three";

// NOTE: This was created on 29/08/2020
// It might get outdated given how WebXR is still a work in progress

/**
 * VR manager for VR related operations.
 */
export class VRManager {
  /** Session type to use for VR. */
  static readonly SESSION_TYPE: string = 'immersive-vr';
  /** Renderer to set the VR session for. */
  private renderer: WebGLRenderer;
  /** Currently active VR session. */
  private currentVRSession: any = null;
  /** Callback to call when the VR session ends. */
  private onSessionEnded: () => void;
  /** Group containing the the camera for VR. */
  public cameraGroup: Group;
  /** The camera used by VR. */
  public vrCamera: Camera;
  /** The VR controller for movement. */
  private controller: any;

  /**
   * Set and configure the VR session.
   * @param renderer Renderer to set the VR session for.
   * @param onSessionEnded Callback to call when the VR session ends.
   */
  public setVRSession(renderer: WebGLRenderer, onSessionEnded?: () => void) {
    this.renderer = renderer;
    this.onSessionEnded = onSessionEnded;

    if ((navigator as any)?.xr) {
      const sessionInit = {
        optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking']
      };
      (navigator as any)?.xr?.requestSession(VRManager.SESSION_TYPE, sessionInit)
        .then(this.onVRSessionStarted);

      this.setupVRControls();
    }
  }

  /**
   * Callback for when the VR session is started.
   * @param session The VR session.
   */
  private onVRSessionStarted = (session: any) => {
    session.addEventListener('end', this.onVRSessionEnded);
    this.renderer.xr.setSession(session);
    this.currentVRSession = session;
  }

  /**
   * Callback when the VR session ends.
   */
  private onVRSessionEnded = () => {
    this.currentVRSession?.removeEventListener('end', this.onVRSessionEnded);
    this.currentVRSession = null;
    this.onSessionEnded?.();
  }

  /**
   * End the current VR session.
   */
  public endVRSession() {
    this.currentVRSession?.end();
  }

  /**
   * Get the group containing the camera for VR.
   * VR camera works by adding a Group with Camera to the scene.
   * @param camera Camera which is to be cloned for VR use.
   */
  public getCameraGroup(camera?: Camera) {
    // Set up the camera position in the VR - Adding a group with camera does it
    if (!this.cameraGroup) {
      this.cameraGroup = new Group();
    }
    if (camera) {
      this.vrCamera = new Camera().copy(camera);
      this.vrCamera.name = 'VR_CAMERA';
      (this.vrCamera as PerspectiveCamera).far = 1000000;

      this.cameraGroup.position.copy(this.vrCamera.position);
      this.cameraGroup.add(this.vrCamera);
    }
    return this.cameraGroup;
  }

  /**
   * Get the camera used by VR.
   * @returns The camera used by VR.
   */
  public getVRCamera() {
    return this.vrCamera;
  }

  /**
   * Set up VR controls for moving around the event display.
   */
  private setupVRControls() {
    // Distance for a single step
    const stepDistance = 30;
    // Unit vector in camera direction
    const direction = new Vector3();
    // Interval ID for the movement interval
    let intervalId: NodeJS.Timeout;

    // Get the controller
    this.controller = this.renderer.xr.getController(0);
    this.controller.addEventListener('selectstart', () => {
      // Start movement in camera direction
      intervalId = setInterval(() => {
        this.moveInDirection(direction, stepDistance);
      }, 20);
    });
    this.controller.addEventListener('selectend', () => {
      // Stop the movement
      clearInterval(intervalId);
    });
  }

  /**
   * Move the camera in the given direction.
   * @param direction Direction to move towards.
   * @param stepDistance Distance to move by.
   */
  private moveInDirection(direction: Vector3, stepDistance: number) {
    // Get the direction the controller is facing
    //! this.controller.getWorldDirection(direction);

    // Get direction the camera is facing
    this.renderer.xr.getCamera(new Camera())?.getWorldDirection(direction);

    // Move the camera in the given direction
    this.cameraGroup.position.addScaledVector(direction, stepDistance);
    this.vrCamera.position.addScaledVector(direction, stepDistance);
  }
}
