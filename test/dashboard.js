const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

const User = require("../models/User");

chai.use(chaiHttp);

const demoUserData = {
  name: "newUser",
  email: "new@new.com",
  password: "123456",
};

const demoUser = {
  email: "new@new.com",
  password: "123456",
};

/*
 * Test the GET /dashboard route
 */
describe("/GET dashboard", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/signup")
      .send(demoUserData)
      .end((err, res) => {
        done();
      });
  });

  beforeEach((done) => {
    chai
      .request(server)
      .post("/signin")
      .send(demoUser)
      .end((err, res) => {
        done();
      });
  });

  afterEach((done) => {
    // After each test we truncate the database
    User.deleteMany({}, (err) => {
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
