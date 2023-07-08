// Function to add the "Copy Code" button to a code block
function addCopyButton(codeBlock) {
  const parentDiv = codeBlock.parentNode.parentNode;

  // Check if the copy button is already present
  if (!parentDiv.querySelector('.copy-button')) {
    const language = parentDiv.querySelector('.pl-1.text-sm.font-mono.select-none');
    const languageText = language ? language.textContent.trim() : '';

    const bottomBar = document.createElement('div');
    bottomBar.className = 'text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between';
    bottomBar.style.borderRadius = '0 0 4px 4px';

    const languageElement = document.createElement('span');
    languageElement.className = 'text-gray-400 font-semibold';
    languageElement.textContent = languageText;

    const copyButton = document.createElement('button');
    copyButton.className = 'flex ml-auto gap-2 copy-button';
    copyButton.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code';
    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(codeBlock.textContent);
      copyButton.innerText = 'Copied!';
      setTimeout(() => {
        copyButton.innerText = 'Copy code';
      }, 1500);
    });

    bottomBar.appendChild(languageElement);
    bottomBar.appendChild(copyButton);
    parentDiv.appendChild(bottomBar);
  }
}

// Mutation observer callback function
function handleMutation(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      const addedNodes = Array.from(mutation.addedNodes);
      addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const codeBlocks = node.querySelectorAll('.bg-black.rounded-md.mb-4 code');
          codeBlocks.forEach((codeBlock) => {
            addCopyButton(codeBlock);
          });
        }
      });
    }
  }
}

// Create a new mutation observer
const observer = new MutationObserver(handleMutation);

// Observe changes to the DOM and add the button when needed
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Add the button on initial page load
document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('.bg-black.rounded-md.mb-4 code');
  codeBlocks.forEach((codeBlock) => {
    addCopyButton(codeBlock);
  });
});