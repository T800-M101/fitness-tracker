export interface User {
    email: string;
    userId: string;
}

// interface is a virtual structure that only exists within the context of TypeScript. 
// The TypeScript compiler uses interfaces solely for type-checking purposes. 
// Once your code is transpiled to its target language, 
// it will be stripped from its interfaces - JavaScript isn’t typed.