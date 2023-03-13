import { Component, ComponentRef, OnDestroy, OnInit, Input } from '@angular/core';
import {  Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayViewWindowComponent } from './overlay-view-window/overlay-view-window.component';

@Component({
  selector: 'app-overlay-view',
  templateUrl: './overlay-view.component.html',
  styleUrls: ['./overlay-view.component.scss'],
})
export class OverlayViewComponent implements OnInit, OnDestroy {
  @Input()
  showOverlay: boolean = false;
  @Input()
  transparent: boolean = false;

  overlayWindow: ComponentRef<OverlayViewWindowComponent>;

  constructor(private overlay: Overlay) {}

  ngOnInit() {
    const overlayRef = this.overlay.create();
    const overlayPortal = new ComponentPortal(OverlayViewWindowComponent);
    this.overlayWindow = overlayRef.attach(overlayPortal);
    this.overlayWindow.instance.showOverlay = this.showOverlay;
    this.overlayWindow.instance.transparentBody = this.transparent;
  }

  ngOnDestroy(): void {
    this.overlayWindow.destroy();
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
    this.overlayWindow.instance.showOverlay = this.showOverlay;
  }
}
