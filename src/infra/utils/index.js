import {
  clone,
  capitalize,
  cloneDeep,
  sortBy,
  isEqual,
  startCase,
  chunk,
  get,
  head,
  identity,
  isNil,
  isNumber,
  invert,
  uniq,
  uniqBy,
  uniqWith,
  merge,
  intersection,
  compact,
  uniqueId,
  keyBy,
  mapValues,
  debounce,
  pick,
  pickBy,
  memoize,
  random,
  isEmpty,
  omit,
  pull,
  set,
  sumBy,
  remove,
  isObject,
  isUndefined,
  isBoolean,
  omitBy,
  transform,
  without,
  shuffle,
  orderBy,
  xor,
  unescape,
  trimEnd,
  isString,
  has,
} from 'lodash';
import React from 'react';

const dealsVisibleToType = {
  NONE: 'none',
  EXPERTS_AND_ADMINS: 'expertsAndAdmins',
  ADMINS: 'admins',
  ALL: 'all',
};

const userTypes = {
  USER: 0,
  ADMIN: 1,
  SUPER_ADMIN: 2,
};

const userRoleTypes = {
  REGIONAL_MANAGER: 'regionalManager',
  NATIONAL_MANAGER: 'nationalManager',
};

const pageRoleTypes = {
  EXPERT: 'expert',
};

const entityTypes = {
  USER: 'user',
  PAGE: 'page',
  POST: 'post',
  GROUP: 'group',
  CATEGORY: 'category',
  EVENT: 'event',
  PROFILE: 'profile',
  LIST: 'list',
  LIST_ITEM: 'listitem',
  COMMENT: 'comment',
  NEIGHBORHOOD: 'neighborhood',
  CHAT_MESSAGE: 'chatMessage',
  ACTIVATION: 'activation',
  SCHEDULED_POST: 'scheduledPost',
  COMMUNITY: 'community',
  NATIONALITY_GROUP: 'nationalityGroup',
  STORY: 'story',
  REVIEW: 'review',
};
export function getFilePathFromLocalUri(localUri) {
  return localUri.replace('file:///', '');
}

export const intersectList = (originalDataList, newDataList) => {
  if (!originalDataList || !originalDataList.length) {
    return newDataList;
  }
  if (!newDataList || !newDataList.length) {
    return originalDataList;
  }
  const originalIds = {};
  originalDataList.forEach((item) => {
    if (isObject(item)) {
      const id = item.entityId || item.id;
      originalIds[id] = true;
    } else {
      originalIds[item] = true;
    }
  });

  const filteredNewDataList = newDataList.filter((item) =>
    isObject(item) ? !originalIds[item.id] : !originalIds[item],
  );
  return [...originalDataList, ...filteredNewDataList];
};

export const appendQueryParam = (uri, key, value) => {
  if (!value) {
    return uri;
  } else {
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
    return `${uri}${separator}${key}=${value}`;
  }
};

export function canChangeCountryPicker(user, publishAs) {
  const isAdmin = isAppAdmin(user);
  const userRoles = get(user, 'roles') || [];
  const pageRoles = get(publishAs, 'roles') || [];
  const isRegionalManager = userRoles.includes(userRoleTypes.REGIONAL_MANAGER);
  const isExpert = pageRoles.includes(pageRoleTypes.EXPERT);
  return isAdmin || isRegionalManager || isExpert;
}

export function dropTestIdFromChildren(children) {
  return React.Children.map(children, (child) => {
    let childProps = child.props;
    if (child.props.testID) {
      childProps = clone(child.props);
      childProps.testID = Math.random().toString();
      return React.cloneElement(child, childProps);
    } else {
      return child;
    }
  });
}

export const deleteObjectPropFromArrayOfObjects = ({arr, propName}) => {
  if (arr && arr.length) {
    const retVal = arr.map((obj) => {
      if (obj[propName]) {
        const tmp = {...obj};
        delete tmp[propName];
        return tmp;
      }
      return obj;
    });
    return retVal;
  }
  return null;
};

export const getKeyByValue = (obj, value) =>
  Object.keys(obj).find((key) => obj[key] === value);

export const arrayToStringByKey = ({array, key}) =>
  array.reduce((total, current) => total + current[key], '');

export async function delayInMilliseconds(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export const isAppAdmin = (user) =>
  [userTypes.ADMIN, userTypes.SUPER_ADMIN].includes(user.userType);

export const isSuperAdmin = (user) => user.userType === userTypes.SUPER_ADMIN;

export function isRegionalOrNationalManager(user) {
  const userRoles = get(user, 'roles') || [];
  return [
    userRoleTypes.NATIONAL_MANAGER,
    userRoleTypes.REGIONAL_MANAGER,
  ].some((role) => userRoles.includes(role));
}

export function isPageExpert(publishAs) {
  const publishAsRoles = get(publishAs, 'roles') || [];
  return publishAsRoles.includes(pageRoleTypes.EXPERT);
}

export const canViewDeals = () => {
  const auth = get(global.store.getState(), 'auth') || {};
  const currentUser = get(auth, 'user') || {};
  const isUserAdmin = isAppAdmin(currentUser);
  const isForceDealsShow = get(auth, 'featureFlags.canViewDeals') || false;
  const dealsVisibleTo = get(
    currentUser,
    'nationalityGroup.featureFlags.dealsVisibleTo',
  );

  if (
    (isUserAdmin &&
      (dealsVisibleTo === dealsVisibleToType.ADMINS || isForceDealsShow)) ||
    dealsVisibleTo === dealsVisibleToType.ALL
  ) {
    return true;
  }

  if (!dealsVisibleTo || dealsVisibleTo === dealsVisibleToType.NONE) {
    return false;
  }

  if (dealsVisibleTo === dealsVisibleToType.EXPERTS_AND_ADMINS) {
    const isOwningPages = get(currentUser, 'totals.ownedPages') > 0;
    return !!isOwningPages || isUserAdmin;
  }

  return false;
};

export function isPageManager(publishAs) {
  const isPagePublisher = get(publishAs, 'type') === entityTypes.PAGE;
  const isPageOwner =
    !!get(publishAs, 'ownedByYou') || !!get(publishAs, 'isOwner');
  return isPagePublisher && isPageOwner;
}

export const getTopUserRole = (roles) => {
  if (roles) {
    if (roles.includes(userRoleTypes.NATIONAL_MANAGER)) {
      return userRoleTypes.NATIONAL_MANAGER;
    }
    if (roles.includes(userRoleTypes.REGIONAL_MANAGER)) {
      return userRoleTypes.REGIONAL_MANAGER;
    }
    if (roles.includes(pageRoleTypes.EXPERT)) {
      return pageRoleTypes.EXPERT;
    }
  }
  return null;
};

export const shouldRestrictPostTypes = (user, publishAs = {}) =>
  !isAppAdmin(user) &&
  !isRegionalOrNationalManager(user) &&
  !isPageExpert(publishAs) &&
  !isPageManager(publishAs);

export function differenceObject(object, base) {
  const changes = (object, base) =>
    transform(object, (result, value, key) => {
      if (!isEqual(value, base[key])) {
        // eslint-disable-next-line no-param-reassign
        result[key] =
          isObject(value) && isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });

  return changes(object, base);
}

function capitalizeWithoutFormattingRestOfText(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isArraysContainsTheSameElements(firstArray, secondArray) {
  return isEmpty(xor(firstArray, secondArray));
}

function getNewScrollState({contentYOffset, breakpoint, state}) {
  if (contentYOffset > breakpoint && !state) {
    return true;
  } else if (contentYOffset < breakpoint && state) {
    return false;
  }

  return null;
}

function zerolessToFixed(number, decimals = 0) {
  if (!number) {
    return null;
  }
  return Number(number.toFixed(decimals));
}

export {
  clone,
  capitalize,
  chunk,
  sortBy,
  cloneDeep,
  identity,
  isNil,
  isNumber,
  invert,
  omit,
  isEqual,
  get,
  head,
  uniq,
  uniqBy,
  uniqWith,
  merge,
  intersection,
  compact,
  uniqueId,
  keyBy,
  mapValues,
  debounce,
  pick,
  pickBy,
  memoize,
  random,
  isEmpty,
  pull,
  set,
  sumBy,
  remove,
  isObject,
  isUndefined,
  isBoolean,
  omitBy,
  startCase,
  without,
  capitalizeWithoutFormattingRestOfText,
  isArraysContainsTheSameElements,
  shuffle,
  orderBy,
  xor,
  unescape,
  getNewScrollState,
  trimEnd,
  isString,
  zerolessToFixed,
  has,
};
