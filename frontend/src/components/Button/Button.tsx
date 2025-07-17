import React from 'react';

interface buttonpropsInterface {
    type: string
    label: string,
    disableState?: boolean
    clickHandler?: () => void,
}   

const Button: React.FC<buttonpropsInterface> = ({label,disableState,clickHandler}) => {
  return (
    <button
       onClick={clickHandler}
       disabled={disableState}
       className="mt-8 w-full text-white font-semibold py-2 rounded cursor-pointer" style={{backgroundColor: "darkblue-600"}}
    >
       {disableState ? "submitting" : label}
    </button>
  )
}

export default Button;
