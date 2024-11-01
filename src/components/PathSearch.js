import { TextField, Card, Button, InputLabel, Select, MenuItem, Alert, Fab, Autocomplete } from "@mui/material";
import './PathSearch.css';
import React, { useState } from 'react';
import { callParseNestedObject, callParseNestedXMLObject, getJsonPath, callFindUniqueKeys } from "../utils/utils";
import ErrorIcon from '@mui/icons-material/Error';
import { parseString } from "xml2js";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const PathSearch = () => {
    const [output, setOutput] = useState('');
    const [key, setKey] = useState('');
    const [parsedJsonForKeySearch, setParsedJsonForKeySearch] = useState('');
    const [keyPath, setKeyPath] = useState('');
    const [showError, setShowError] = useState(false);
    const [dataType, setDataType] = useState('JSON');
    const handleChange = (event) => {
        setDataType(event.target.value);
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(keyPath);
    }
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
                setParsedJsonForKeySearch(JSON.parse(formJson.input));
                const outputDisplayString = callParseNestedObject(parsedJson);
                setOutput(outputDisplayString);
            } catch (error) {
                setShowError(true);
            } 
        }
      }

      function handleSubmitKeySearch(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        setKeyPath(getJsonPath(parsedJsonForKeySearch, key));
      }
    return (
        <div>
            {/* <div className="dataTypeContainerPathSearch">
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
            </div>  */}
            <div className="containerPathSearch">
                <form method="post" onSubmit={handleSubmit} className="inputPathSearch">
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
                    <div className="resultContainerPathSearch">
                        <form onSubmit={handleSubmitKeySearch} className="keySearchContainerPathSearch">
                            <Autocomplete
                                disablePortal
                                options={callFindUniqueKeys(parsedJsonForKeySearch)}
                                helperText="Enter a key to find the path."
                                sx={{ width: '100%', marginBottom: '12px' }}
                                onChange={(event, value) => {if (value) {setKey(value.label)}}}
                                renderInput={(params) => <TextField {...params} label="Key" />}
                                disabled={!output || showError}
                            />
                            <Button variant="contained" type="submit" sx={{height: '56px', width: '100%'}} disabled={!output || showError}>Submit</Button>
                        </form>
                        <Card className="pathContainerPathSearch" >
                            <Fab color="primary" aria-label="add" sx={{ alignSelf: 'end',  position: 'absolute'}} onClick={copyToClipboard}  disabled={!output || showError}>
                                <ContentCopyIcon />
                            </Fab>
                            {keyPath}
                        </Card>
                    </div>
                }
            </div>
        </div>
    )
}

export default PathSearch;
