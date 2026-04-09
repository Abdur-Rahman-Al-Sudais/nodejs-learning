// src/index.ts

const   name   =    'john'
const age = 25
const city = 'New York'

function greet(user: any) {
  console.log('Hello ' + user.name)
  console.log('Age: ' + user.age)
}

async function fetchData() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
    const data = await res.json()
    return data
  } catch (e) {
    console.log(e)
  }
}

const multiply = (a: number,b: number) => {
  return a*b
}

const   unusedVar = 42

const user = {name: name, age: age, city: city}

greet(user)
fetchData()
fetchData()
fetchData()
multiply(2,   3)
multiply(2,   3)