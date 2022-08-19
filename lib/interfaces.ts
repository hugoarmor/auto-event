/**
 * It describes the function descriptor value to be an async function
 */
export type Descriptor = {
  configurable?: boolean;
  enumerable?: boolean;
  value?(...args): Promise<any>;
  writable?: boolean;
  get?(): any;
  set?(v: any): void;
};
