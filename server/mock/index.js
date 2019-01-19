import bodyParser from "body-parser";
import MOCK_DATA_ENROLMENT_OPTS from "./data/enrolmentOpts.json";
import MOCK_DATA_ENROLMENT_LIST from "./data/enrolmentList.json";
import MOCK_DATA_ENROLMENT_EDIT_ADD from "./data/addEditEnrolment.json";
import MOCK_DATA_SCHOOL_LOG from "./data/schoolLog.json";

const DEFER_TIME = 500;

module.exports = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/api/enrolment/opts", (req, res) => {
    setTimeout(() => {
      res.json(MOCK_DATA_ENROLMENT_OPTS);
    }, DEFER_TIME);
  });

  app.get("/api/enrolment/list", (req, res) => {
    setTimeout(() => {
      res.json(MOCK_DATA_ENROLMENT_LIST);
    }, DEFER_TIME);
  });

  app.post("/api/enrolment/add", (req, res) => {
    setTimeout(() => {
      res.json(MOCK_DATA_ENROLMENT_EDIT_ADD);
    }, DEFER_TIME);
  });

  app.post("/api/enrolment/:id", (req, res) => {
    setTimeout(() => {
      res.json(MOCK_DATA_ENROLMENT_EDIT_ADD);
    }, DEFER_TIME);
  });

  app.get("/api/enrolment/log/school", (req, res) => {
    setTimeout(() => {
      res.json(MOCK_DATA_SCHOOL_LOG);
    }, DEFER_TIME);
  });
};
