/*
 * Lets a plain vertical mouse wheel scroll wide tables horizontally.
 * A trackpad already sends a horizontal delta on a two-finger swipe, but a
 * mouse wheel only ever sends vertical delta — without this, desktop mouse
 * users have no way to reach the columns hidden past the sticky column
 * except dragging the scrollbar by hand. Attaches to every .table-scroll
 * container already on the page.
 */
(function () {
  function attach(el) {
    el.addEventListener('wheel', function (e) {
      if (el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    }, { passive: false });
  }

  document.querySelectorAll('.table-scroll').forEach(attach);
})();
