import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useAppStore } from '../app';

const defaultSettings = {
  workTime: 1500,
  breakTime: 300,
  playSound: true,
};

describe('App Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('toggles visual mode', () => {
    const app = useAppStore();
    expect(app.darkMode).toBe(true);

    app.toggleVisualMode();

    expect(app.darkMode).toBe(false);
  });

  it('update the settings', () => {
    const app = useAppStore();
    expect(app.settings).toEqual(defaultSettings);

    app.updateSettings({
      workTime: 300,
      breakTime: 120,
      playSound: false,
    });

    expect(app.settings).toEqual({
      workTime: 300,
      breakTime: 120,
      playSound: false,
    });
  });

  it('redefine the settings', () => {
    const app = useAppStore();
    app.updateSettings({
      workTime: 300,
      breakTime: 120,
      playSound: false,
    });

    app.redefineSettings();

    expect(app.settings).toEqual(defaultSettings);
  });

  it('returns the working time', () => {
    const app = useAppStore();

    expect(app.getWorkTime).toBe(defaultSettings.workTime);

    app.updateSettings({ ...defaultSettings, workTime: 500 });

    expect(app.getWorkTime).toBe(500);
  });

  it('returns the break time', () => {
    const app = useAppStore();

    expect(app.getBreakTime).toBe(defaultSettings.breakTime);

    app.updateSettings({ ...defaultSettings, breakTime: 500 });

    expect(app.getBreakTime).toBe(500);
  });

  it('returns if it should play sound', () => {
    const app = useAppStore();

    expect(app.shouldPlaySound).toBeTruthy();

    app.updateSettings({ ...defaultSettings, playSound: false });

    expect(app.shouldPlaySound).toBeFalsy();
  });

  it('sets the cycle phase as working', () => {
    const app = useAppStore();

    expect(app.cyclePhase).toBeUndefined();

    app.setWorkingPhase();

    expect(app.cyclePhase).toBe('working');
  });

  it('toggles the cycle phase', () => {
    const app = useAppStore();

    app.setWorkingPhase();
    app.toggleCyclePhase();

    expect(app.cyclePhase).toBe('break');
    expect(app.cyclePhase).not.toBe('working');

    app.toggleCyclePhase();

    expect(app.cyclePhase).toBe('working');
    expect(app.cyclePhase).not.toBe('break');
  });

  it('clears the cycle phase', () => {
    const app = useAppStore();

    app.setWorkingPhase();

    expect(app.cyclePhase).toBe('working');

    app.clearCyclePhase();

    expect(app.cyclePhase).toBeUndefined();
  });

  it('returns if the current phase is working', () => {
    const app = useAppStore();

    expect(app.isWorkingPhase).toBeFalsy();

    app.setWorkingPhase();

    expect(app.isWorkingPhase).toBeTruthy();
  });

  it('returns if the current phase is break', () => {
    const app = useAppStore();

    expect(app.isBreakPhase).toBeFalsy();

    app.setWorkingPhase();
    app.toggleCyclePhase();

    expect(app.isBreakPhase).toBeTruthy();
  });
});