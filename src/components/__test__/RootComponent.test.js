import React from 'react';
import renderer from 'react-test-renderer';

import RootComponent from '../RootComponent';

describe('RootComponent', () => {

  it('should render correctly', () => {
    const tree = renderer.create(<RootComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have one child with correct value', () => {
    const tree = renderer.create(<RootComponent />).toJSON();
    
    expect(tree.children.length).toEqual(1);
    expect(tree.children[0]).toEqual('Hello World!');
  });

});
