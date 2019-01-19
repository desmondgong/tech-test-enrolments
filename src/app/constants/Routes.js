define([
  "dojo/_base/declare"
], (declare) => {

  const Routes = declare("Routes", null, {
    getEnrolmentOpts: "/api/enrolment/opts",
    getEnrolmentList: "/api/enrolment/list",
    addEnrolment: "/api/enrolment/add",
    updateEnrolment: "/api/enrolment/{id}",
    getSchoolLog: "/api/enrolment/log/school"
  });
  return Routes;
});
