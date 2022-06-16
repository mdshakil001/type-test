import styled from 'styled-components';
import AddAlertIcon from '@mui/icons-material/AddAlert';

export const Wrapper = styled.div`
    margin: 40px;
`;

export const StyledButton = styled(AddAlertIcon)`
    position: fixed;
    z-index: 100;
    right: 20px;
    top: 20px;
    cursor: pointer;
`;
