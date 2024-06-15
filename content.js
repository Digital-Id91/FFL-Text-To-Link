const fflPattern = /\b\d{9}[A-Za-z]\d{5}\b/g;

function createFFLLink(fflNumber) {
  const licsRegn = fflNumber[0];
  const licsDis = fflNumber.slice(1, 3);
  const licsSeq = fflNumber.slice(10);

  return `https://fflezcheck.atf.gov/FFLEzCheck/fflSearch.action?licsRegn=${licsRegn}&licsDis=${licsDis}&licsSeq=${licsSeq}`;
}

function linkifyFFLText() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;

  while (node = walker.nextNode()) {
    const matches = node.textContent.match(fflPattern);
    if (matches) {
      const parent = node.parentNode;
      const fragments = node.textContent.split(fflPattern);
      const newNodes = [];

      fragments.forEach((fragment, index) => {
        newNodes.push(document.createTextNode(fragment));
        if (matches[index]) {
          const link = document.createElement('a');
          link.href = createFFLLink(matches[index]);
          link.textContent = matches[index];
          link.setAttribute('target', '_blank');
          newNodes.push(link);
        }
      });

      newNodes.forEach(newNode => parent.insertBefore(newNode, node));
      parent.removeChild(node);
    }
  }
}

linkifyFFLText();
