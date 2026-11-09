// Type declarations for dynamic imports used in resume parsing
declare module "pdfjs-dist/legacy/build/pdf" {
  export const GlobalWorkerOptions: {
    workerSrc: string;
  };

  export function getDocument(params: {
    data: Uint8Array | ArrayBuffer;
  }): {
    promise: Promise<any>;
  };
}

declare module 'mammoth' {
  // mammoth.convertToText returns a promise resolving to an object with a `value` string.
  const convertToText: (input: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string }>;
  export { convertToText };
}

