import { IEnumerable, IGroup } from "./interfaces";
import { List } from "./list";

export class Group<T> implements IGroup<T> {
  public groups: any[];
  public list: IEnumerable<T> = new List<T>();

  constructor(groups: any[], list: T[]) {
    this.groups = groups;
    this.list = new List<T>(list);
  }
}

export const objCompare = (obj1: any, obj2: any) => {
  // Loop through properties in object 1
  // tslint:disable-next-line:forin
  for (const p in obj1) {
    // Check property exists on both objects
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
      return false;
    }
    switch (typeof obj1[p]) {
      // Deep compare objects
      case "object":
        if (!objCompare(obj1[p], obj2[p])) {
          return false;
        }
        break;
      // Compare function code
      case "function":
        if (
          typeof obj2[p] === "undefined" ||
          (p !== "compare" && obj1[p].toString() !== obj2[p].toString())
        ) {
          return false;
        }
        break;
      // Compare values
      default:
        if (obj1[p] !== obj2[p]) {
          return false;
        }
    }
  }

  // Check object 2 for any extra properties
  for (const p in obj2) {
    if (typeof obj1[p] === "undefined") {
      return false;
    }
  }
  return true;
};

export const ITEM_NOT_FOUND_MSG = "Item does not exist.";
export const MULTIPLE_INSTANCES_FOUND_MSG =
  "Multiple instances of entity found.";
