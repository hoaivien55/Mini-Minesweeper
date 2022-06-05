import renderer from 'react-test-renderer';
import { PopupBodyStyle, PopupContainerStyle, PopupFooter, PopupStyle } from '../PopupStyle';


it('PopupContainerStyle: Virtual DOM snapshot', () => {
    const tree = renderer
      .create(<PopupContainerStyle />)
      .toJSON();
    expect(tree).toMatchSnapshot();
});

it('PopupContainerStyle: Virtual DOM snapshot change max-width and max-height', () => {
    const tree = renderer
      .create(<PopupContainerStyle maxWidth={"1px"} maxHeight={"1px"} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
});


it('PopupStyle: Virtual DOM snapshot', () => {
    const tree = renderer
      .create(<PopupStyle />)
      .toJSON();
    expect(tree).toMatchSnapshot();
});

it('PopupBodyStyle: Virtual DOM snapshot', () => {
    const tree = renderer
      .create(<PopupBodyStyle />)
      .toJSON();
    expect(tree).toMatchSnapshot();
});

it('PopupFooter: Virtual DOM snapshot', () => {
    const tree = renderer
      .create(<PopupFooter />)
      .toJSON();
    expect(tree).toMatchSnapshot();
});