import { ActiveVariable } from '../../../src/helpers/active-variable';

describe('ActiveVariable', () => {
  let activeVariable: ActiveVariable<number>;

  beforeEach(() => {
    activeVariable = new ActiveVariable();
  });

  it('should exist', () => {
    expect(activeVariable.value).toBeUndefined();
  });

  it('should update the value of variable', () => {
    activeVariable.update(1);
    expect(activeVariable.value).toBe(1);
  });

  it('should call a function on updating the value of variable', () => {
    const callback = jasmine.createSpy('callback');

    activeVariable.onUpdate(callback);
    activeVariable.update(1);

    expect(callback).toHaveBeenCalledWith(1);
  });

  it('should call multiple callbacks', () => {
    const callback1 = jasmine.createSpy('callback1');
    const callback2 = jasmine.createSpy('callback2');

    activeVariable.onUpdate(callback1);
    activeVariable.onUpdate(callback2);
    activeVariable.update(1);

    expect(callback1).toHaveBeenCalledWith(1);
    expect(callback2).toHaveBeenCalledWith(1);
    expect(callback1).toHaveBeenCalledTimes(1);
  });
});
