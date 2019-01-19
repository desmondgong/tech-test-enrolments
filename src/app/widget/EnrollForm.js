define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/dom-style",
  "dijit/_Widget",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!/app/widget/templates/EnrollForm.html",
  "../store/EnrolmentOptsStore",
  "dijit/form/Form",
  "dijit/form/TextBox",
  "dijit/form/Select",
  "dijit/form/DateTextBox",
  "dojox/validate"
], function(
  declare,
  lang,
  array,
  domStyle,
  _Widget,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  template,
  EnrolmentOptsStore
) {
  var EnrollForm = declare(
    "EnrollForm",
    [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin],
    {
      routes: {},
      programOpts: [],
      isSchool: false,
      isYearMandatory: false,
      templateString: template,
      postCreate: function() {
        const store = new EnrolmentOptsStore({
          url: this.routes.getEnrolmentOpts,
          handleResponse: lang.hitch(this, this.handleLoadOpts)
        });
        store.fetch();
      },
      handleApply: function(data) {},
      handleLoadOpts: function(response) {
        const { program, school, yearLevel, year } = response;
        this.programOpts = program;
        const defaultOption = {
          label: "select a value",
          value: "",
          disabled: true
        };
        this.programName.addOption(defaultOption);
        array.forEach(program, ({ id, name }) => {
          this.programName.addOption({ label: name, value: id });
        });
        this.school.addOption(defaultOption);
        array.forEach(school, ({ id, name }) => {
          this.school.addOption({ label: name, value: id });
        });
        this.yearLevel.addOption(defaultOption);
        array.forEach(yearLevel, ({ id, name }) => {
          this.yearLevel.addOption({ label: name, value: id });
        });
        this.year.addOption(defaultOption);
        array.forEach(year, ({ id, name }) => {
          this.year.addOption({ label: name, value: id });
        });
      },
      onProgramChange: function(value) {
        array.forEach(this.programOpts, ({ id, isSchool, isYearMandatory }) => {
          if (id === value) {
            this.isSchool = isSchool;
            domStyle.set(this.schoolTr, "display", isSchool ? "" : "none");
            this.isYearMandatory = isYearMandatory;
            domStyle.set(
              this.yearLevelTr,
              "display",
              isYearMandatory ? "" : "none"
            );
            domStyle.set(this.yearTr, "display", isYearMandatory ? "" : "none");
          }
        });
      },
      onApply: function() {
        if (
          !this.programName.value ||
          !this.enrollDate.value ||
          (this.isSchool && !this.school.value) ||
          (this.isYearMandatory && (!this.year.value || !this.yearLevel.value))
        ) {
          //TODO handle validation failed!
          return;
        }
        const applyData = {
          programName: this.programName.value,
          enrollDate: this.enrollDate.value.getTime(),
          school: this.isSchool ? this.school.value : undefined,
          year: this.isYearMandatory ? this.year.value : undefined,
          yearLevel: this.isYearMandatory ? this.yearLevel.value : undefined
        };
        this.handleApply(applyData);
      }
    }
  );
  return EnrollForm;
});
