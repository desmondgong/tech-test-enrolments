define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/on",
  "dojo/dom-class",
  "dojo/dom-construct",
  "dijit/_Widget",
  "./AddEnrolmentForm",
  "./EnrolmentAction"
], function(
  declare,
  lang,
  array,
  on,
  domClass,
  domConstruct,
  _Widget,
  AddEnrolmentForm,
  EnrolmentAction
) {
  const EnrolmentItem = declare("EnrolmentItem", _Widget, {
    domNode: null,
    store: null,
    containerNode: null,
    enrolmentInfo: {},
    handleUpdateEnrolment: function() {},
    constructor: function(opts, domNode) {
      lang.mixin(this, opts);
      this.domNode = domNode;
      this.containerNode = domConstruct.create(
        "div",
        { className: "enrolment-item" },
        this.domNode
      );
    },
    buildRendering: function() {
      this.inherited(arguments);
      this.renderItemBar();
      this.renderEditPanel();
    },
    renderItemBar: function() {
      const {
        id,
        programName,
        enrollDate,
        terminateDate,
        status
      } = this.enrolmentInfo;
      const itemBar = domConstruct.create(
        "div",
        { className: "item" },
        this.containerNode
      );
      domConstruct.create(
        "span",
        {
          className: "name",
          innerHTML: programName
        },
        itemBar
      );
      domConstruct.create(
        "span",
        {
          className: "date",
          innerHTML: new Date(status === "Active" ? enrollDate : terminateDate)
            .toISOString()
            .substring(0, 10)
        },
        itemBar
      );
      domConstruct.create(
        "span",
        {
          className: "status",
          innerHTML: status
        },
        itemBar
      );
      new EnrolmentAction(
        {
          status,
          handleTerminate: lang.hitch(this, this.onUpdate),
          handleReactive: lang.hitch(this, this.onUpdate)
        },
        itemBar
      );
      on(itemBar, "click", lang.hitch(this, this.toggleEditPanel));
    },
    renderEditPanel: function() {
      this.editPanelContainer = domConstruct.create(
        "div",
        {
          className: "edit-panel hidden"
        },
        this.containerNode
      );
      const {
        id,
        programId,
        enrollDate,
        school,
        yearLevel,
        year,
        status
      } = this.enrolmentInfo;
      const addEnrolmentForm = new AddEnrolmentForm({
        store: this.store,
        mode: status === "Active" ? "edit" : "view",
        defaultValues: {
          program: programId,
          enrollDate,
          school,
          yearLevel,
          year
        },
        handleAdd: lang.hitch(this, this.onUpdate),
        handleCancel: lang.hitch(this, this.toggleEditPanel)
      });
      this.editPanelContainer.appendChild(addEnrolmentForm.domNode);
    },
    toggleEditPanel: function() {
      domClass.toggle(this.editPanelContainer, "hidden");
    },
    onUpdate: function(data) {
      this.handleUpdateEnrolment(this.enrolmentInfo.id, data);
    }
  });
  return EnrolmentItem;
});
