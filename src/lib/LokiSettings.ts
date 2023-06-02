class LokiSettings {
  name: string = '';
  tutorialIds: string[] = [];
  storeId: string = '';
  bump: number = 0;
  onboardingSlug: string = '';

  setName(name: string) {
    this.name = name;
    this.persist();
  }

  setOnboardingSlug(slug: string) {
    this.onboardingSlug = slug;
    this.persist();
  }

  setTutorialIds(ids: string[]) {
    this.tutorialIds = ids;
    this.persist();
  }

  setStoreId(storeId: string) {
    this.storeId = storeId;
    this.persist();
  }

  persist() {
    const bump = (this.bump += 1);
    const {name, tutorialIds, storeId, onboardingSlug} = this;
    window.localStorage.setItem('LOKI_SETTINGS', JSON.stringify({name, tutorialIds, storeId, bump, onboardingSlug}));
    window.localStorage.setItem('LOKI_NAME', name);
  }

  load() {
    this.name = '';
    this.tutorialIds = [];
    this.storeId = '';
    this.onboardingSlug = '';
    this.bump += 1;
    const settingsStr = window.localStorage.getItem('LOKI_SETTINGS') as any;
    try {
      this.name = window.localStorage.getItem('LOKI_NAME') || '';
    } catch (err) {}

    try {
      const {name, tutorialIds, storeId, bump, onboardingSlug} = JSON.parse(settingsStr);
      this.name = name || this.name || '';
      this.tutorialIds = tutorialIds;
      this.storeId = storeId;
      this.onboardingSlug = onboardingSlug;
      this.bump = bump;
    } catch (err) {}
  }

  clear() {
    window.localStorage.removeItem('LOKI_SETTINGS');
  }

  result() {
    const {name, tutorialIds, storeId, onboardingSlug} = this;
    return {name, tutorialIds, storeId, onboardingSlug};
  }
}

export const lokiSettings = new LokiSettings();
const w: any = window;
w.lokiSettings = lokiSettings;
lokiSettings.load();
