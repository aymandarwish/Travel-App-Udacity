import { handleSubmit } from '../src/client/js/formHandler';

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the handleSubmit() function", () => {
           // Define the input for the function, if any, in the form of variables/array
           // Define the expected output, if any, in the form of variables/array
           // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
           // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
           expect(handleSubmit).toBeDefined();
})});

// describe("Filter function", () => {
//     // test stuff
//     test("it should filter by a search term (link)", () => {
//         // actual test
//         const input = [
//             { id: 1, url: "https://www.url1.dev" },
//             { id: 2, url: "https://www.url2.dev" },
//             { id: 3, url: "https://www.link3.dev" }
//           ];
//           expect(filterByTerm(input, "link")).toEqual(output);
//       });
// });