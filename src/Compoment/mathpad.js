import React, { useState, useEffect } from 'react';
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill';
import KeyPad from './keypad';
import { Tabs, Tab, Typography, Box, Stack, Switch, Paper, Button, Grid } from "@mui/material";
import { MathComponent } from "mathjax-react";
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


    const handleInput = (mathField) => {
        setLatex(mathField.latex());
    }

    const handleInlineChange = (event) => {
        setChecked(event.target.checked);
        console.log(checked);
    }

    const handleSubmit = () => {
        if (window.ReactNativeWebView) {
            if (latex != null) {
                if (checked) {
                    window.ReactNativeWebView.postMessage('$' + latex + '$');
                } else {
                    window.ReactNativeWebView.postMessage('$$' + latex + '$$');
                }


            }

        } else {
            console.log("Running in a non-React Native environment");
        }

    }

addStyles()

    return (
        <Grid sx={{ width: "100%"}} >


            <Grid sx={{ bgcolor: '#FAFAFA'}}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="Math Symbol Tabs"
                    variant="scrollable"
                    scrollButtons="auto"
                    width= "30"
                    
                    
                   
                       
                                      
                >
                    {TabIcons.map((v, i) => (
                        <Tab
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                fontFamily: "Crambia Math",                             
                                fontSize: "20px",
                                                               
                                
                                "&:hover": {
                                    backgroundColor: "#6d99ec",
                                    color: "#fff",
                                    borderRadius: "10px",
                                },
                                "&:focus": {
                                    color: "#fff",
                                    borderRadius: "10px",
                                    backgroundColor: "#6d99ec",
                                },

                            }}
                            label={v}
                            {...a11yProps(i)}
                        />
                    ))}


                 
                </Tabs>

                
                {TabIcons.map((v, i) =>
                <TabPanel sx={{ textTransform: 'none' }} value={tabValue} index={i}>
                    <KeyPad latex={latex} setLatex={setLatex} tabValue={v} />

                </TabPanel>
            )} 




                
            </Grid>
            

            

            
        
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Block</Typography>
                <Switch
                    checked={checked}
                    onChange={handleInlineChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <Typography>Inline</Typography>
            </Stack>



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

            <Button autoFocus onClick={handleSubmit}>
                Submit
            </Button>

        </Grid >





    );
};

export default MathPad;