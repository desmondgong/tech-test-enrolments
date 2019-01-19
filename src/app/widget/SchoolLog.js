define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/dom-construct",
  "dijit/_Widget"
], function(declare, lang, array, domConstruct, _Widget) {
  const SchoolLog = declare("SchoolLog", _Widget, {
    enrolmentOpts: {},
    logData: [],
    constructor: function(opts, domNode) {
      lang.mixin(this, opts);
      this.domNode = domNode;
      this.containerNode = domConstruct.create(
        "div",
        { className: "school-log-container" },
        this.domNode
      );
    },
    buildRendering: function() {
      this.inherited(arguments);
      const title = domConstruct.create(
        "div",
        { className: "log-title", innerHTML: "School Enrolment Log" },
        this.containerNode
      );
      const logTable = domConstruct.create(
        "table",
        { className: "log-table" },
        this.containerNode
      );
      const titleTr = domConstruct.create("tr", {}, logTable);
      domConstruct.create("th", { innerHTML: "School" }, titleTr);
      domConstruct.create("th", { innerHTML: "Year Level" }, titleTr);
      domConstruct.create("th", { innerHTML: "Year" }, titleTr);
      array.forEach(
        this.logData,
        lang.hitch(this, function({ school, yearLevel, year }) {
          const dataTr = domConstruct.create(
            "tr",
            { className: "data" },
            logTable
          );
          array.forEach(this.enrolmentOpts.school, function({ id, name }) {
            if (id === school) {
              domConstruct.create("td", { innerHTML: name }, dataTr);
            }
          });
          array.forEach(this.enrolmentOpts.yearLevel, function({ id, name }) {
            if (id === yearLevel) {
              domConstruct.create("td", { innerHTML: name }, dataTr);
            }
          });
          array.forEach(this.enrolmentOpts.year, function({ id, name }) {
            if (id === year) {
              domConstruct.create("td", { innerHTML: name }, dataTr);
            }
          });
        })
      );
    }
  });
  return SchoolLog;
});
