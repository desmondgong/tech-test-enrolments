define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/on",
  "dojo/dom-style",
  "dojo/dom-construct",
  "dijit/_Widget",
  "./AddEnrolmentForm"
], function(
  declare,
  lang,
  array,
  on,
  domStyle,
  domConstruct,
  _Widget,
  AddEnrolmentForm
) {
  var EnrolmentItem = declare("EnrolmentItem", _Widget, {
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
      const { programName, enrollDate, status } = this.enrolmentInfo;
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
          innerHTML: (new Date(enrollDate)).toISOString().substring(0, 10)
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
      on(itemBar, "click", lang.hitch(this, this.toggleEditPanel));
    },
    renderEditPanel: function() {
      this.editPanelContainer = domConstruct.create(
        "div",
        {
          className: "edit-panel",
          style: "display: none"
        },
        this.containerNode
      );
      const {
        id,
        programId,
        enrollDate,
        school,
        yearLevel,
        year
      } = this.enrolmentInfo;
      const addEnrolmentForm = new AddEnrolmentForm({
        store: this.store,
        isProgramDisabled: true,
        isEnrollDateDsiabled: true,
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
      const isShow = domStyle.get(this.editPanelContainer, "display") !== "none";
      domStyle.set(this.editPanelContainer, "display", isShow ? "none" : "");
    },
    onUpdate: function(data) {
      this.handleUpdateEnrolment(this.enrolmentInfo.id, data);
    }
  });
  return EnrolmentItem;
});
