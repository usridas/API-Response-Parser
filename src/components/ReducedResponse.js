import { TextField, Card, Button, CardContent } from "@mui/material";
import './SingleJson.css';
import React, { useState } from 'react';
import { callGetReducedObject } from "../utils/utils";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Fab from '@mui/material/Fab';

const ReducedResponse = () => {
    const [output, setOutput] = useState('');
    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    }
    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
    
        const formJson = Object.fromEntries(formData.entries());
        const parsedJson = JSON.parse(formJson.input);
        const outputDisplayString = callGetReducedObject(parsedJson);
        setOutput(outputDisplayString);
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
                    sx={{width: '100%'}}
                    helperText="Paste an API response into this text box and click submit to get a shortened version of this response. Only the first element in any array will be returned with an ellipses afterwards."
                />
                <Button variant="contained" type="submit" sx={{height: '48px'}}>Submit</Button>
            </form>
            <Card className="codeSingle" sx={{ height: '1000px', overflow: 'auto', display: 'flex', flexDirection: 'column'  }} px={'10px'}>
                <Fab color="primary" aria-label="add" sx={{ alignSelf: 'end', margin: '12px', position: 'fixed'}} onClick={copyToClipboard}>
                    <ContentCopyIcon />
                </Fab>
                <CardContent sx={{ height: '100%'}}>
                    {output}
                </CardContent>
            </Card>
        </div>
    )
}

export default ReducedResponse;