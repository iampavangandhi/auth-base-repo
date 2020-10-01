let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

let defaultUser = {
  email: "new@new.com",
  password: "123456",
};

/*
 * Test the /GET route
 */
describe("/GET dashboard", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/signin")
      .send(defaultUser)
      .end((err, res) => {
        done();
      });
  });

  it("it should GET the dashboard page", (done) => {
    chai
      .request(server)
      .get("/dashboard")
      .end((err, res) => {
        done();
      });
  });
});
