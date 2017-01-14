# elapsy
Elapsy is a singleton class that calculates the elapsed time from the moment the first instance until the moment one of the possible functions is called.

Elapsed ir writen in ECMA 6.

## Install

```sh
npm install --save elapsy
```

## Usage

In order to use elapsy, you need to instantiate the class when you want to start counting the time. EG right after you start your application

```javascript
const Elapsy = require('elapsy');

// This will mark the current time for the next calls
const elapsy = new Elapsy();
```

When you want to check the execution time, you can use one of the following functions:

### time

Returns the number of the execution time in miliseconds

```javascript
const elapsy = new Elapsy();

const elapsed = elapsy.time();
console.log(elapsed);
```

### formated

Returns a formated string of the execution time in the format hh:mm:ss:ms.

If the elapsed time is more than a day, the number of days is show in the start of the string.

Examples:

00:13:08.324

03:00:59.999

1 day, 12:43:17.385

428 days, 04:58:23.032

```javascript
const elapsy = new Elapsy();

const formatedElapsed = elapsy.formated();
console.log(formatedElapsed);
```

### log

Insert the formated (hh:mm:ss.ms) string of the current elapsed time in the right end of the terminal.

You can pass a [chalk](https://www.npmjs.com/package/chalk) color to the method, and the default is blue;

Example:
![](https://i.imgur.com/e6uhlB1.png)

```javascript
const elapsy = new Elapsy();

elapsy.log();
```

