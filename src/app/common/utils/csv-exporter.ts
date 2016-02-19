var FileSaver = require('FileSaver.js');

export function exportToCsv(filename: string, items: any[]) {
  let csv = new Blob([toCsv(items, ',')], {type: 'text/plain;charset=utf-8'});
  FileSaver.saveAs(csv, filename + '.csv');
}

function toCsvValue(theValue: any) {
  var t = typeof (theValue), output;

  if (t === 'undefined' || t === null) {
    output = '';
  } else if (t === 'string') {
    output = theValue;
  } else {
    output = String(theValue);
  }

  return output;
}

function toCsv(objArray: any[], delimiter: string) {
  var i, l, names = [], name, value, obj, row, output = '', n, nl;

  if (typeof (delimiter) === 'undefined' || delimiter === null) {
    delimiter = ',';
  }

  for (i = 0, l = objArray.length; i < l; i += 1) {
    obj = objArray[i];
    row = '';
    if (i === 0) {
      for (name in obj) {
        if (obj.hasOwnProperty(name)) {
          names.push(name);
          row += [name, delimiter].join('');
        }
      }
      row = row.substring(0, row.length - 1);
      output += row;
    }

    output += '\n';
    row = '';
    for (n = 0, nl = names.length; n < nl; n += 1) {
      name = names[n];
      value = obj[name];
      if (n > 0) {
        row += delimiter;
      }
      row += toCsvValue(value);
    }
    output += row;
  }

  return output;
}
