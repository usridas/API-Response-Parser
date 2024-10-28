import { TextField, Card, Button, CardContent } from "@mui/material";
import './SingleJson.css';
import React, { useState } from 'react';
import { callParseNestedObject } from "../utils/utils";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Fab from '@mui/material/Fab';
import Alert from '@mui/material/Alert';
import ErrorIcon from '@mui/icons-material/Error';

const SingleJson = () => {
    const [output, setOutput] = useState('');
    const [showError, setShowError] = useState(false);
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
    
        const formJson = Object.fromEntries(formData.entries());
        try {
            const parsedJson = JSON.parse(formJson.input);
            const outputDisplayString = callParseNestedObject(parsedJson);
            setOutput(outputDisplayString);
        } catch (error) {
            setShowError(true);
        } 
      }
    return (
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
                <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error" sx={{marginTop: '24px', width: '100%', margin: '0'}}>
                    The JSON submitted is not in the correct form.
                </Alert>
            }
            {!showError && 
            <Card className="codeSingle" sx={{ height: '1000px', overflow: 'auto', display: 'flex', flexDirection: 'column' }} px={'10px'}>
                <Fab color="primary" aria-label="add" sx={{ alignSelf: 'end', margin: '12px', position: 'fixed'}} onClick={copyToClipboard}>
                    <ContentCopyIcon />
                </Fab>
                <CardContent sx={{ height: '100%'}}>
                    {!showError && output}
                </CardContent>  
            </Card>
            }
        </div>
    )
}

export default SingleJson;
