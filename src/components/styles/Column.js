import styled from 'styled-components';

const Column = styled.div`
    flex-grow: ${(props) => props.flexGrow || "1"};
    display: flex;
    justify-content: ${(props) => props.justifyContent || "center"};
    align-items: ${(props) => props.alignItems || "center"};
`;

export default Column;