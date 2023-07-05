function generatePassword() {
  const symbols = '!@#$%&*';
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  const uppercase =
    uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
  const lowercase =
    lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
  let numberString = '';
  for (let i = 0; i < 5; i++) {
    numberString += numbers[Math.floor(Math.random() * numbers.length)];
  }
  const remainingLength =
    8 -
    (symbol.length + uppercase.length + lowercase.length + numberString.length);
  let extraChars = '';
  for (let i = 0; i < remainingLength; i++) {
    extraChars +=
      uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)] +
      lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)] +
      numbers[Math.floor(Math.random() * numbers.length)];
  }

  const passwordArray = (
    symbol +
    uppercase +
    lowercase +
    numberString +
    extraChars
  ).split('');
  const shuffledPasswordArray = passwordArray.sort(() => 0.5 - Math.random());
  const password = shuffledPasswordArray.join('');

  return password;
}

export default generatePassword;
