define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/on",
  "dijit/popup",
  "dojo/dom-construct",
  "dijit/_Widget",
  "dijit/Tooltip",
  "dijit/TooltipDialog",
  "./EnrolmentTerminationPanel",
  "./EnrolmentReactivationPanel"
], function(
  declare,
  lang,
  on,
  popup,
  domConstruct,
  _Widget,
  Tooltip,
  TooltipDialog,
  EnrolmentTerminationPanel,
  EnrolmentReactivationPanel
) {
  const EnrolmentAction = declare("EnrolmentAction", _Widget, {
    status: "",
    handleTerminate: function(data) {},
    constructor: function(opts, domNode) {
      lang.mixin(this, opts);
      this.domNode = domNode;
    },
    buildRendering: function() {
      this.inherited(arguments);
      const isActive = this.status === "Active";
      const actionIcon = isActive ? "dijitIconDelete" : "dijitIconUndo";
      const actionNodeId = `enrolment-action-${this.id}`;
      const actionNode = domConstruct.create(
        "button",
        {
          id: actionNodeId,
          className: `dijitInline dijitIcon ${actionIcon}`
        },
        this.domNode
      );
      if (isActive) {
        on(actionNode, "click", lang.hitch(this, this.showTerminatePanel));
      } else {
        on(actionNode, "click", lang.hitch(this, this.showReactivePanel));
      }
      new Tooltip({
        connectId: actionNodeId,
        label: isActive ? "Terminate this enrolment" : "Reactive this enrolment"
      });
    },
    showTerminatePanel: function(event) {
      event.stopPropagation();
      const terminateTooltip = new TooltipDialog({
        content: new EnrolmentTerminationPanel({
          handleTerminate: this.handleTerminate,
          handleCancel: function() {
            popup.close(terminateTooltip);
          }
        }),
        style: "width: 500px;"
      });
      popup.open({
        popup: terminateTooltip,
        around: event.target
      });
    },
    showReactivePanel: function() {
      event.stopPropagation();
      const reactiveTooltip = new TooltipDialog({
        content: new EnrolmentReactivationPanel({
          handleReactive: this.handleReactive
        }),
        style: "width: 400px;",
        onMouseLeave: function() {
          popup.close(reactiveTooltip);
        }
      });
      popup.open({
        popup: reactiveTooltip,
        around: event.target
      });
    }
  });
  return EnrolmentAction;
});
