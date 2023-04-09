declare module '*.md';

type AnyCb<ENTER extends unknown[] = unknown[], EXIT = void> = (...args: ENTER) => EXIT

type CompInstanceType<T> = InstanceType<T>;

type ClassType = string | string[];

type StyleType = Record<string, string>;
