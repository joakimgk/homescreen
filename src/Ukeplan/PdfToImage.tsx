import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/build/pdf.worker.min.js';

const PdfToImage = ({ pdfUrl, pageNumber = 1, sliceWidth = 200 }: { pdfUrl: string, pageNumber?: number, sliceWidth?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = useState<string>();

  useEffect(() => {
    const renderPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(pageNumber);

      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const context = canvas.getContext('2d');
      if (!context) return null;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext).promise;

      // Convert canvas to image
      const imageDataUrl = canvas.toDataURL('image/png');
      setImageSrc(imageDataUrl);
    };

    renderPdf();
  }, [pdfUrl, pageNumber]);

  return (
    <div style={{ overflow: 'hidden', width: `${sliceWidth}px` }}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {imageSrc && canvasRef.current && (
        <img
          src={imageSrc}
          alt="PDF Page"
          style={{ marginLeft: `-${(canvasRef.current.width - sliceWidth) / 2}px` }}
        />
      )}
    </div>
  );
};

export default PdfToImage;