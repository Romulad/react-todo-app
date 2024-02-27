import renderer from "react-test-renderer"

import Todo from "../../components/Todo";


test("Todo component do not change", ()=>{
    const component = renderer.create(
        <Todo></Todo>
    );
    
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});