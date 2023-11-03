let currentPathname = window.location.pathname;

async function navigate(pathname) {
  currentPathname = pathname;
  const response = await fetch(pathname + '?jsx');
  const jsonString = await response.text();
  if (pathname === currentPathname) {
    console.log(jsonString);
    const bodyStartIndex = html.indexOf('<body>') + '<body>'.length;
    const bodyEndIndex = html.lastIndexOf('</body>');
    const bodyHTML = html.slice(bodyStartIndex, bodyEndIndex);
    document.body.innerHTML = bodyHTML;
  }
}

window.addEventListener(
  'click',
  (e) => {
    // Only listen to link clicks.
    if (e.target.tagName !== 'A') {
      return;
    }
    // Ignore "open in a new tab".
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    // Ignore external URLs.
    const href = e.target.getAttribute('href');
    if (!href.startsWith('/')) {
      return;
    }
    // Prevent the browser from reloading the page but update the URL.
    e.preventDefault();
    window.history.pushState(null, null, href);
    // Call our custom logic.
    navigate(href);
  },
  true
);

window.addEventListener('popstate', () => {
  // When the user presses Back/Forward, call our custom logic too.
  navigate(window.location.pathname);
});
