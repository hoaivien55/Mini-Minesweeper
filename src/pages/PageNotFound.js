import { Link } from "react-router-dom";
import { Container, Row } from "../components/styles";

const PageNotFound = () => {
    return <Container>
        <Row style={{fontSize: '70px'}}>404</Row>
        <Row>Page not found.</Row>
        <Link to="/">Home page</Link>
    </Container>
}

export default PageNotFound;