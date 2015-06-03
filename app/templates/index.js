
'use strict';

/**
 * Expose <%= camelName %>
 *
 * @param {String} input
 * @return {String}
 * @api public
 */

module.exports = function(input) {
  return 'Hello ' + (input || 'world');
};
