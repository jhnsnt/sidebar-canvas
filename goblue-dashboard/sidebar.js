/*
 * Shared sidebar component for the GoBlue Tours dashboard.
 * Usage: include this script, add <div id="sidebar-root" style="display:contents"></div>
 * as the first child of the page's .flex.min-h-screen wrapper, then call:
 *   GoBlueSidebar.render('dashboard');   // or 'bookings', 'reports', etc — see NAV below
 *
 * display:contents on the root placeholder keeps the injected <aside> a direct flex
 * item of .flex.min-h-screen (required for the sticky/flex-shrink-0 sidebar behavior)
 * without adding an extra wrapper box into the layout.
 */
(function () {
  const NAV = [
    {
      id: 'dashboard', label: 'Dashboard', href: 'index.html',
      icon: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>'
    },
    {
      id: 'helpdesk', label: 'Helpdesk',
      icon: '<path d="M3 11a9 9 0 0 1 18 0v5a3 3 0 0 1-3 3h-1v-7h4"/><path d="M3 16v-5h4v7H6a3 3 0 0 1-3-3z"/>'
    },
    {
      id: 'task', label: 'Task',
      icon: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'
    },
    {
      id: 'conversations', label: 'Conversations',
      icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'
    },
    {
      id: 'operations', label: 'Operations',
      icon: '<path d="M13 2 3 14h7l-1 8 10-12h-7z"/>',
      children: [
        { id: 'vendors', label: 'Vendors', href: 'vendors.html' },
        { id: 'flight-pickup', label: 'Flight Pickup', href: '#' },
        { id: 'passenger-dump', label: 'Passenger Dump', href: 'passenger-dump.html' }
      ]
    },
    {
      id: 'reports', label: 'Reports',
      icon: '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-4"/>',
      children: [
        { id: 'travel-insurance-policies', label: 'Travel Insurance Policies', href: 'travel-insurance-policies.html' },
        { id: 'battleface-travel-protection', label: 'Battleface Travel Protection', href: 'battleface-policies.html' },
        { id: 'booking-quotes', label: 'Booking Quotes', href: 'booking-quotes-report.html' },
        { id: 'voucher-status', label: 'Voucher Status', href: 'voucher-status-report.html' },
        { id: 'room-manifest', label: 'Room Manifest', href: 'room-manifest.html' },
        { id: 'oasis-manifest', label: 'Oasis Manifest', href: 'room-manifest.html?oasis=1' },
        { id: 'flight-pickup-report', label: 'Flight Pickup', href: '#' },
        { id: 'flight-update-24-hours', label: 'Flight Update 24 hours', href: 'last-movements-flight-pickup.html' },
        { id: 'flight-manifest', label: 'Flight Manifest', href: 'flight-manifest.html' },
        { id: 'flight-report', label: 'Flight Report', href: 'flight-report.html' },
        { id: 'flight-mismatch', label: 'Flight Mismatch', href: 'flight-mismatch.html' },
        { id: 'last-movements-flight-pickup', label: 'Last Movements Flight Pick up', href: 'last-movements-flight-pickup.html' },
        { id: 'booze-cruise', label: 'Booze Cruise', href: 'booze-cruise.html' },
        { id: 'insurance-manifest', label: 'Insurance Manifest', href: 'insurance-manifest.html' },
        { id: 'insurance-manifest-sbu', label: 'Insurance Manifest SBU', href: 'insurance-manifest.html?sbu=1' },
        { id: 'ytd-report', label: 'YTD Report', href: 'ytd-report.html' },
        { id: 'party-package', label: 'Party Package', href: 'party-package-report.html' },
        { id: 'booked-products', label: 'Booked Products', href: '#' },
        { id: 'pax-count-by-day', label: 'Pax Count By Day', href: 'pax-count-report.html' },
        { id: 'pax-count-by-arrival-date', label: 'Pax Count By Arrival Date', href: 'pax-count-report.html?arrival_date=1' },
        { id: 'pax-count-by-departure-date', label: 'Pax Count By Departure Date', href: 'pax-count-report.html?departure_date=1' },
        { id: 'missing-info-pax', label: 'Missing Info Pax', href: 'missing-info-pax.html' },
        { id: 'payments', label: 'Payments', href: 'payments-report.html' },
        { id: 'bookings-by-customer-payment', label: 'Bookings By Customer Payment', href: 'bookings-by-customer-payment.html' },
        { id: 'mark-for-deletion', label: 'Mark For Deletion', href: 'mark-for-deletion.html' },
        { id: 'product-report', label: 'Product Report', href: 'product-report.html' }
      ]
    },
    {
      id: 'settings', label: 'Settings',
      icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
      children: [
        { id: 'two-factor-authentication', label: 'Two-Factor Authentication (2FA)', href: '#' },
        { id: 'agreement-rules', label: 'Agreement Rules', href: '#' },
        { id: 'payment-rules', label: 'Payment Rules', href: '#' },
        { id: 'email-templates', label: 'Email Templates', href: '#' },
        { id: 'voucher-texts', label: 'Voucher Texts', href: '#' },
        { id: 'taxes-and-fees', label: 'Taxes and fees', href: '#' },
        { id: 'foreign-exchange', label: 'Foreign Exchange', href: '#' },
        { id: 'terms-and-conditions', label: 'Terms and Conditions', href: '#' },
        { id: 'product-types', label: 'Product Types', href: '#' },
        { id: 'destinations', label: 'Destinations', href: '#' },
        { id: 'destination-settings', label: 'Destination Settings', href: '#' },
        { id: 'users-management', label: 'Users Management', href: '#' },
        { id: 'minimum-nights', label: 'Minimum Nights', href: '#' },
        { id: 'proposal-text-templates', label: 'Proposal Text Templates', href: '#' }
      ]
    }
  ];

  function chevronSvg(cls) {
    return '<svg class="' + cls + '" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>';
  }

  function renderItem(item, activeId) {
    const isParentOfActive = item.children && item.children.some(c => c.id === activeId);
    const isActive = item.id === activeId;
    const isOpen = isParentOfActive;

    if (!item.children) {
      const tag = item.href ? 'a' : 'div';
      const hrefAttr = item.href ? ' href="' + item.href + '"' : '';
      return '<' + tag + hrefAttr + ' class="nav-item' + (isActive ? ' is-active' : '') + '">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + item.icon + '</svg>' +
        '<span class="sidebar-label">' + item.label + '</span>' +
        '</' + tag + '>';
    }

    const childrenHtml = item.children.map(child =>
      '<a href="' + child.href + '"' + (child.id === activeId ? ' class="is-active"' : '') + '>' + child.label + '</a>'
    ).join('');

    return '<div id="nav-' + item.id + '" class="nav-item' + (isActive || isParentOfActive ? ' is-active' : '') + (isOpen ? ' is-open' : '') +
      '" role="button" tabindex="0" aria-expanded="' + (isOpen ? 'true' : 'false') + '" aria-controls="subnav-' + item.id + '">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + item.icon + '</svg>' +
      '<span class="sidebar-label">' + item.label + '</span>' +
      chevronSvg('sidebar-chevron') +
      '</div>' +
      '<div id="subnav-' + item.id + '" class="sub-nav' + (isOpen ? ' is-open' : '') + '" data-submenu-for="nav-' + item.id + '">' + childrenHtml + '</div>';
  }

  function render(activeId) {
    const root = document.getElementById('sidebar-root');
    if (!root) { console.error('GoBlueSidebar.render: #sidebar-root not found on this page'); return; }

    const navHtml = NAV.map(item => renderItem(item, activeId)).join('');

    root.innerHTML =
      '<div id="sidebar-backdrop" class="sidebar-backdrop"></div>' +
      '<aside id="sidebar" class="sidebar flex-shrink-0 flex flex-col py-5">' +
        '<div class="flex items-center justify-between pl-5 pr-4 pb-5 mb-2 border-b border-white/10">' +
          '<a href="index.html" class="sidebar-brand-text leading-none" title="Dashboard">' +
            '<img src="https://gobluetours.com/_next/image/?url=%2Flogo.webp&w=390&q=75" alt="Go Blue Tours" class="h-9 w-auto rounded">' +
          '</a>' +
          '<button id="sidebar-toggle" class="sidebar-toggle text-white/50 hover:text-white transition">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>' +
          '</button>' +
        '</div>' +
        '<nav class="flex-1 space-y-0.5">' + navHtml + '</nav>' +
        '<div class="px-5 pt-4 mt-2 border-t border-white/10 sidebar-label">' +
          '<p class="text-[11px] text-white/30">GoBlue Tours CRM v3.2</p>' +
        '</div>' +
      '</aside>';

    attachBehavior();
  }

  function attachBehavior() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    function openMobileSidebar() {
      sidebar.classList.add('is-mobile-open');
      backdrop.classList.add('is-visible');
    }
    function closeMobileSidebar() {
      sidebar.classList.remove('is-mobile-open');
      backdrop.classList.remove('is-visible');
    }

    // Delegated so this works regardless of whether the top bar (which owns
    // #mobile-menu-btn) is rendered before or after the sidebar component.
    document.addEventListener('click', (e) => {
      if (e.target.closest('#mobile-menu-btn')) openMobileSidebar();
    });
    backdrop.addEventListener('click', closeMobileSidebar);

    document.getElementById('sidebar-toggle').addEventListener('click', () => {
      if (window.innerWidth < 1024) { closeMobileSidebar(); return; }
      sidebar.classList.toggle('is-collapsed');
    });

    sidebar.querySelectorAll('[data-submenu-for]').forEach(submenu => {
      const trigger = document.getElementById(submenu.dataset.submenuFor);
      function toggle() {
        const isOpen = trigger.classList.toggle('is-open');
        submenu.classList.toggle('is-open', isOpen);
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
      trigger.addEventListener('click', toggle);
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    });
  }

  window.GoBlueSidebar = { render: render };
})();
