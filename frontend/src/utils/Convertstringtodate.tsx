export const convertStringDate = (validuntildateAsString: string) => {
  const validuntildate = new Date(validuntildateAsString);

  validuntildate.setHours(validuntildate.getHours() + 5);

  validuntildate.setMinutes(validuntildate.getMinutes() + 30);


//   console.log(validuntildate.getDate() , validuntildate.getMonth()+1 , validuntildate.getFullYear())
  let validUntilDateFormatted: string = "";

  if (validuntildate.getDate() < 10) {
    validUntilDateFormatted += `0${validuntildate.getDate()}-`;
  } else {
    validUntilDateFormatted += `${validuntildate.getDate()}-`;
  }

  if(validuntildate.getMonth() < 10) {
    validUntilDateFormatted += `0${validuntildate.getMonth()+1}-`;
  }
  else {
    validUntilDateFormatted += `0${validuntildate.getMonth()+1}-`;
  }

  validUntilDateFormatted += `${validuntildate.getFullYear()}`;
  return validUntilDateFormatted;
};
