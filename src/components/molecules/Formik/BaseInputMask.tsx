import React, { forwardRef } from "react";
import MaskedInput from "react-text-mask";

const BaseInputMask = forwardRef((props, ref) => {
  return (
    <MaskedInput
      {...props}
      

      ref={ref} // تمرير ref مباشرة
      mask={[
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        
        
      ]}
    //   placeholderChar={"\u2000"}
    //   showMask
    />
  );
});

export default BaseInputMask;
