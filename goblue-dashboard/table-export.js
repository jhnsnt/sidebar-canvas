/*
 * Shared table-export helpers (Copy / CSV / Excel / Print-to-PDF) for the
 * GoBlue Tours dashboard list pages. No dependencies, works over file://.
 *
 * Usage: include this script, then after the page's own filter logic runs:
 *   GoBlueTableExport.wire({
 *     tbodyId: 'bookings-tbody',
 *     copyBtnId: 'bookings-copy-btn',
 *     csvBtnId: 'bookings-csv-btn',
 *     excelBtnId: 'bookings-excel-btn',
 *     pdfBtnId: 'bookings-pdf-btn',
 *     fileName: 'bookings'
 *   });
 *
 * Copy/CSV/Excel always act on the currently *visible* (filtered) rows.
 * PDF calls window.print() — each page supplies a @media print stylesheet
 * that hides the sidebar/top bar/filters and prints just the table.
 */
(function () {
  function getVisibleRows(tbody) {
    return Array.from(tbody.querySelectorAll('tr')).filter(tr => tr.style.display !== 'none');
  }

  function cellText(td) {
    return td.textContent.replace(/\s+/g, ' ').trim();
  }

  function getRowsData(table, tbody) {
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.replace(/\s+/g, ' ').trim());
    const rows = getVisibleRows(tbody).map(tr => Array.from(tr.children).map(cellText));
    return { headers, rows };
  }

  function flashButton(btn, label) {
    const originalHtml = btn.innerHTML;
    btn.textContent = label;
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = originalHtml; btn.disabled = false; }, 1200);
  }

  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(textarea);
    return ok;
  }

  function downloadBlob(content, mime, fileName) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function toCsv(headers, rows) {
    function esc(v) {
      const s = String(v);
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }
    const lines = [headers.map(esc).join(',')];
    rows.forEach(r => lines.push(r.map(esc).join(',')));
    return lines.join('\r\n');
  }

  function toExcelXml(headers, rows, sheetName) {
    function esc(v) {
      return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    function cell(v) {
      return '<Cell><Data ss:Type="String">' + esc(v) + '</Data></Cell>';
    }
    let xml = '<?xml version="1.0"?>' +
      '<?mso-application progid="Excel.Sheet"?>' +
      '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">' +
      '<Worksheet ss:Name="' + esc(sheetName).slice(0, 31) + '"><Table>';
    xml += '<Row>' + headers.map(cell).join('') + '</Row>';
    rows.forEach(r => { xml += '<Row>' + r.map(cell).join('') + '</Row>'; });
    xml += '</Table></Worksheet></Workbook>';
    return xml;
  }

  function wire(config) {
    const tbody = document.getElementById(config.tbodyId);
    if (!tbody) { console.error('GoBlueTableExport.wire: tbody #' + config.tbodyId + ' not found'); return; }
    const table = tbody.closest('table');

    const copyBtn = document.getElementById(config.copyBtnId);
    const csvBtn = document.getElementById(config.csvBtnId);
    const excelBtn = document.getElementById(config.excelBtnId);
    const pdfBtn = document.getElementById(config.pdfBtnId);

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const { headers, rows } = getRowsData(table, tbody);
        if (!rows.length) { flashButton(copyBtn, 'No rows'); return; }
        const tsv = [headers.join('\t')].concat(rows.map(r => r.join('\t'))).join('\n');
        const ok = copyToClipboard(tsv);
        flashButton(copyBtn, ok ? 'Copied!' : 'Copy failed');
      });
    }
    if (csvBtn) {
      csvBtn.addEventListener('click', () => {
        const { headers, rows } = getRowsData(table, tbody);
        if (!rows.length) { flashButton(csvBtn, 'No rows'); return; }
        downloadBlob(toCsv(headers, rows), 'text/csv;charset=utf-8;', config.fileName + '.csv');
        flashButton(csvBtn, 'Downloaded');
      });
    }
    if (excelBtn) {
      excelBtn.addEventListener('click', () => {
        const { headers, rows } = getRowsData(table, tbody);
        if (!rows.length) { flashButton(excelBtn, 'No rows'); return; }
        downloadBlob(toExcelXml(headers, rows, config.sheetName || config.fileName), 'application/vnd.ms-excel', config.fileName + '.xls');
        flashButton(excelBtn, 'Downloaded');
      });
    }
    if (pdfBtn) {
      pdfBtn.addEventListener('click', () => window.print());
    }
  }

  window.GoBlueTableExport = { wire: wire };
})();
