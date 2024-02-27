import renderer from 'react-test-renderer';
import FilterButton from '../../components/FilterButton';


test("FilterButton renders correctly", ()=>{
    const component = renderer.create(
        <FilterButton  name="All" isActive="true"></FilterButton>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
