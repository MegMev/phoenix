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
          'Global View',
          [-600, 600, 0],
          [0, 0, 0],
          'perspective',
          ClippingSetting.On,
          90,
          90
        ),
      ],
      defaultView: [400, -400, 0, 0, -200, 0], // x,y,z of position followed by x,y,z of target
      phoenixMenuRoot: this.phoenixMenuRoot,
      defaultEventFile: {
        eventFile: 'assets/files/megat/megat.edm4hep.json',
        eventType: 'edm4hep.json',
      },
    };

    this.eventDisplay.init(configuration);

    this.eventDisplay.loadRootGeometry('assets/geometry/Megat/megat.root',
                                       'geometry',
                                       'megat',
                                      );

    this.eventDisplay
      .getLoadingManager()
      .addProgressListener((progress) => (this.loadingProgress = progress));

    this.eventDisplay
      .getLoadingManager()
      .addLoadListenerWithCheck(() => (this.loaded = true));
  }
}
