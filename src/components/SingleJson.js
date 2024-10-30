import { TextField, Card, Button, CardContent, InputLabel, Select, MenuItem, Fab, Alert } from "@mui/material";
import './SingleJson.css';
import React, { useState } from 'react';
import { callParseNestedObject, callParseNestedXMLObject } from "../utils/utils";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorIcon from '@mui/icons-material/Error';
import { parseString } from "xml2js";

const SingleJson = () => {
    const [output, setOutput] = useState('');
    const [showError, setShowError] = useState(false);
    const [dataType, setDataType] = useState('JSON');
    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    }
    const handleChange = (event) => {
        setDataType(event.target.value);
    };
    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        setShowError(false);
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        if(dataType === 'XML') {
            parseString(Object.fromEntries(formData.entries()).input, {explicitArray : false}, function (err, result) {
                setOutput(callParseNestedXMLObject(result));
            });
        }
        else {
            const formJson = Object.fromEntries(formData.entries());
            try {
                const parsedJson = JSON.parse(formJson.input);
                const outputDisplayString = callParseNestedObject(parsedJson);
                setOutput(outputDisplayString);
            } catch (error) {
                setShowError(true);
            } 
        }
      }

    return (
        <div>
            <div className="dataTypeContainerSingle">
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
            <div className="containerSingle">
                <form method="post" onSubmit={handleSubmit} className="inputSingle">
                    <TextField
                        id="outlined-multiline-flexible"
                        name='input'
                        label="Input API response"
                        multiline
                        rows={28}
                        helperText="Paste an API response into this text box and click submit to see the structure of the response."
                        sx={{width: '100%'}}
                    />
                    <Button variant="contained" type="submit" sx={{height: '48px', width: '100%'}}>Submit</Button>
                </form>
                {showError &&
                    <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error" sx={{width: '100%'}}>
                        The JSON submitted is not in the correct form.
                    </Alert>
                }
                {!showError && 
                    <Card className="codeSingle" >
                        <Fab color="primary" aria-label="add" sx={{ alignSelf: 'end', position: 'absolute'}} onClick={copyToClipboard}  disabled={!output || showError}>
                            <ContentCopyIcon />
                        </Fab>
                        <CardContent sx={{ height: '100%', overflow: 'auto'}}>
                            {output}
                        </CardContent>  
                    </Card>
                }
            </div>
        </div>
    )
}

export default SingleJson;
