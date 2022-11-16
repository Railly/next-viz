declare module "@next-viz/cli" {
  export const logger: {
    success: (msg: string) => void;
    info: (...args: any[]) => void;
    error: (...args: any[]) => void;
    warn: (msg: string) => void;
    log: (...args: any[]) => void;
    viz: (...args: any[]) => void;
  };
}
