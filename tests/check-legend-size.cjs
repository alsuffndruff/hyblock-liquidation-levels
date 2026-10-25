// Local contract checks only; this is not a TradingView/Pine compiler.
const fs = require('fs');
const assert = require('assert/strict');
const current = fs.readFileSync(process.argv[2] || 'cws-liquidation-levels-v1.7.2-legend-size.pine', 'utf8');
const previous = fs.readFileSync(process.argv[3] || 'cws-liquidation-levels-v1.7.1-multi-timeframe.pine', 'utf8');

assert(current.includes('input.bool(false, "Show OI size at line midpoint"'));
assert(current.includes('input.bool(true, "Show color legend"'));
assert(current.includes('input.bool(false, "Show diagnostic panel"'));
assert(current.includes('input.int(3, "Uniform line width"'));
assert(current.includes('input.string("OI+CVD", "Experimental event model"'));
assert.equal((current.match(/\blabel\.new\(/g) || []).length, 1);
assert(current.includes('if showOiSizeLabels\n                    // Visible label text is numeric ONLY;'));
assert(current.includes('text = str.tostring(impulseM, "0.00")'));
assert(!/label\.set_text\(/.test(current));
assert(!/\b(line|label)\.delete\(/.test(current));
assert.equal((current.match(/^plot\(/gm) || []).length, 64);
assert(current.includes('max_lines_count = 500, max_labels_count = 500'));

function block(text, start, end) {
  const a = text.indexOf(start);
  const b = text.indexOf(end, a + start.length);
  assert(a >= 0 && b > a, 'Required source block missing');
  return text.slice(a, b);
}
for (const [a, b] of [
  ['isDuplicate(float price, bool longSide, int leverage) =>', 'addLevel('],
  ['bool supportedTimeframe =', 'var int capacitySkipped'],
  ['    bool newImpulse =', '    confirmedScore :='],
  ['// Fixed-size price-scale slots.', 'var table panel =']
]) assert.equal(block(current, a, b), block(previous, a, b));
const exportMarker = '// Data Window contains raw signed observations for inspection/export.';
assert.equal(current.slice(current.indexOf(exportMarker)), previous.slice(previous.indexOf(exportMarker)));
const color = 'longSide ? (leverage == levHigh ? longHighColor : leverage == levMedium ? longMediumColor : longLowColor) : (leverage == levHigh ? shortHighColor : leverage == levMedium ? shortMediumColor : shortLowColor)';
assert(previous.includes('color levelColor = ' + color));
assert(current.includes('scenarioColor(bool longSide, int leverage) =>\n    ' + color));
assert(current.includes('color levelColor = scenarioColor(longSide, leverage)'));

const typeBody = block(current, 'type Level\n', 'var array<Level>');
const fields = typeBody.split('\n').slice(1).filter(s => s.trim() && !s.trim().startsWith('//'));
assert.equal(fields.length, 11);
assert(current.includes('Level.new(ln, oiSizeLabel, price, bar_index, time_close, longSide, leverage, sizeClass, levelColor, impulseM, 0)'));
for (const [start, end] of [[0, 1], [0, 900000], [1792920000000, 1792920900000], [0, 31536000000]]) {
  const middle = start + Math.trunc((end - start) / 2);
  assert(middle >= start && middle <= end);
  assert(Math.abs((middle - start) - (end - middle)) <= 1);
}
console.log('PASS: optional numeric-only labels, resource/plot limits, color mapping, midpoint boundaries, unchanged model/export contracts. TradingView runtime/UI validation remains issue #4.');
