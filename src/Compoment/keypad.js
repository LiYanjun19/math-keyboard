import React from 'react';
import { MathComponent } from "mathjax-react";
import { StaticMathField } from "react-mathquill";
import Buttons from "./buttons";
import { Box, Paper, Grid, Button, Tooltip } from "@mui/material";
import { MathIcons, TabIcons } from './mathicons'

const KeyPad = ({ latex, setLatex, tabValue }) => {
    return (
        <Box sx={{ spacing: "1", boxShadow: 5, padding: "5px", borderRadius: 2 }}>
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {
                    MathIcons.map((icon) => (
                        icon.tab === tabValue &&
                        icon.keys.map((button, index) => (
                            <Buttons key={index} button={button} latex={latex} setLatex={setLatex} />
                        ))
                    ))
                }
            </Grid>
        </Box>

    );
}

export default KeyPad;
