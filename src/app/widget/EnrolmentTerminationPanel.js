define([
  "dojo/_base/declare",
  "dijit/_Widget",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!/app/widget/templates/EnrolmentTerminationPanel.html",
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
  var EnrolmentTerminationPanel = declare(
    "EnrolmentTerminationPanel",
    [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin],
    {
      templateString: template,
      handleTerminate: function(data) {},
      handleCancel: function() {},
      onTerminate: function() {
        if (!this.terminateDateDom.value || !this.terminateStatusDom.value) {
          alert("Some required fields are empty");
          return;
        }
        const applyData = {
          status: "Terminated",
          terminateDate: this.terminateDateDom.value.getTime(),
          terminateStatus: this.terminateStatusDom.value
        };
        this.handleTerminate(applyData);
      }
    }
  );
  return EnrolmentTerminationPanel;
});
