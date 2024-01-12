import React, { useState } from 'react';
import { EditableMathField, StaticMathField } from 'react-mathquill';
import KeyPad from './keypad';
import { Tabs, Tab, Typography, Box, Stack, Switch, Paper } from "@mui/material";
import { MathComponent } from "mathjax-react";
import MathInput from "./mathinput";
import { TabIcons } from './mathicons';
import PropTypes from 'prop-types';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const MathPad = () => {
    const [tabValue, setTabValue] = React.useState(0);
    const [checked, setChecked] = React.useState(true);
    const [latex, setLatex] = useState("\\frac{1}{\\sqrt{2}}\\cdot 2");

    const handleTabChange = (event, newTab) => {
        setTabValue(newTab);
    };
    const handleInlineBlockChange = (event) => {
        setChecked(event.target.checked);
    };



    const handleInput = (mathField) => {
        setLatex(mathField.latex());
    }

    return (
        <Box sx={{ width: "100%" }}>


            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="Math Symbol Tabs"
                    variant="scrollable"
                    scrollButtons="auto"
                    indicatorColor="red"
                >
                    {TabIcons.map((v, i) => (
                        <Tab
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                fontFamily: "Crambia Math",
                                fontStyle: "italic",
                                fontSize: "24px",
                                "&:hover": {
                                    backgroundColor: "#6d99ec",
                                    color: "#fff",
                                },
                                "&:focus": {
                                    color: "#fff",
                                    borderRadius: "3px",
                                    backgroundColor: "#6d99ec",
                                },
                            }}
                            label={v}
                            {...a11yProps(i)}
                        />
                    ))}
                </Tabs>
            </Box>


            <Box sx={{ textTransform: "none", marginTop: "5px" }}>
                <KeyPad latex={latex} setLatex={setLatex} tabValue={"Default"} />
            </Box>

            {TabIcons.map((v, i) =>
                <TabPanel sx={{ textTransform: 'none' }} value={tabValue} index={i}>
                    <KeyPad latex={latex} setLatex={setLatex} tabValue={v} />
                </TabPanel>
            )}


            <Box sx={{ marginTop: '15px' }}>
                <EditableMathField
                    latex={latex}
                    id="math-input"
                    onChange={handleInput}

                />
                <Paper
                    id="mathtex-input2"
                    component="div"
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        boxShadow: 5,
                        marginTop: "15px",
                        backgroundColor: "#fff",
                        overflow: "auto",
                        fontFamily: "OpenSymbol",
                        fontSize: "18px",
                        fontWeight: "400",
                        width: "100%",
                        height: 120,

                    }}
                >
                    <MathComponent tex={latex} display={true} />
                </Paper>
            </Box>
        </Box >
    );
};

export default MathPad;