let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

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
 * Test the /signup POST route
 */
describe("/POST signup", () => {
  afterEach((done) => {
    // After each test we truncate the database
    User.deleteMany({}, (err) => {
      done();
    });
  });

  it("it should save the user in the DB", (done) => {
    chai
      .request(server)
      .post("/signup")
      .send(demoUserData)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

/*
 * Test the /signin POST route
 */
describe("/POST signin", () => {
  it("it should login the user and redirect to /dashboard", (done) => {
    chai
      .request(server)
      .post("/sign")
      .send(demoUser)
      .end((err, res) => {
        done();
      });
  });
});

/*
 * Test the /GET signout
 */
describe("/GET signout", () => {
  it("it should signout the user and redirect to /", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.html;
        done();
      });
  });
});
