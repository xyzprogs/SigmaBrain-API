const testApi = require("./apicall")
const BODY = require('../../constant/body')
// test('Verify quiz create api', ()=>{
//     //expect.assertion(1);
//     return testApi.testCreateQuizApi()
//         .then(data=>{
//             console.log(data)
//             expect(data.status).toEqual(201)
//         })
// })


// test('test quiz create api', ()=>{
//     return testApi.testCreateQuizQuestionApi()
//         .then(data=>{
//             console.log(data)
//             expect(data.status).toEqual(201)
//         })
// })

// test('test quiz question choice reate api', ()=>{
//     return testApi.testCreateQuizQuestionChoiceApi()
//         .then(data=>{
//             console.log(data)
//             expect(data.status).toEqual(201)
//         })
// })


test('test image api', async ()=>{
    // await testApi.testCreateQuizWithThumbnailApi("chemistry", 1, "chemistry.jpeg")
    // await testApi.testCreateQuizWithThumbnailApi("computer science", 2, "cs.jpeg")
    // await testApi.testCreateQuizWithThumbnailApi("english", 3, "english.jpeg")
    // await testApi.testCreateQuizWithThumbnailApi("geography", 2, "geography.jpeg")
    // await testApi.testCreateQuizWithThumbnailApi("history", 2, "history.jpeg")
    // await testApi.testCreateQuizWithThumbnailApi("machine", 2, "machine.jpeg")
    // await testApi.testCreateQuizWithThumbnailApi("math", 2, "math.jpeg")
    // await testApi.testCreateQuizWithThumbnailApi("data structure", 2, "dataStructure.png")
    // await testApi.testCreateQuizWithThumbnailApi("network", 2, "network.jpeg")
    // await testApi.testCreateQuizWithThumbnailApi("philosophy", 2, "philosophy.jpeg")
    // await testApi.testCreateQuizWithThumbnailApi("physics", 2, "physics.jpeg")
    // await testApi.testCreateQuizWithThumbnailApi("security", 2, "security.jpeg")
    return testApi.testCreateQuizWithThumbnailApi("system", 1, "cs416.jpg")
        .then(data=>{
            console.log(data)
        })
})


// test('test multiple question choice api', ()=>{
//     const quizQuestionChoices = [
//         {
//         [BODY.QUESTIONID]: 1,
//         [BODY.QUIZID]: 1,
//         [BODY.ISRIGHTCHOICE]: 4,
//         [BODY.CHOICE]: "kai?"
//         },
//         {
//         [BODY.QUESTIONID]: 1,
//         [BODY.QUIZID]: 1,
//         [BODY.ISRIGHTCHOICE]: 4,
//         [BODY.CHOICE]: "chen?"
//         },
//         {
//         [BODY.QUESTIONID]: 1,
//         [BODY.QUIZID]: 1,
//         [BODY.ISRIGHTCHOICE]: 4,
//         [BODY.CHOICE]: "nian?"
//         },
//         {
//         [BODY.QUESTIONID]: 1,
//         [BODY.QUIZID]: 1,
//         [BODY.ISRIGHTCHOICE]: 4,
//         [BODY.CHOICE]: "yi?"
//         },
//     ]

//     return testApi.testCreateMultipleQuestionChoicesApi(quizQuestionChoices).then(
//         data=>{
//             console.log(data)
//         }
//     )
// })
