// Minimal types to use with pdfjs-dist dynamic import
type PdfViewport = { width: number; height: number };
type PdfPage = {
  getViewport: (opts: { scale: number }) => PdfViewport;
  render: (args: { canvasContext: CanvasRenderingContext2D; viewport: PdfViewport }) => {
    promise: Promise<void>;
  };
};
type PdfDocument = { getPage: (n: number) => Promise<PdfPage> };
type PdfJsModule = {
  getDocument: (src: Uint8Array | ArrayBuffer | string) => { promise: Promise<PdfDocument> };
  GlobalWorkerOptions: { workerSrc: string };
};

export const generatePreviewFromUrl = async (url: string): Promise<string> => {
  // Cache for pdfjs module once dynamically loaded on the client
  let pdfjsLibRef: PdfJsModule | null = null;

  if (url.toLowerCase().includes(".pdf")) {
    try {
      if (!pdfjsLibRef) {
        const mod = (await import("pdfjs-dist")) as unknown as PdfJsModule;
        pdfjsLibRef = mod;
        pdfjsLibRef.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
      }

      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const typedarray = new Uint8Array(arrayBuffer);

      const pdf = await pdfjsLibRef.getDocument(typedarray).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) return url;

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: context, viewport }).promise;
      return canvas.toDataURL("image/png");
    } catch {
      return "/demo-newsletter.png";
    }
  }
  return url;
};
