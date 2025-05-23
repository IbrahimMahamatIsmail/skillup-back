const sanitizeHTML = require('sanitize-html');

module.exports = (fieldsToSanitize) => (req, res, next) => { // champs à désinfecter contre les injections XSS
  fieldsToSanitize.forEach(field => {
    if (req.body[field]) {
      req.body[field] = sanitizeHTML(req.body[field], {
        allowedTags: [],
        allowedAttributes: {}
      });
    }
  });
  next();
};