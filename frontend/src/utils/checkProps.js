import checkPropTypes from 'check-prop-types';

const checkProps = (component, expectedProps) => {

    let componentPropTypes;
    let componentName;

    if (component.propTypes) {
        componentPropTypes = component.propTypes;
        componentName = component.name;
    } else {
        componentPropTypes = component.WrappedComponent.propTypes;
        componentName = component.WrappedComponent.name;
    }

    const propsErr = checkPropTypes(componentPropTypes, expectedProps, 'props', componentName);
    return propsErr;
}

export default checkProps;