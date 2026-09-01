/*
 * Shared top bar component for the GoBlue Tours dashboard.
 * Usage: include this script, add <div id="topbar-root"></div> as the first
 * child inside the page's main content column (right before <main>), then call:
 *   GoBlueTopBar.render();
 */
(function () {
  function render() {
    const root = document.getElementById('topbar-root');
    if (!root) { console.error('GoBlueTopBar.render: #topbar-root not found on this page'); return; }

    root.innerHTML =
      '<div class="h-[3px]" style="background:var(--primary);"></div>' +
      '<header class="bg-white border-b border-[var(--line)] sticky top-0 z-30">' +
        '<div class="px-4 sm:px-6 py-3 sm:py-0 sm:h-[68px] flex flex-col sm:flex-row sm:items-center gap-3">' +
          '<div class="flex items-center gap-3 min-w-0">' +
            '<button id="mobile-menu-btn" class="mobile-menu-btn top-icon-btn flex-shrink-0" title="Menu">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>' +
            '</button>' +
            '<div class="flex items-center gap-2 overflow-x-auto min-w-0 sm:flex-1 pt-1.5 -mt-1.5">' +
              '<button class="top-icon-btn" title="Notifications">' +
                '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>' +
                '<span class="icon-badge-count">20</span>' +
              '</button>' +
              '<button class="top-icon-btn is-alert" title="Alerts">' +
                '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>' +
              '</button>' +
              '<span class="top-icon-divider"></span>' +
              '<a href="index.html" class="top-icon-btn" title="Home">' +
                '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>' +
              '</a>' +
              '<button class="top-icon-btn" title="New">' +
                '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>' +
              '</button>' +
              '<button class="top-icon-btn" title="Documents">' +
                '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>' +
              '</button>' +
              '<button class="top-icon-btn" title="Send">' +
                '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>' +
              '</button>' +
              '<span class="top-icon-divider"></span>' +
              '<button class="top-icon-btn" title="Log out">' +
                '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><path d="M12 2v10"/></svg>' +
              '</button>' +
            '</div>' +
          '</div>' +
          '<div class="relative w-full sm:w-auto sm:ml-auto flex-shrink-0">' +
            '<input type="text" id="global-search-input" class="search-input w-full sm:w-[180px]" placeholder="Global search…">' +
          '</div>' +
        '</div>' +
      '</header>';
  }

  window.GoBlueTopBar = { render: render };
})();
