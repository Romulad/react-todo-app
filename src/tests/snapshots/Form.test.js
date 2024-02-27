import renderer from "react-test-renderer"

import Form, {ErrorContainer} from "../../components/Form";


test("Form component do not change", ()=>{
    const component = renderer.create(
        <Form tasks={[{name:"lunch"}]}></Form>
    );
    
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("ErrorContainer do not change", ()=>{
    const component = renderer.create(
        <ErrorContainer text='An error'></ErrorContainer>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})