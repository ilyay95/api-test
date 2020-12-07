const request = require("supertest");
 
var app = require("./app").app;
 
it("should return Hello Test", function(done){
     
    request(app)
        .post("/create/tom")
        .expect(function(response){
            assert.deepEqual(response.body, {name:"Tom", age:35});
        })
        .end(done);
});
it('should return Hello Test', function (done) {
    request(app).get('/').expect(users).end(done)
  })