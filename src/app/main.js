define(["dojo/ready", "./widget/EnrolmentList"], (ready, EnrolmentList) => {
  ready(function() {
    const containerNode = document.getElementById("root");
    const enrolmentList = new EnrolmentList({}, containerNode);
  });
});
