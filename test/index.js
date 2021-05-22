const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const fs = require("fs");
const app = require("../app");

chai.use(chaiHttp);

describe("API ENDPOINT TESTING", () => {
  it("GET Landing Page", (done) => {
    chai
      .request(app)
      .get("/api/v1/user/landing-page")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("Object");
        expect(res.body).to.have.property("mostPicked");
        expect(res.body.mostPicked).to.have.an("array");
        expect(res.body).to.have.property("highRated");
        expect(res.body.mostPicked).to.have.an("array");
        done();
      });
  });

  it("GET Category Page", (done) => {
    chai
      .request(app)
      .get("/api/v1/user/category-page")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("Object");
        expect(res.body).to.have.property("Technology");
        expect(res.body.Technology).to.have.an("array");
        expect(res.body).to.have.property("Design");
        expect(res.body.Design).to.have.an("array");
        expect(res.body).to.have.property("Writing");
        expect(res.body.Writing).to.have.an("array");
        expect(res.body).to.have.property("Video");
        expect(res.body.Video).to.have.an("array");
        done();
      });
  });

  it("GET Detail Page", (done) => {
    chai
      .request(app)
      .get("/api/v1/user/freelancer/605b5889babfe71e8432d312")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("Object");
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("userId");
        expect(res.body.userId).to.have.an("Object");
        expect(res.body).to.have.property("rating");
        expect(res.body).to.have.property("title");
        expect(res.body).to.have.property("description");
        expect(res.body).to.have.property("imgUrl");
        expect(res.body).to.have.property("serviceId");
        expect(res.body.serviceId).to.have.an("array");
        done();
      });
  });

  it("POST Register User", (done) => {
    const dataSample = {
      name: "Febri Putra Yulianto",
      email: "febriputray@gmail.com",
      password: "febripy222",
      birthdate: "03-02-2000",
      address: "Jl Tinalan 1 Kediri",
      phone: "085435423142",
      categoryId: "605b580db4a8e60af44d4530",
    };

    chai
      .request(app)
      .post("/api/v1/user/register")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send(dataSample)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("Object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success Register");
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.all.keys("name", "email", "token");
        done();
      });
  });

  it("POST Login User", (done) => {
    const userdata = {
      email: "febriputray@gmail.com",
      password: "febripy222",
    };
    chai
      .request(app)
      .post("/api/v1/user/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send(userdata)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("Object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success Login");
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.all.keys("token");
        done();
      });
  });

  it("GET Logged Landing Page", (done) => {
    const userdata = {
      email: "febriputray@gmail.com",
      password: "febripy222",
    };
    var token;
    chai
      .request(app)
      .post("/api/v1/user/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send(userdata)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        token = res.body.data.token;
        chai
          .request(app)
          .get("/api/v1/user/landing-page/me")
          .set("x-access-token", token)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
      });
  });

  it("POST Order", (done) => {
    const userdata = {
      email: "febriputray@gmail.com",
      password: "febripy222",
    };
    var token;
    chai
      .request(app)
      .post("/api/v1/user/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send(userdata)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        token = res.body.data.token;
        const image = __dirname + "/buktibayar.jpeg";
        const order = {
          image,
          serviceId: "605c3f698f15569950d6e564",
          detailNote: "Tolong buatkan aplikasi dengan detail sebagai berikut",
          accountHolder: "Febri Putra Yulianto",
          bankFrom: "BRI",
        };
        chai
          .request(app)
          .post("/api/v1/user/service/order")
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set("x-access-token", token)
          .field("serviceId", order.serviceId)
          .field("detailNote", order.detailNote)
          .field("accountHolder", order.accountHolder)
          .field("bankFrom", order.bankFrom)
          .attach("image", fs.readFileSync(order.image), "buktibayar.jpeg")
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal("Success Booking");
            expect(res.body).to.have.property("order");
            expect(res.body.order).to.have.all.keys(
              "_id",
              "payments",
              "orderDate",
              "work",
              "freelancerId",
              "serviceUserId",
              "invoice",
              "serviceId",
              "total",
              "detailNote",
              "__v"
            );
            expect(res.body.order.payments).to.have.all.keys(
              "status",
              "proofPayment",
              "accountHolder",
              "bankFrom"
            );
            expect(res.body.order.serviceId).to.have.all.keys(
              "_id",
              "title",
              "price"
            );
            done();
          });
      });
  });

  it("GET All Chat", (done) => {
    const userdata = {
      email: "febriputray@gmail.com",
      password: "febripy222",
    };
    var token;
    chai
      .request(app)
      .post("/api/v1/user/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send(userdata)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        token = res.body.data.token;
        chai
          .request(app)
          .get("/api/v1/user/chats/get")
          .set("x-access-token", token)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
      });
  });

  it("GET Detail Chat", (done) => {
    const userdata = {
      email: "febriputray@gmail.com",
      password: "febripy222",
    };
    var token;
    chai
      .request(app)
      .post("/api/v1/user/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send(userdata)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        token = res.body.data.token;
        chai
          .request(app)
          .get("/api/v1/user/chats/get/605b5889babfe71e8432d315")
          .set("x-access-token", token)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
      });
  });

  it("POST Reply Chat", (done) => {
    const userdata = {
      email: "febriputray@gmail.com",
      password: "febripy222",
    };
    var token;
    chai
      .request(app)
      .post("/api/v1/user/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send(userdata)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        token = res.body.data.token;
        const data = {
          message: "febriputray@gmail.com",
        };
        chai
          .request(app)
          .post("/api/v1/user/chats/reply/605b5889babfe71e8432d315")
          .set("x-access-token", token)
          .send(data)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            done();
          });
      });
  });
});
