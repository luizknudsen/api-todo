const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB Atlas"))
  .catch(err => console.log("Erro: " + err));

const Tarefa = mongoose.model('Tarefa', {
  descricao: String
});

app.get('/api/getAll', async (req, res) => {
  const tarefas = await Tarefa.find();
  res.json(tarefas);
});

app.post('/api/create', async (req, res) => {
  const tarefa = new Tarefa({ descricao: req.body.descricao });
  await tarefa.save();
  res.json({ message: 'Tarefa criada com sucesso!' });
});

app.delete('/api/delete/:id', async (req, res) => {
    await Tarefa.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tarefa removida com sucesso' });
  });
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
