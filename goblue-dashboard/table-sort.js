/*
 * Makes any <th> that contains a .sort-caret span actually sort its column
 * when clicked, instead of being a decorative icon. Click once for
 * ascending, click again for descending. Auto-detects whether a column's
 * text is a date (MM/DD/YYYY or YYYY-MM-DD), a number (handles $, %, and
 * comma-separated values), or plain text — no per-column config needed.
 *
 * Usage: include this script, then after the table's rows exist in the DOM:
 *   GoBlueTableSort.wire('bookings-tbody');
 *
 * Sorting reorders the actual <tr> elements, so it composes cleanly with
 * the existing filter/search (visibility is per-row state, untouched) and
 * with table-export.js (which reads rows in DOM order).
 */
(function () {
  function parseCell(text) {
    const t = text.trim();
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(t)) {
      const [m, d, y] = t.split('/');
      return new Date(+y, +m - 1, +d).getTime();
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
      const [y, m, d] = t.split('-');
      return new Date(+y, +m - 1, +d).getTime();
    }
    const numeric = t.replace(/[$,%]/g, '');
    if (numeric !== '' && !isNaN(numeric)) return parseFloat(numeric);
    return t.toLowerCase();
  }

  function wire(tbodyId) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) { console.error('GoBlueTableSort.wire: tbody #' + tbodyId + ' not found'); return; }
    const table = tbody.closest('table');
    const headerRow = table.querySelector('thead tr');
    if (!headerRow) return;
    const ths = Array.from(headerRow.children);

    ths.forEach((th, index) => {
      const caret = th.querySelector('.sort-caret');
      if (!caret) return;
      th.classList.add('is-sortable');

      th.addEventListener('click', () => {
        const nextDir = th.classList.contains('sort-asc') ? 'desc' : 'asc';
        ths.forEach(other => other.classList.remove('sort-asc', 'sort-desc'));
        th.classList.add(nextDir === 'asc' ? 'sort-asc' : 'sort-desc');

        const rows = Array.from(tbody.querySelectorAll('tr'));
        const withValues = rows.map(row => ({
          row: row,
          value: parseCell(row.children[index] ? row.children[index].textContent : '')
        }));

        withValues.sort((a, b) => {
          let cmp;
          if (typeof a.value === 'number' && typeof b.value === 'number') cmp = a.value - b.value;
          else cmp = a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
          return nextDir === 'asc' ? cmp : -cmp;
        });

        withValues.forEach(item => tbody.appendChild(item.row));
      });
    });
  }

  window.GoBlueTableSort = { wire: wire };
})();
