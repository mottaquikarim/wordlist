const fs = require('fs');
const promisify = (fn) => (...args) => {
    return new Promise((resolve, reject) => {
        args.push((err, ...rest) => {
            if (err) {
                reject(err);
            }
            resolve(...rest);
        });
        fn(...args);
    });
} // promisify


const fsReadPromise = promisify(fs.readFile);
const fsWritePromise = promisify(fs.writeFile);

fsReadPromise('./wordslist.txt', 'utf8')
    .then((data) => data.split('\n').reduce((_info, curr) => {
        _info.obj[curr] = true;
        if (curr.slice(-2) === 'us') {
            const stem = curr.slice(0, curr.length-2);
            if (_info.obj[stem+'i']) {
                _info.list.push(curr);
                _info.obj = {};
            }
        }
        return _info;
    }, {obj: {}, list: []}))
    .then(({obj, list}) => fsWritePromise('./us-list.txt', list.join('\n')))
    .then(() => {
        console.log('Completed');
    });

