export const copySelectedTextToClipboard = () => {
  const selection = window.getSelection();
  if (selection) {
    const selectedText = selection.toString();
    navigator.clipboard.writeText(selectedText);
  }
};
