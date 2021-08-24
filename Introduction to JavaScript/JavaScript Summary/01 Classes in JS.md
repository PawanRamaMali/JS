
## Classes 

```js

class Human{
    constructor(){
        this.gender = 'male';
    }

    printGender(){
        console.log(this.gender);
    }
}

class Person extends Human {
    constructor(){
        super();
        this.name = 'Pawan';
    }

    printMyName() {
        console.log(this.name);
    }

}

const person = new Person();
person.printMyName();
person.printGender();

```

## ES6 Format

```js

class Human{
    constructor(){
        this.gender = 'male';
    }

    printGender = () => {
        console.log(this.gender);
    }
}

class Person extends Human {
    constructor(){
        super();
        this.name = 'Pawan';
    }

    printMyName = () => {
        console.log(this.name);
    }

}

const person = new Person();
person.printMyName();
person.printGender();
```