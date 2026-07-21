export {};

declare global {
  interface Window {
    __preloaderFinished?: boolean;
  }
}
