import styled from 'styled-components';


const PopupStyle = styled.div`
width: 100vw;
height: 100vh;
position: fixed;
left: 0;
top: 0;
background: #76c3c34d;
z-index: 100;
`;

const PopupContainerStyle = styled.div`
width: 100%;
height: 100%;
max-width: ${(props) => props.maxWidth || "400px"};
max-height: ${(props) => props.maxHeight || "200px"};
min-width: 200px;
min-height: 200px;
margin: 30px auto;
background: white;
border-radius: 12px;
`;

const PopupBodyStyle = styled.div`
width: 100%;
height: ${(props) => props.height || "70%"};
display: flex;
justify-content: center;
align-items: center;
.paragraph {
    font-size: 25px;
}
`;

const PopupFooter = styled.div`
width: 100%;
height: ${(props) => props.height || "30%"};
display: flex;
align-items: center;
justify-content: center;
border-top: 1px solid #80808030;
button:first-child {
    margin-right: 15px;
}
`;

export {
    PopupStyle,
    PopupContainerStyle,
    PopupBodyStyle,
    PopupFooter
}