const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown() {
  let html = markdownInput.value;

  // Headings: 1-3 "#" at the start of a line (spaces allowed before), then a space.
  html = html.replace(/^ *(#{1,3}) (.*)$/gm, (_, hashes, text) => {
    const level = hashes.length;
    return `<h${level}>${text}</h${level}>`;
  });

  // Quotes: "> " at the start of a line (spaces allowed before)
  html = html.replace(/^ *> (.*)$/gm, "<blockquote>$1</blockquote>");

  // Bold: **text** or __text__. The lookahead stops "***" from closing too early.
  html = html.replace(/\*\*(.+?)\*\*(?!\*)/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__(?!_)/g, "<strong>$1</strong>");

  // Italic: *text* or _text_
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");

  // Images: ![alt](src) - must run before links
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">');

  // Links: [text](url)
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Lines are joined together with no separator.
  return html.replace(/\n/g, "");
}

markdownInput.addEventListener("input", () => {
  const html = convertMarkdown();
  htmlOutput.textContent = html; // show the tags as plain text
  preview.innerHTML = html;      // render the tags
});