define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/request",
  "dojo/Deferred",
  "../constants/Routes"
], (declare, lang, request, Deferred, Routes) => {
  const EnrolmentStore = declare("EnrolmentStore", null, {
    routes: new Routes(),
    enrolmentOpts: null,
    constructor: function(opt) {
      lang.mixin(this, opt);
    },
    fetchEnrolmentOpts: function() {
      if (!this.enrolmentOpts) {
        return request(this.routes.getEnrolmentOpts, { handleAs: "json" }).then(
          lang.hitch(this, function(opts) {
            this.enrolmentOpts = opts;
            return opts;
          })
        );
      }
      const dfd = new Deferred();
      dfd.resolve(this.enrolmentOpts);
      return dfd;
    },
    fetchEnrolmentList: function() {
      return request(this.routes.getEnrolmentList, { handleAs: "json" });
    },
    addEnrolment: function(data) {
      return request.post(this.routes.addEnrolment, {
        data: JSON.stringify(data),
        method: "POST",
        handleAs: "json"
      });
    },
    updateEnrolment: function(id, data) {
      return request.post(this.routes.updateEnrolment.replace("{id}", id), {
        data: JSON.stringify(data),
        method: "POST",
        handleAs: "json"
      });
    }
  });
  return EnrolmentStore;
});
