function repeatStringNumTimes(string,num) 
{
  let newString = "";
  if(num <= 0)
  return string = "";
  else
  {
    for(let i=0;i<num;i++)
    {
      newString+=string;
    }
    return newString;
  }
}
