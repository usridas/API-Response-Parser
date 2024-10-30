import { Button, ButtonGroup } from '@mui/material';
import './NavBar.css';

export const NavBar = ({setTab, tab}) => {
    const singleApiResponseOnClick = () => {
        setTab('singleApiResponse');
    }
    
    const compareApiResponsesOnClick = () => {
        setTab('compareApiResponses');
    }

    const getReducedResponseOnClick = () => {
        setTab('getReducedResponse');
    }

    const findPathOfKeyOnClick = () => {
        setTab('findPathOfKey');
    }

    return (
    <div className='navBarContainer'>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={singleApiResponseOnClick} variant={tab === 'singleApiResponse' ? 'contained': 'outlined'}>Analyze single API response</Button>
            <Button onClick={getReducedResponseOnClick} variant={tab === 'getReducedResponse' ? 'contained': 'outlined'}>Get reduced response</Button>
            <Button onClick={compareApiResponsesOnClick} variant={tab === 'compareApiResponses' ? 'contained': 'outlined'}>Compare two API responses</Button>
            <Button onClick={findPathOfKeyOnClick} variant={tab === 'findPathOfKey' ? 'contained': 'outlined'}>Find path of key</Button>
        </ButtonGroup>
    </div>
    )
}