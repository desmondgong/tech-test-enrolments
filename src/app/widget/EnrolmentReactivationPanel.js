define([
  "dojo/_base/declare",
  "dijit/_Widget",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!/app/widget/templates/EnrolmentReactivationPanel.html",
  "dijit/form/Select",
  "dijit/form/DateTextBox",
  "dojox/validate"
], function(
  declare,
  _Widget,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  template
) {
  var EnrolmentReactivationPanel = declare(
    "EnrolmentReactivationPanel",
    [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin],
    {
      templateString: template,
      handleReactive: function(data) {},
      onReactive: function() {
        const applyData = {
          status: "Active"
        };
        this.handleReactive(applyData);
      }
    }
  );
  return EnrolmentReactivationPanel;
});
