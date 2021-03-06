import * as _ from 'underscore';

export const get = (obj, key) => {
    let keys = key.toString().replace(/\[(["']?)([^\1]+?)\1?\]/g, '.$2').replace(/^\./, '').split('.');
    let properties = _.chain(keys).reverse().map(_.property).value();

    return _.isEmpty(properties) ? obj : _.compose.apply(null, properties)(obj);
};

export const set = (obj, key, value) => {
    let keys = key.toString().replace(/\[(["']?)([^\1]+?)\1?\]/g, '.$2').replace(/^\./, '').split('.');
    let properties = _.chain(keys).initial().reverse().map(_.property).value();
    let base = _.isEmpty(properties) ? obj : _.compose.apply(null, properties)(obj);

    if (base) {
        base[_.last(keys)] = value;
    }
};

export const wrappedPromise = () => {
    var wrappedPromise = {},
        promise = new Promise(function (resolve, reject) {
            wrappedPromise.resolve = resolve;
            wrappedPromise.reject = reject;
        });
    wrappedPromise.then = promise.then.bind(promise);
    wrappedPromise.catch = promise.catch.bind(promise);
    wrappedPromise.promise = promise;

    return wrappedPromise;
};
