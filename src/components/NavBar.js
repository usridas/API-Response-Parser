import { Button } from '@mui/material';
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

    return (
    <div className='navBarContainer'>
        <Button onClick={singleApiResponseOnClick} variant={tab === 'singleApiResponse' ? 'contained': 'outlined'}>Analyze single API response</Button>
        <Button onClick={getReducedResponseOnClick} variant={tab === 'getReducedResponse' ? 'contained': 'outlined'}>Get reduced response</Button>
        <Button onClick={compareApiResponsesOnClick} variant={tab === 'compareApiResponses' ? 'contained': 'outlined'}>Compare two API responses</Button>
    </div>
    )
}