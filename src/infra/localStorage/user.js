import LocalStorageBase from './LocalStorageBase';

class User extends LocalStorageBase {
  async updateSettings(changes) {
    const object = (await this.get()) || {};
    const updatedObject = {
      ...object,
      settings: {...object.settings, ...changes},
    };
    await this.set(updatedObject);
  }

  async markGroupAsVisitedFirstTime({groupId}) {
    const object = (await this.get()) || {};
    const updatedObject = {
      ...object,
      visitedGroups: {...object.visitedGroups, [groupId]: true},
    };
    await this.set(updatedObject);
  }
}

export default new User('user');
