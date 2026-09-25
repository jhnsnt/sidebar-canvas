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
      id: 'proposals-pa', label: 'Proposals P&A',
      icon: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
      children: [
        { id: 'proposals-pa-vendors', label: 'Vendors', href: '#' },
        { id: 'proposals-pa-groups', label: 'Groups', href: '#' },
        { id: 'proposals-pa-product-types', label: 'Product Types', href: '#' },
        { id: 'proposals-pa-search-product', label: 'Search Product', href: '#' }
      ]
    },
    {
      id: 'bookings', label: 'Bookings',
      icon: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
      children: [
        { id: 'booking-requests', label: 'Booking Requests', href: 'booking-requests.html' },
        { id: 'bookings-list', label: 'Bookings', href: 'bookings.html' },
        {
          id: 'quotes', label: 'Quotes',
          children: [
            { id: 'quotes-schools', label: 'Schools', href: '#' },
            { id: 'quotes-vendors', label: 'Vendors', href: '#' },
            { id: 'quotes-product-types', label: 'Product Types', href: '#' }
          ]
        }
      ]
    },
    {
      id: 'operations', label: 'Operations',
      icon: '<circle cx="9" cy="8" r="4"/><path d="M2 20c0-3.9 3.1-7 7-7h1"/><circle cx="18" cy="17" r="3"/><path d="M18 12.5v1M18 20.5v1M22.1 14.75l-.87.5M14.77 19.75l-.87.5M14.77 14.75l.87.5M22.1 19.75l-.87.5"/>',
      children: [
        {
          id: 'motorcoach', label: 'Motorcoach', href: '#', badge: { count: 4, color: '#8e2d0a' },
          icon: '<rect x="3" y="6" width="18" height="11" rx="2"/><path d="M3 12h18"/><path d="M7 6V4M17 6V4"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>'
        },
        {
          id: 'airlines', label: 'Airlines', href: '#', badge: { count: 0, color: '#6b7280' },
          icon: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.3.5-.1 1.1.4 1.4l5.9 3.3-1.2 1.2c-.5.5-.8 1.1-.8 1.8v.3c0 .5-.2 1-.6 1.4l-1.9 1.9c-.4.4-.4 1 0 1.4l.6.6c.4.4 1 .4 1.4 0l1.9-1.9c.4-.4.9-.6 1.4-.6h.3c.7 0 1.3-.3 1.8-.8l1.2-1.2 3.3 5.9c.3.5.9.7 1.4.4l.5-.3c.4-.2.6-.6.5-1.1z"/>'
        },
        {
          id: 'hotel', label: 'Hotel', href: '#', badge: { count: 6, color: '#7a9c4e' },
          icon: '<path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7"/><path d="M3 18h18"/><path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"/>'
        },
        { id: 'operations-vendors', label: 'Vendors', href: 'vendors.html' },
        { id: 'proposals-by-school', label: 'Proposals by School', href: '#' },
        { id: 'product-requests-needed', label: 'Product Requests Needed', href: '#' },
        { id: 'all-requests', label: 'All Requests', href: '#' },
        { id: 'passenger-dump', label: 'Passenger Dump', href: 'passenger-dump.html' },
        { id: 'pdf-processor', label: 'PDF Processor', href: '#' }
      ]
    },
    {
      id: 'reports', label: 'Reports',
      icon: '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-4"/>',
      children: [
        {
          id: 'reports-sales', label: 'Sales',
          children: [
            { id: 'travel-insurance-policies', label: 'Travel Insurance Policies', href: 'travel-insurance-policies.html' },
            { id: 'battleface-travel-protection', label: 'Battleface Travel Protection', href: 'battleface-policies.html' },
            { id: 'booking-quotes', label: 'Booking Quotes', href: 'booking-quotes-report.html' },
            { id: 'party-package', label: 'Party Package', href: 'party-package-report.html' },
            { id: 'booked-products', label: 'Booked Products', href: '#' },
            { id: 'product-report', label: 'Product Report', href: 'product-report.html' }
          ]
        },
        {
          id: 'reports-operations', label: 'Operations',
          children: [
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
            { id: 'pax-count-by-day', label: 'Pax Count By Day', href: 'pax-count-report.html' },
            { id: 'pax-count-by-arrival-date', label: 'Pax Count By Arrival Date', href: 'pax-count-report.html?arrival_date=1' },
            { id: 'pax-count-by-departure-date', label: 'Pax Count By Departure Date', href: 'pax-count-report.html?departure_date=1' },
            { id: 'missing-info-pax', label: 'Missing Info Pax', href: 'missing-info-pax.html' },
            { id: 'mark-for-deletion', label: 'Mark For Deletion', href: 'mark-for-deletion.html' }
          ]
        },
        {
          id: 'reports-finance', label: 'Finance',
          children: [
            { id: 'ytd-report', label: 'YTD Report', href: 'ytd-report.html' },
            { id: 'payments', label: 'Payments', href: 'payments-report.html' },
            { id: 'bookings-by-customer-payment', label: 'Bookings By Customer Payment', href: 'bookings-by-customer-payment.html' }
          ]
        },
        {
          id: 'reports-finance-accounting', label: 'Finance Accounting',
          children: [
            { id: 'ar-report', label: 'AR Report', href: '#' },
            { id: 'ar-ap-combo-report', label: 'AR/AP Combo Report', href: '#' },
            { id: 'booking-by-customer-payment', label: 'Booking By Customer Payment', href: '#' },
            { id: 'customer-payments', label: 'Customer Payments', href: '#' },
            { id: 'margin-report', label: 'Margin Report', href: '#' },
            { id: 'stripe-refunds', label: 'Stripe Refunds', href: '#' },
            { id: 'vendor-payment-report', label: 'Vendor Payment Report', href: '#' }
          ]
        }
      ]
    }
  ];

  // Flat list rendered inside the footer's "Settings" flyout (see attachBehavior).
  const SETTINGS_ITEMS = [
    { id: 'two-factor-authentication', label: 'Two-Factor Authentication', href: '#' },
    { id: 'agreement-rules', label: 'Agreement Rules', href: '#' },
    { id: 'payment-rules', label: 'Payment Rules', href: '#' },
    { id: 'email-templates', label: 'Email templates', href: '#' },
    { id: 'taxes-and-fees', label: 'Taxes and fees', href: '#' },
    { id: 'foreign-exchange', label: 'Foreign Exchange', href: '#' },
    { id: 'terms-and-conditions', label: 'Terms and Conditions', href: '#' },
    { id: 'product-types', label: 'Product Types', href: '#' },
    { id: 'destinations', label: 'Destinations', href: '#' },
    { id: 'destination-settings', label: 'Destination Settings', href: '#' },
    { id: 'users-management', label: 'Users Management', href: '#' },
    { id: 'consultant-profiles', label: 'Consultant Profiles', href: '#' },
    { id: 'minimum-nights', label: 'Minimum Nights', href: '#' },
    { id: 'credit-card-types', label: 'Credit Card Types', href: '#' },
    { id: 'payment-types', label: 'Payment Types', href: '#' }
  ];

  function chevronSvg(cls) {
    return '<svg class="' + cls + '" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>';
  }

  // A group "contains" the active id if it IS the active id, or (recursively)
  // one of its children does — lets a Reports > Sales > Payments path open
  // both the Reports and Sales levels from a single activeId leaf.
  function containsActive(item, activeId) {
    if (item.id === activeId) return true;
    if (item.children) return item.children.some(c => containsActive(c, activeId));
    return false;
  }

  // Renders one entry inside a .sub-nav: either a plain link (leaf) or a
  // nested, independently-collapsible group (used for the Reports
  // department sub-menus: Sales / Operations / Finance).
  function renderNavChild(item, activeId) {
    if (!item.children) {
      const badgeHtml = item.badge ? '<span class="sub-nav-badge" style="background:' + item.badge.color + '">' + item.badge.count + '</span>' : '';
      const iconHtml = item.icon ? '<svg class="sub-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + item.icon + '</svg>' : '';
      return '<a href="' + item.href + '"' + (item.id === activeId ? ' class="is-active"' : '') + '>' + badgeHtml + iconHtml + '<span>' + item.label + '</span></a>';
    }

    const isOpen = containsActive(item, activeId);
    return '<div id="nav-' + item.id + '" class="sub-nav-group' + (isOpen ? ' is-open is-active-group' : '') +
      '" role="button" tabindex="0" aria-expanded="' + (isOpen ? 'true' : 'false') + '" aria-controls="subnav-' + item.id + '">' +
      '<span>' + item.label + '</span>' +
      chevronSvg('sidebar-chevron') +
      '</div>' +
      '<div id="subnav-' + item.id + '" class="sub-sub-nav' + (isOpen ? ' is-open' : '') + '" data-submenu-for="nav-' + item.id + '">' +
        item.children.map(child => renderNavChild(child, activeId)).join('') +
      '</div>';
  }

  function renderItem(item, activeId) {
    const isParentOfActive = item.children && item.children.some(c => containsActive(c, activeId));
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

    const childrenHtml = item.children.map(child => renderNavChild(child, activeId)).join('');

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
          '<a href="index.html" class="sidebar-brand-text leading-none flex-shrink-0" title="Dashboard">' +
            '<img src="https://landmarkeducationaltours.com/images/landmark-logo.png" alt="Landmark Educational Tours" class="h-9 w-auto sidebar-logo-white">' +
          '</a>' +
          '<button id="sidebar-toggle" class="sidebar-toggle text-white/50 hover:text-white transition">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>' +
          '</button>' +
        '</div>' +
        '<nav class="flex-1 space-y-0.5">' + navHtml + '</nav>' +
        '<div class="sidebar-footer">' +
          '<div id="settings-flyout" class="settings-flyout">' +
            SETTINGS_ITEMS.map(item => '<a href="' + item.href + '">' + item.label + '</a>').join('') +
          '</div>' +
          '<div class="sidebar-footer-row">' +
            '<button id="settings-toggle" type="button" class="sidebar-footer-btn" aria-expanded="false" aria-controls="settings-flyout">' +
              '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>' +
              '<span class="sidebar-label">Settings</span>' +
            '</button>' +
            '<a href="#" class="sidebar-footer-btn">' +
              '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>' +
              '<span class="sidebar-label">Sign-out</span>' +
            '</a>' +
          '</div>' +
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

    const settingsToggle = document.getElementById('settings-toggle');
    const settingsFlyout = document.getElementById('settings-flyout');
    function closeSettingsFlyout() {
      settingsFlyout.classList.remove('is-open');
      settingsToggle.setAttribute('aria-expanded', 'false');
    }
    settingsToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = settingsFlyout.classList.toggle('is-open');
      settingsToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => {
      if (!settingsFlyout.classList.contains('is-open')) return;
      if (e.target.closest('#settings-flyout') || e.target.closest('#settings-toggle')) return;
      closeSettingsFlyout();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSettingsFlyout();
    });
  }

  window.GoBlueSidebar = { render: render };
})();
