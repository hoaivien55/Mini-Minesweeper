import renderer from 'react-test-renderer';
import { render } from "@testing-library/react";
import Loader from "..";


it('Loader: Virtual DOM snapshot', () => {
    const tree = renderer
      .create(<Loader show/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

test("Loader: not show loader", () => {
    render(<Loader show={false}/>);
    const divElement = document.querySelector(".lds-ripple");
    expect(divElement).toBeNull()
})