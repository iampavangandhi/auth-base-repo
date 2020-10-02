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

const demoUserDataReset = {
  token: "Bearer xyz",
  email: "new@new.com",
  password1: "666666",
  password2: "666666",
};

/**
 * Test for reset route
 *
 * @name Test - reset test
 */
describe("GET /reset", () => {
  it("it should GET the reset page", (done) => {
    chai
      .request(server)
      .get("/reset")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.html;
        done();
      });
  });
});


/**
 * Test for reset route
 *
 * @name Test - reset test
 */
describe("PUT /reset", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/signup")
      .send(demoUserData)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.html;
        done();
      });
  });

  afterEach((done) => {
    // After each test we truncate the database
    User.deleteMany({}, (err) => {
      done();
    });
  });

  it("it shouldn't PUT without req.body ( token, email, password1 & password2)", (done) => {
    chai
      .request(server)
      .put("/reset")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("message");
        done();
      });
  });

  it("it should reset the password and redirect to /dashboard", (done) => {
    chai
      .request(server)
      .put("/reset")
      .send(demoUserDataReset)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.html;
        done();
      });
  });
});
