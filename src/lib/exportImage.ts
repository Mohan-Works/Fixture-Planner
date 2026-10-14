import html2canvas from 'html2canvas';

export async function exportBracketPng(element: HTMLElement, filename: string): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: '#ffffff',
    useCORS: true,
    logging: false,
    windowWidth: element.scrollWidth + 100,
  });

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}.png`;
  link.href = dataUrl;
  link.click();
}
