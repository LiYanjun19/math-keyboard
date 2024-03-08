import React from 'react';
import { Button, Tooltip } from "@mui/material";
import { MathComponent } from "mathjax-react";
import { StaticMathField } from "react-mathquill";

const Buttons = ({ index, button, latex, setLatex }) => {
    return (
        <Tooltip title={button.label} key={index}>
            <Button

                onClick={() => { setLatex(latex + button.latexCode) }}
            >
                  {button.useJax ? (
                    <MathComponent tex={button.latexCode ? button.latexCode : button.mathCode} />
                ) : (
                    <StaticMathField>
                        {button.latexCode ? button.latexCode : button.mathCode}
                    </StaticMathField>
                )}  

                
                

            </Button>
        </Tooltip>
    );
}

export default Buttons;
