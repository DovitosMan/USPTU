
// Сложение двух чисел
let a = 3;
let b = 5;
console.log(a+b)

// Вернуть наиболшее из 3х числел
let numbers =[3,1,8];
if (numbers[0]>numbers[1]) {
    if (numbers[0]>numbers[2]){
    console.log(numbers[0]);}
    else{
        console.log(numbers[2])
    }}
else {
    if (numbers[1]>numbers[2]){
    console.log(numbers[1])}
    else {
        console.log(numbers[2])
    }
}

// function getMaxLengthString(arrayOfStrings) {
//     // work
//     return '';
// }

// Вернуть самую длинную строку
let a1 = 'Я хочу пиццу';
let a2 = 'Как же я безумно хочу пиццу'
let a3 = 'SOJHB:IJFHBLKIJDHFBLIUJDFHBIJDF;OIDSHFBOIDFHBOIDFHBOIDHFBOIDHFOBDHFBOIDFHBOIDF'
let h1 =[a1.length,a2.length,a3.length];
if (h1[0]>h1[1]) {
    if (h1[0]>h1[2]){
    console.log(a1,'Это первая строка');}
    else{
        console.log(a2,'Это вторая строка')
    }}
else {
    if (h1[1]>h1[2]){
    console.log(a2,'Это вторая строка')}
    else {
        console.log(a3,'Это третья строка')
    }
}

// Является ли слова палиндромом?
let word = ["т","о","п","ы","т"]
if (word[0] == word[4], word[1]==word[3]){
    console.log ('Слово',word,'является полиномом')
}
else {
    console.log ('Слово',word,"не является полиномом")
}

// function isWordPalindrom(word) {
//     if (/* magic */) {
//         return true;
//     }

//     return false;
// }


// Сумма элементов массива
let m1a1 = [
    1,1,1,1,5,5,5,5,5,5,5,5,5,3,3,3,33,1,1,1,1,1,2,2,2,2,2,23,4,4,4,4,4,6,6,6,6,6,6,8,8,8,8,8,9
];
let lengths = 0;
console.log(m1a1.length)
for (let i = 0; i<m1a1.length;i++ ) {
    lengths += m1a1[i];
}
console.log(lengths)


// Отфильтровать массив чисел
let chislomassiv = [1,2,2,34,5,6,7,8,123,123,444,22222,12,2,3,4,5,6,7];
let filterchislomassiv = chislomassiv.filter (item => item>5)
console.log (filterchislomassiv)

// Отфильтровать массив объектов (младше 50 лет) [{ name: "Bob", age: 50}, { name: "Jane", age: 64}, { name: "Jack", age: 25}];
 let massiv = [{ name: "Bob", age: 50}, { name: "Jane", age: 64}, { name: "Jack", age: 25}];
 let filtermassiv = massiv.filter (item => item.age<50)
 console.log(filtermassiv)
// Склонировать объект { name: "Bob", age: 50, children: [ { name: "Marie", age: 16}, { name: "Jame", age: 12} ] }



const obj1 = { name: "Bob", age: 50, children: [ { name: "Marie", age: 16}, { name: "Jame", age: 12} ] };
let clone = {};
for (let key in obj1) {
    clone[key] = obj1[key];
}
obj1.name = 'Sam';

const clone2 = structuredClone(obj1);

console.log(clone.name, clone.age,clone.children);
console.log(clone2)