import { TextField, Card, Button, CardContent, InputLabel, Select, MenuItem } from "@mui/material";
import './CompareJson.css';
import React, { useState } from 'react';
import {  callParseNestedObject, callParseNestedXMLObject, findDifference } from "../utils/utils";
import { parseString } from "xml2js";
import Alert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const CompareJson = () => {
    const [output1, setOutput1] = useState('');
    const [output2, setOutput2] = useState('');
    const [diff1, setDiff1] = useState();
    const [diff2, setDiff2] = useState();

    const [open, setOpen] = useState(true);
    const [dataType, setDataType] = useState('JSON');

    const handleCollapse = () => {
        setOpen(!open);
    };

    const handleChange = (event) => {
        setDataType(event.target.value);
    };

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        let parsedJson1, parsedJson2 = '';
    

        if(dataType === 'XML') {
            parseString(Object.fromEntries(formData.entries()).input1, {explicitArray : false}, function (err1, result1) {
                setOutput1(callParseNestedXMLObject(result1));
                parseString(Object.fromEntries(formData.entries()).input2, {explicitArray : false}, function (err2, result2) {
                    setOutput2(callParseNestedXMLObject(result2));
                    setDiff1(findDifference("left", callParseNestedXMLObject(result1), callParseNestedXMLObject(result2)));
                    setDiff2(findDifference("right", callParseNestedXMLObject(result1), callParseNestedXMLObject(result2)));
                }); 
            });
        }
        else {
            parsedJson1 = JSON.parse(Object.fromEntries(formData.entries()).input1);
            parsedJson2 = JSON.parse(Object.fromEntries(formData.entries()).input2);
            setOutput1(callParseNestedObject(parsedJson1));
            setOutput2(callParseNestedObject(parsedJson2));
            setDiff1(findDifference("left", callParseNestedObject(parsedJson1), callParseNestedObject(parsedJson2)));
            setDiff2(findDifference("right", callParseNestedObject(parsedJson1), callParseNestedObject(parsedJson2)));
        }
    }
    return (
        <>
            <form method="post" onSubmit={handleSubmit} className="container">
                <div className="inputContainer">
                    <div className="expandButtonAndDataTypeContainer">
                        <Button onClick={handleCollapse} className='button'>
                            {open ? 'Collapse' : 'Expand'}
                        </Button>
                        <div>
                            <InputLabel id="demo-simple-select-label">Data Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={dataType}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={'JSON'}>JSON</MenuItem>
                                <MenuItem value={'XML'}>XML</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className="textFieldContainer">
                        <div className="fullApiInputContainer">
                            API Response #1
                            {open &&
                                <TextField
                                    id="outlined-multiline-flexible"
                                    name='input1'
                                    label="Input API response #1"
                                    multiline
                                    className="input"
                                    helperText="Paste your first API response into this text box."
                                />
                            }
                        </div>
                        <div className="fullApiInputContainer">
                            API Response #2
                            {open &&
                                <TextField
                                    id="outlined-multiline-flexible"
                                    name='input2'
                                    label="Input API response #2"
                                    multiline
                                    className="input"
                                    helperText="Paste your second API response into this text box."
                                />
                            }
                        </div>
                    </div>
                </div>
                <Button variant="contained" type="submit" sx={{height: '48px'}}>Submit</Button>
            </form>
            {output1 && output2 && output1 === output2 &&
                <div className="outputContainer">
                    <Alert icon={<CheckCircleIcon fontSize="inherit" />} severity="success" sx={{marginTop: '24px'}}>
                        These structures are the same.
                    </Alert>
                    <Card className="codeCard" label="API Response" name='outputSame'>
                        <CardContent className="cardContent">
                            {output1}
                        </CardContent>
                    </Card>
                </div>
            }
            {(output1 !== output2) &&
                <div className="outputContainer">
                    <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error" sx={{marginTop: '24px'}}>
                        These structures are not the same.
                    </Alert>
                    <div className="diffContainer">
                        <Card className="codeCard" label="API Response" name='outputDiff1'>
                            <CardContent className="cardContent">
                                {diff1}
                            </CardContent>
                        </Card>
                        <Card className="codeCard" label="API Response" name='outputDiff2'>
                            <CardContent className="cardContent">
                                {diff2}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            }
            
</>
    )
}

export default CompareJson;