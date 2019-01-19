define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/on",
  "dojo/dom-style",
  "dojo/dom-construct",
  "dijit/_Widget",
  "../store/EnrolmentStore",
  "./AddEnrolmentForm",
  "./EnrolmentItem"
], function(
  declare,
  lang,
  array,
  on,
  domStyle,
  domConstruct,
  _Widget,
  EnrolmentStore,
  AddEnrolmentForm,
  EnrolmentItem
) {
  var EnrolmentList = declare("EnrolmentList", _Widget, {
    domNode: null,
    containerNode: null,
    store: new EnrolmentStore(),
    constructor: function(opts, domNode) {
      lang.mixin(this, opts);
      this.domNode = domNode;
      this.containerNode = domConstruct.create(
        "div",
        { className: "enrolment-list-container" },
        this.domNode
      );
    },
    postCreate: function() {
      this.inherited(arguments);
      this.fetchList();
    },
    fetchList: function() {
      this.store.fetchEnrolmentList().then(lang.hitch(this, this.renderList));
    },
    buildRendering: function() {
      this.inherited(arguments);
    },
    renderList: function(list) {
      this.destroyList();
      if (lang.isArray(list) && list.length > 0) {
        array.forEach(list, (enrolmentInfo, index) => {
          new EnrolmentItem(
            {
              id: `EnrolmentItem_${new Date().getTime()}`,
              store: this.store,
              enrolmentInfo,
              handleUpdateEnrolment: lang.hitch(
                this,
                this.handleUpdateEnrolment
              )
            },
            this.containerNode
          );
        });
      } else {
        domConstruct.create(
          "span",
          { innerHTML: "Patient has no Enrolments" },
          this.containerNode
        );
      }
      const actionNode = domConstruct.create(
        "div",
        {
          className: "text-right"
        },
        this.containerNode
      );
      const addBtn = domConstruct.create(
        "button",
        {
          className: "secondary-btn",
          innerHTML: "Add"
        },
        actionNode
      );
      on(addBtn, "click", lang.hitch(this, this.showAddEnrolmentForm));
    },
    showAddEnrolmentForm: function() {
      this.destroyList();
      const addEnrolmentForm = new AddEnrolmentForm({
        store: this.store,
        handleAdd: lang.hitch(this, this.handleAddEnrolment),
        handleCancel: lang.hitch(this, this.fetchList)
      });
      addEnrolmentForm.placeAt(this.containerNode);
    },
    handleAddEnrolment: function(data) {
      this.store.addEnrolment(data).then(lang.hitch(this, this.fetchList));
    },
    handleUpdateEnrolment: function(id, data) {
      this.store
        .updateEnrolment(id, data)
        .then(lang.hitch(this, this.fetchList));
    },
    destroyList: function() {
      domConstruct.empty(this.containerNode);
    }
  });
  return EnrolmentList;
});
