import { Group } from 'three';
import { InfoLogger } from '../../helpers/info-logger';
import { PhoenixLoader } from '../../loaders/phoenix-loader';
import { ThreeManager } from '../../managers/three-manager/index';
import { UIManager } from '../../managers/ui-manager/index';

describe('PhoenixLoader', () => {
  let phoenixLoader: PhoenixLoader;

  const eventData = {
    Event: {
      'event number': 1,
      'run number': 1,
      Hits: {
        hitsCollection: [
          {
            pos: [
              -2545.135009765625, -2425.1064453125, 7826.09912109375,
              -2545.135009765625, -1.1222461462020874, 7826.09912109375,
            ],
            type: 'Line',
          },
        ],
      },
    },
    Event2: {
      'event number': 2,
      'run number': 2,
      Hits: {
        hitsCollection: [
          {
            pos: [
              -2545.135009765625, -2425.1064453125, 7826.09912109375,
              -2545.135009765625, -1.1222461462020874, 7826.09912109375,
            ],
            type: 'Line',
          },
        ],
      },
    },
  };

  beforeEach(() => {
    phoenixLoader = new PhoenixLoader();

    const infoLogger = new InfoLogger();
    const threeManager = new ThreeManager(infoLogger);
    const uiManager = new UIManager(threeManager);

    spyOn(threeManager, 'addEventDataTypeGroup')
      .and.callThrough()
      .and.returnValue(new Group());

    phoenixLoader.buildEventData(
      eventData['Event'],
      threeManager,
      uiManager,
      infoLogger
    );
  });

  it('should create an instance', () => {
    expect(phoenixLoader).toBeTruthy();
  });

  it('should get the list of event names from the event data', () => {
    const eventsList = phoenixLoader.getEventsList(eventData);

    expect(eventsList).toEqual(['Event', 'Event2']);
  });

  it('should get list of collections in the event data', () => {
    const collectionList = phoenixLoader.getCollections();

    expect(collectionList).toEqual(['hitsCollection']);
  });

  it('should get the collection with the given collection name from the event data', () => {
    const expectedCollection = eventData['Event']['Hits']['hitsCollection'];

    const collection = phoenixLoader.getCollection('hitsCollection');

    expect(collection).toEqual(expectedCollection);
  });

  it('get metadata associated to any event', () => {
    const metadata = phoenixLoader.getEventMetadata();

    expect(metadata).toEqual([
      {
        label: 'Run / Event',
        value: '1 / 1',
      },
    ]);
  });

  it('should get the object containing labels of events', () => {
    // as we didnt add labels for any event, it should return back an empty object
    expect(phoenixLoader.getLabelsObject()).toEqual({});
  });

  it('should get function to add options to scale event object type by given factor', () => {
    // it should be called with these arguments as an anonymous function
    expect(
      phoenixLoader.addScaleOptions('configKey', 'configLabel', () => {})
    ).toBeInstanceOf(Function);
  });
});
