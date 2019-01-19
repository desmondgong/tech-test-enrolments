define(["dojo/_base/declare", "dojo/_base/lang", "dojo/request"], (
  declare,
  lang,
  request
) => {
  const EnrolmentOptsStore = declare("EnrolmentOptsStore", null, {
    url: null,
    constructor: function(opt) {
      lang.mixin(this, opt);
    },
    handleResponse: function(response) {},
    fetch: function() {
      request(this.url, { handleAs: "json" }).then(this.handleResponse);
    }
  });
  return EnrolmentOptsStore;
});
