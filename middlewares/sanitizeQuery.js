const sanitizeQueryHtml = require('sanitize-html');

module.exports = (fieldsToSanitize) => (req, res, next) => {
  fieldsToSanitize.forEach(field => {
    if (req.query[field]) {
      req.query[field] = sanitizeQueryHtml(req.query[field], {
        allowedTags: [],
        allowedAttributes: {}
      });
    }
  });
  next();
};
