/**
 * It describes the function descriptor value to be an async function
 */
export type DescriptorAsync = {
  configurable?: boolean;
  enumerable?: boolean;
  value?(...args): Promise<any>;
  writable?: boolean;
  get?(): any;
  set?(v: any): void;
};

export type DescriptorSync = {
  configurable?: boolean;
  enumerable?: boolean;
  value?(...args): any;
  writable?: boolean;
  get?(): any;
  set?(v: any): void;
};
