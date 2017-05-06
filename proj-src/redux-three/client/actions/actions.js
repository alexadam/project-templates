const actions = {
    SELECT_SHAPE: Symbol('SELECT_SHAPE')
};

const selectShape = (shape) => ({
    type: actions.SELECT_SHAPE,
    shape: shape
});

export {actions, selectShape};
