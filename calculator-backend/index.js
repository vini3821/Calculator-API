const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Api Calculator');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
}); 


app.post('/soma', (req, res) => {
    const { num1, num2 } = req.body;
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return res.status(400).json({ error: 'As entradas devem ser números' });
    }
    res.json({ result: num1 + num2 });
});

app.post('/subtracao', (req, res) => {
    const {num1, num2} = req.body;
    res.json({result: num1 - num2});
});

app.post('/multiplicacao', (req, res) => {
    const {num1, num2} = req.body;
    res.json({result: num1 * num2});
});

app.post('/divisao', (req, res) => {
    const {num1, num2} = req.body;
    if (num2 === 0) {
        return res.status(400).json({ error: 'Não é possível dividir por zero' });
    }
    res.json({result: num1 / num2});
});