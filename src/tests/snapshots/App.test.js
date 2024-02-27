import renderer from 'react-test-renderer';

import App from "../../App";

test('App do not change', ()=>{
    const component = renderer.create(
        <App></App>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})