define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/dom-style",
  "dojo/dom-construct",
  "dijit/popup",
  "dijit/_Widget",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!/app/widget/templates/AddEnrolmentForm.html",
  "./SchoolLog",
  "dijit/TooltipDialog",
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
  domConstruct,
  popup,
  _Widget,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  template,
  SchoolLog,
  TooltipDialog
) {
  var AddEnrolmentForm = declare(
    "AddEnrolmentForm",
    [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin],
    {
      enrolmentOpts: {},
      isProgramDisabled: false,
      isEnrollDateDsiabled: false,
      templateString: template,
      isSchool: false,
      isYearMandatory: false,
      defaultValues: {},
      store: null,
      postCreate: function() {
        this.inherited(arguments);
        this.store
          .fetchEnrolmentOpts()
          .then(lang.hitch(this, this.handleLoadOpts));
      },
      handleAdd: function(data) {},
      handleCancel: function() {},
      handleLoadOpts: function(response) {
        const { program, school, yearLevel, year } = response;
        this.enrolmentOpts = response;
        const defaultOption = {
          label: "Please select",
          value: "",
          disabled: true
        };

        this.programNameDom.addOption(defaultOption);
        array.forEach(program, ({ id, name }) => {
          this.programNameDom.addOption({
            label: name,
            value: id
          });
        });

        this.schoolDom.addOption(defaultOption);
        array.forEach(school, ({ id, name }) => {
          this.schoolDom.addOption({
            label: name,
            value: id
          });
        });

        this.yearLevelDom.addOption(defaultOption);
        array.forEach(yearLevel, ({ id, name }) => {
          this.yearLevelDom.addOption({
            label: name,
            value: id
          });
        });

        this.yearDom.addOption(defaultOption);
        array.forEach(year, ({ id, name }) => {
          this.yearDom.addOption({
            label: name,
            value: id
          });
        });
        this.resetForm();
      },
      resetForm: function() {
        this.programNameDom.set("value", this.defaultValues.program || "");
        this.enrollDateDom.set(
          "value",
          this.defaultValues.enrollDate
            ? new Date(this.defaultValues.enrollDate)
            : new Date()
        );
        this.schoolDom.set("value", this.defaultValues.school || "");
        this.yearLevelDom.set("value", this.defaultValues.yearLevel || "");
        // TODO only yearDom need to be set as valid value.
        this.yearDom.set("value", this.defaultValues.year || 2016);
      },
      onProgramChange: function(value) {
        array.forEach(this.enrolmentOpts.program, ({ id, isSchool, isYearMandatory }) => {
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
      onAdd: function() {
        if (
          !this.programNameDom.value ||
          !this.enrollDateDom.value ||
          (this.isSchool && !this.schoolDom.value) ||
          (this.isYearMandatory &&
            (!this.yearDom.value || !this.yearLevelDom.value))
        ) {
          //TODO handle validation failed!
          console.log("Some required fields are empty");
          return;
        }
        const applyData = {
          program: this.programNameDom.value,
          enrollDate: this.enrollDateDom.value.getTime(),
          school: this.isSchool ? this.schoolDom.value : undefined,
          yearLevel: this.isYearMandatory ? this.yearLevelDom.value : undefined,
          year: this.isYearMandatory ? this.yearDom.value : undefined
        };
        this.handleAdd(applyData);
      },
      onCancel: function() {
        this.resetForm();
        this.handleCancel();
      },
      onShowSchoolLog: function(event) {
        this.store.fetchSchoolLog().then(log => {
          const tooltipContent = domConstruct.create("div", {});
          const schoolLog = new SchoolLog(
            {
              logData: log,
              enrolmentOpts: this.enrolmentOpts
            },
            tooltipContent
          );
          const schoolLogTooltip = new TooltipDialog({
            content: tooltipContent,
            style: "width: 500px;",
            onMouseLeave: function() {
              popup.close(schoolLogTooltip);
            }
          });
          popup.open({
            popup: schoolLogTooltip,
            around: event.target
          });
        });
      }
    }
  );
  return AddEnrolmentForm;
});
