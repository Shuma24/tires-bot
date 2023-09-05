"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomNameGenerator = void 0;
const RandomNameGenerator = (options) => {
    const alphabet = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '1234567890',
        specialCharacters: '~!@#$%^&*()-_=+[]{};:<>,.?',
    };
    let itemsFromGenerate = '';
    let randomCode = '';
    if (!options.withLowerCase &&
        !options.withNumbers &&
        !options.withCharacters &&
        !options.withUpperCase) {
        options.withCharacters = true;
        options.withLowerCase = true;
        options.withNumbers = true;
        options.withUpperCase = true;
    }
    if (!options.length) {
        throw new Error('Set length');
    }
    if (options.length >= 2048) {
        throw new Error('Max length of generated code is 2048 characters');
    }
    if (options.withUpperCase) {
        options.avoidAmbiguous
            ? (itemsFromGenerate += alphabet.uppercase.replace('I', '').replace('O', ''))
            : (itemsFromGenerate += alphabet.uppercase);
    }
    if (options.withLowerCase) {
        options.avoidAmbiguous
            ? (itemsFromGenerate += alphabet.lowercase.replace('l', ''))
            : (itemsFromGenerate += alphabet.lowercase);
    }
    if (options.withNumbers) {
        options.avoidAmbiguous
            ? (itemsFromGenerate += alphabet.numbers.replace('1', '').replace('0', ''))
            : (itemsFromGenerate += alphabet.numbers);
    }
    if (options.withCharacters) {
        itemsFromGenerate += alphabet.specialCharacters;
    }
    for (let i = 0; i < options.length; i++) {
        randomCode += itemsFromGenerate.charAt(Math.floor(Math.random() * itemsFromGenerate.length));
    }
    return randomCode;
};
exports.RandomNameGenerator = RandomNameGenerator;
