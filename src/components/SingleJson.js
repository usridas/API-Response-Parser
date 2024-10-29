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
            <div className="dataTypeContainer">
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
                        maxRows={40}
                        helperText="Paste an API response into this text box and click submit to see the structure of the response."
                        sx={{width: '100%'}}
                    />
                    <Button variant="contained" type="submit" sx={{height: '48px'}}>Submit</Button>
                </form>
                {showError &&
                    <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error" sx={{width: '100%'}}>
                        The JSON submitted is not in the correct form.
                    </Alert>
                }
                {!showError && 
                    <Card className="codeSingle" sx={{ height: '1000px', overflow: 'auto', display: 'flex', flexDirection: 'column' }} px={'10px'}>
                        <Fab color="primary" aria-label="add" sx={{ alignSelf: 'end', margin: '12px', position: 'absolute', minHeight: '56px'}} onClick={copyToClipboard}>
                            <ContentCopyIcon />
                        </Fab>
                        <CardContent sx={{ height: '100%'}}>
                            {output}
                        </CardContent>  
                    </Card>
                }
            </div>
        </div>
    )
}

export default SingleJson;
