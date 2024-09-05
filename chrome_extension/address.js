
const generateRandomNumber = (length) => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};  

const randomNumber = generateRandomNumber(13);

const newUrl = `:8443/szzh/zhcx/sbxx/sbxxcx?ruuid=${randomNumber}`;
  
history.replaceState(null, '', newUrl);
  