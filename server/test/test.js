import { describe } from "mocha";
import { encodeToken, decodeToken } from "../accounts/authentication.js";
import chai from "chai";
import { login } from "../accounts/views.js";
import { getFeed } from "../feed/views.js";
import { getPostComments } from "../feed/views.js";

chai.should();

class Response {
  json(data) {
    return data;
  }

  send(data) {
    return data;
  }
}

describe("Authentication", function () {
  it("encodes and decodes token", function () {
    const data = {
      userId: 1233,
    };
    const encoded = encodeToken(data);
    encoded.should.be.a("string");
    const { userId } = decodeToken(encoded);
    userId.should.equal(data.userId);
  });

  it("login with email and password", function () {
    this.timeout(5000);
    const response = login(
      {
        body: { email: "first@gmail.com", password: "password" },
      },
      new Response()
    );
    response.then((data) => {
      data.name.should.equal("first");
    });
    return response;
  });
});

describe("Feed", function () {
  it("gets feed", function () {
    this.timeout(10000);
    const response = getFeed({ query: {} }, new Response());
    response.then((data) => {
      data.length.should.be.at.least(1);
    });
    return response;
  });
});

describe("Comment", function () {
  it("gets comments", function () {
    this.timeout(10000);
    const response = getPostComments({ query: { postId: 1 } }, new Response());
    response.then((data) => {
      data.length.should.be.at.least(1);
    });
    return response;
  });
});
