import { TextField, Card, Button, CardContent, InputLabel, Select, MenuItem, Fab, Alert  } from "@mui/material";
import './ReducedResponse.css';
import React, { useState } from 'react';
import { callGetReducedObject, callGetReducedXMLObject } from "../utils/utils";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { parseString } from "xml2js";
import ErrorIcon from '@mui/icons-material/Error';

const ReducedResponse = () => {
    const [output, setOutput] = useState('');
    const [dataType, setDataType] = useState('JSON');
    const [showError, setShowError] = useState(false);
    const handleChange = (event) => {
        setDataType(event.target.value);
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    }
    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        setShowError(false);
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        if (dataType === "XML") {
            parseString(Object.fromEntries(formData.entries()).input, {explicitArray : false}, function (err, result) {
                setOutput(callGetReducedXMLObject(result));
            });
        }
        else {
            const formJson = Object.fromEntries(formData.entries());
            try {
                const parsedJson = JSON.parse(formJson.input);
                const outputDisplayString = callGetReducedObject(parsedJson);
                setOutput(outputDisplayString);
            } catch (error) {
                setShowError(true);
            }
        }
    
        
      }
    return (
        <div>
            <div className="dataTypeContainerReducedResponse">
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
            <div className="containerReducedResponse">
                <form method="post" onSubmit={handleSubmit} className="inputReducedResponse">
                    <TextField
                        id="outlined-multiline-flexible"
                        name='input'
                        label="Input API response"
                        multiline
                        rows={28}
                        sx={{width: '100%'}}
                        helperText="Paste an API response into this text box and click submit to get a shortened version of this response. Only the first element in any array will be returned with an ellipses afterwards."
                    />
                    <Button variant="contained" type="submit" sx={{height: '48px', width: '100%'}}>Submit</Button>
                </form>
                {showError &&
                    <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error" sx={{width: '100%'}}>
                        The JSON submitted is not in the correct form.
                    </Alert>
                }
                {!showError && 
                    <Card className="codeReducedResponse" sx={{ height: '1000px', overflow: 'auto', display: 'flex', flexDirection: 'column'  }} px={'10px'}>
                        <Fab color="primary" aria-label="add" sx={{ alignSelf: 'end', position: 'absolute'}} onClick={copyToClipboard}  disabled={!output || showError}>
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

export default ReducedResponse;