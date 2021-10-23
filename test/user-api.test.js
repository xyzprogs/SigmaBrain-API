const { expectCt } = require("helmet")
const testApi = require("./apicall")
test('Verify verify user api', ()=>{
    //expect.assertion(1);
    return testApi.testVerifyApiCall()
        .then(data=>{
            // console.log(data)
            
        })
})


