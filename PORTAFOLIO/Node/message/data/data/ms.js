fs.readFile('./data/secret.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`El mensaje secreto es: ${data}`);
});