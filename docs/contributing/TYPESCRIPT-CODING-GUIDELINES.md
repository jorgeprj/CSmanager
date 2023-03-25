# TypeScript Coding Guidelines
TypeScript is a typed programming language that compiles to JavaScript. The language is popular among developers due to its ability to improve productivity and code quality. To ensure a consistent and easy-to-understand development experience, it's important to follow a set of coding conventions when writing TypeScript code.

The following conventions should be followed when writing TypeScript code:

## Variable and Function Names
- Use camelCase for variable, function, and function parameter names.
- Do not use hyphens or underscores in names.
- Use names that reflect the purpose of the variable or function.
- Avoid abbreviations or acronyms unless they are widely known and accepted.

```typescript
// Correct example
const firstName = "John";
function calculateSum(num1: number, num2: number): number{
    return num1 + num2;
}
```
## Constants
- Use ALL_CAPS for naming constants.
- Use underscores to separate words.
  
```typescript
// Correct example
const MAX_SIZE = 100;
```

## Data Types
Use descriptive names for custom data types.
Use PascalCase to name custom types.

```typescript
// Correct example
type User = {
    name: string;
    age: number;
};
```

## Classes
- Use PascalCase to name classes.
- Use camelCase to name class properties and methods.
- Include a space between the class name and the first character of a property or method.

```typescript
// Correct example
class Person {
    firstName: string;
    lastName: string;

    getFullName(): string{
        return `${this.firstName} ${this.lastName}`;
    }
}
```

## Imports
- Use double quotes only to delimit import strings.
- Group library imports first, then application imports, and then local file imports.

```typescript
// Correct example
import { Component } from "@angular/core";
import { UserService } from "./user.service";
import { AppComponent } from "./app.component";
```

## Indentation
- Use 4 spaces for each level of indentation.

```typescript
// Correct example
function calculateSum(num1: number, num2: number): number{
    if(num1 > num2)
        return num1 + num2;
    else
        return num2 - num1;
}
```

## Semicolons
- Always include a semicolon at the end of a statement.

```typescript
// Correct example
const message = "Hello World";
console.log(message);
```

## Whitespace
- Include a whitespace before and after binary operators.

```typescript
// Correct example
const sum = num1 + num2;
const message = `Hello, ${name}!`;
```


Following these coding conventions will help make your TypeScript code easier to read, understand, and maintain.

## License
By contributing to this project, you agree to license your work under the same license as this project. For more information, please see the [LICENSE.md](/LICENSE) file.