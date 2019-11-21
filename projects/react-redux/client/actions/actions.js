const actions = {
    ADD: 'ADD',
    REMOVE: 'REMOVE'
};

const add = (amount) => ({
    type: actions.ADD,
    amount: amount
});

const remove = (amount) => ({
    type: actions.REMOVE,
    amount: amount
});

export {actions, add, remove};
