var forms = require('resource-forms'),
domain = require('../lib/resources/domain'),
mschemaForms = require('mschema-forms');

var mergeParams = require('./mergeParams');
var bodyParser = require('body-parser');


module['exports'] = function view (opts, callback) {

   var req = opts.request,
       res = opts.response,
       $ = this.$;

 // if not logged in, kick out
 if (!req.isAuthenticated()) {
   req.session.redirectTo = "/domains";
   return res.redirect('/login');
 }

 bodyParser()(req, res, function bodyParsed() {
   mergeParams(req, res, function (){});

   req.resource.params.owner = req.user.username;

   var middle = forms.generate({
      view: 'grid-with-form',
      resource: domain,
      action: '/domains',
      params: req.resource.params,
      useLayout: false,
      form: {
        create: {
          legend: 'Add a new Domain',
          submit: "Add Domain"
        },
        grid: {
          legend: 'Your Domains'
        }
      },
      schema: {
        name: {
          type: 'string',
          description: 'marak.com',
          required: true,
          minLength: 1,
          maxLength: 50
        },
        forwardUrl: {
          type: 'string',
          description: '/Marak/echo',
          required: true,
          minLength: 1,
          maxLength: 50
        }
      }
    }, function (err, result){
      if (err) {
        return res.end(err.message);
      }
      $('.domains').html(result);
      callback(null, $.html());
      return;
      });
    });

};