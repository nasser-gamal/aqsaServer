function generatePassword() {
  const numbers = '0123456789';
  let numberString = '';
  for (let i = 0; i < 6; i++) {
    numberString += numbers[Math.floor(Math.random() * numbers.length)];
  }
  return numberString;
}

module.exports = generatePassword;
