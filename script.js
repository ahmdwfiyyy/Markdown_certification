const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown() {
  let html = markdownInput.value;

  // Markdown rules are added here, one step at a time.

  // Lines are joined together with no separator.
  return html.replace(/\n/g, "");
}

markdownInput.addEventListener("input", () => {
  const html = convertMarkdown();
  htmlOutput.textContent = html; // show the tags as plain text
  preview.innerHTML = html;      // render the tags
});