import PropTypes from 'prop-types';

const Container = ({children}) => {
    return (
        <div style={{ minHeight: 'calc(100vh - 96px)' }}>
            {children}
        </div>
    );
};

export default Container;

Container.propTypes = {
    children: PropTypes.node.isRequired
}