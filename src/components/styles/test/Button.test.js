import renderer from 'react-test-renderer';
import { Button } from '../Button';

it('Button: Virtual DOM snapshot', () => {
    const tree = renderer
      .create(<Button />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
