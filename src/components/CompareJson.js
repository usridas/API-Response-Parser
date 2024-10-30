import { TextField, Card, Button, CardContent, InputLabel, Select, MenuItem, Alert, Fab } from "@mui/material";
import './CompareJson.css';
import React, { useState } from 'react';
import {  callParseNestedObject, callParseNestedXMLObject, findDifference } from "../utils/utils";
import { parseString } from "xml2js";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CompareJson = () => {
    const [showError, setShowError] = useState('');
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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output1);
    }

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        setShowError(false);
    
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
            try {
                parsedJson1 = JSON.parse(Object.fromEntries(formData.entries()).input1);
                parsedJson2 = JSON.parse(Object.fromEntries(formData.entries()).input2);
                setOutput1(callParseNestedObject(parsedJson1));
                setOutput2(callParseNestedObject(parsedJson2));
                setDiff1(findDifference("left", callParseNestedObject(parsedJson1), callParseNestedObject(parsedJson2)));
                setDiff2(findDifference("right", callParseNestedObject(parsedJson1), callParseNestedObject(parsedJson2)));
            } catch (error) {
                setShowError(true);
            }
        }
    }
    return (
        <>
            <form method="post" onSubmit={handleSubmit} className="container">
                
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
                            {open &&
                                <TextField
                                    id="outlined-multiline-flexible"
                                    name='input1'
                                    label="Input API response #1"
                                    multiline
                                    rows={24}
                                    helperText="Paste your first API response into this text box."
                                    sx={{height: '100%', maxHeight: '600px'}}
                                />
                            }
                        </div>
                        <div className="fullApiInputContainer">
                            {open &&
                                <TextField
                                    id="outlined-multiline-flexible"
                                    name='input2'
                                    label="Input API response #2"
                                    multiline
                                    rows={24}
                                    helperText="Paste your second API response into this text box."
                                    sx={{height: '100%', maxHeight: '600px'}}
                                />
                            }
                        </div>
                    </div>
                <Button variant="contained" type="submit" sx={{height: '48px', width: '200px', margin: '0 auto'}}>Submit</Button>
            </form>
            {showError &&
                <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error" sx={{marginTop: '24px'}}>
                    The JSON submitted is not in the correct form.
                </Alert>
            }
            {!showError && output1 && output2 && output1 === output2 &&
                <div className="outputContainer">
                    <Alert icon={<CheckCircleIcon fontSize="inherit" />} severity="success" sx={{marginTop: '24px'}}>
                        These structures are the same.
                    </Alert>
                    <Card className="codeSingle" label="API Response" name='outputSame'sx={{ height: '1000px', display: 'flex', flexDirection: 'column', width: 'auto' }} px={'10px'}>
                        <Fab color="primary" aria-label="add" sx={{ alignSelf: 'end', margin: '12px', position: 'absolute', minHeight: '56px'}} onClick={copyToClipboard}>
                            <ContentCopyIcon />
                        </Fab>
                        <CardContent sx={{ height: '100%', overflow: 'auto'}}>
                            {output1}
                        </CardContent>  
                    </Card>
                </div>
            }
            {!showError && (output1 !== output2) &&
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