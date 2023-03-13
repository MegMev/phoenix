import { Component, OnInit } from '@angular/core';

import {
  EventDataFormat,
  EventDataImportOption,
  EventDisplayService,
  ImportOption,
} from 'phoenix-ui-components';

import {
  PhoenixMenuNode,
  Configuration,
  PresetView,
  ClippingSetting,
  Edm4hepJsonLoader,
} from 'phoenix-event-display';

@Component({
  selector: 'app-megat',
  templateUrl: './megat.component.html',
  styleUrls: ['./megat.component.scss'],
})
export class MegatComponent implements OnInit {
  phoenixMenuRoot: PhoenixMenuNode = new PhoenixMenuNode(
    'Phoenix Menu',
    'phoenix-menu'
  );
  loaded = false;
  loadingProgress = 0;

  eventDataImportOptions: EventDataImportOption[] = [
    EventDataFormat.EDM4HEPJSON,
    EventDataFormat.ZIP,
  ];

  constructor(private eventDisplay: EventDisplayService) {}

  ngOnInit() {
    const configuration: Configuration = {
      eventDataLoader: new Edm4hepJsonLoader(),
      presetViews: [
        new PresetView(
          'Bottom View',
          // [-462, 80, -256],
          [-400, 115, -300],
          [0, 0, 0],
          'perspective',
          ClippingSetting.On,
          110,
          75
        ),
        new PresetView(
          'Top View',
          // [-462, 80, -256],
          [-333, 120, 370],
          [0, 0, 0],
          'perspective',
          ClippingSetting.On,
          110,
          75
        ),
      ],
      defaultView: [-460, 80, -255, 0, 0, 0], // x,y,z of position followed by x,y,z of target
      phoenixMenuRoot: this.phoenixMenuRoot,
      defaultEventFile: {
        eventFile: 'assets/files/megat/megat.edm4hep.json',
        eventType: 'edm4hep.json',
      },
    };

    this.eventDisplay.init(configuration);

    try {
      this.eventDisplay.loadGLTFGeometry(
        'assets/geometry/Megat/megat.gltf',
        undefined, // name, ignored when empty
        undefined, // menuNodeName
        1, // scale
        true // initiallyVisible
      );
    } catch (e) {
      console.log('Error:', e);
    }

    this.eventDisplay
      .getUIManager()
      .displayView(configuration.presetViews[0]);

    this.eventDisplay
      .getLoadingManager()
      .addProgressListener((progress) => (this.loadingProgress = progress));

    this.eventDisplay
      .getLoadingManager()
      .addLoadListenerWithCheck(() => (this.loaded = true));
  }
}
