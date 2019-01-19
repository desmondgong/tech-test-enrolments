define([
  "dojo/ready",
  "./constants/Routes",
  "./widget/EnrolmentList"
], function(ready, Routes, EnrolmentList) {
  const routes = new Routes();

  ready(function() {
    const containerNode = document.getElementById("root");
    const enrolmentList = new EnrolmentList({}, containerNode);
  });
});
