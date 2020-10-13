let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const User = require("../models/User");

chai.use(chaiHttp);

const demoUserDataWrong = {
  name: "1234",
  email: "new@new.com",
  password: "12345",
};

const demoUserData = {
  name: "newUser",
  email: "new@new.com",
  password: "123456",
};

const demoUserDataCopy = {
  name: "newUserCopy",
  email: "new@copy.com",
  password: "123456",
};

const demoUserWrongFields = {
  email: "newUser",
  password: "1234567",
};

const demoUserWrongPassword = {
  email: "new@new.com",
  password: "1234567",
};

const demoUserWrongEmail = {
  email: "new@new1.com",
  password: "123456",
};

const demoUser = {
  email: "new@new.com",
  password: "123456",
};

/**
 * Test for signup route
 *
 * @name Test - signup test
 */
describe("POST /signup", () => {
  afterEach((done) => {
    // After each test we truncate the database
    User.deleteMany({}, (err) => {
      done();
    });
  });

  it("it shouldn't POST without req.body (name, email & password)", (done) => {
    chai
      .request(server)
      .post("/signup")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("message");
        done();
      });
  });

  it("it shouldn't POST if required fields are wrong", (done) => {
    chai
      .request(server)
      .post("/signup")
      .send(demoUserDataWrong)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("message");
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
        res.should.to.be.html;
        done();
      });
  });
});

/**
 * Test for signup route
 *
 * @name Test - signup test
 */
describe("POST /signup", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/signup")
      .send(demoUserDataCopy)
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

  it("it shouldn't save the user again", (done) => {
    chai
      .request(server)
      .post("/signup")
      .send(demoUserDataCopy)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

/**
 * Test for signin route
 *
 * @name Test - signin test
 */
describe("POST /signin", () => {
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

  it("it shouldn't POST without req.body ( email & password)", (done) => {
    chai
      .request(server)
      .post("/signin")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("message");
        done();
      });
  });

  it("it shouldn't POST if required fields are wrong", (done) => {
    chai
      .request(server)
      .post("/signin")
      .send(demoUserWrongFields)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("message");
        done();
      });
  });

  it("it shouldn't POST if password is wrong", (done) => {
    chai
      .request(server)
      .post("/signin")
      .send(demoUserWrongPassword)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("message");
        done();
      });
  });

  it("it shouldn't POST if email is wrong", (done) => {
    chai
      .request(server)
      .post("/signin")
      .send(demoUserWrongEmail)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property("message");
        done();
      });
  });

  it("it should login the user and redirect to /dashboard", (done) => {
    chai
      .request(server)
      .post("/signin")
      .send(demoUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.html;
        done();
      });
  });
});

/**
 * Test for signout route
 *
 * @name Test - signout test
 */
describe("GET /signout", () => {
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
