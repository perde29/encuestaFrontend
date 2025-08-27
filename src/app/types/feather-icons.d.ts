declare module 'feather-icons' {
  const feather: {
    replace: (options?: { class?: string }) => void;
    icons: { [key: string]: { toSvg: (attrs?: Record<string, string>) => string } };
  };
  export default feather;
}
