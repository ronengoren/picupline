import LocalStorageBase from './LocalStorageBase';

class Misc extends LocalStorageBase {
  async isFirstSession() {
    const miscData = await this.get();
    const isFirstSession = !(miscData && miscData.hasOpened);
    return isFirstSession;
  }

  async updateHasOpened() {
    await this.update({hasOpened: true});
  }

  async isNewUser() {
    const miscData = await this.get();
    const isNewUser = !!(miscData && miscData.isNewUser);
    return isNewUser;
  }

  async updateHasFirstView(hasFirstView) {
    await this.update({hasFirstView});
  }

  async hasFirstView() {
    const miscData = await this.get();
    return miscData && miscData.hasFirstView;
  }

  async updateAnnotations(changes = {}) {
    const miscData = (await this.get()) || {};
    const annotations = miscData.annotations || {};
    this.update({annotations: {...annotations, ...changes}});
  }

  async removeNonUserData() {
    const miscData = (await this.get()) || {};
    const annotations = miscData.annotations || {};
    this.set({annotations: {...annotations}, hasOpened: miscData.hasOpened});
  }

  remove() {
    return this.removeNonUserData();
  }
}

export default new Misc('misc');
