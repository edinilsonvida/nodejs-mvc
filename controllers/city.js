const City = require('../models/city')

// Cria e salva uma cidade
exports.createCity = (req, res) => {
  // Valida a requisição
  if (!req.body) {
    res.status(400).send({
      message: "Os campos não podem ficar vazios!"
    });
  }

  // Cria uma cidade
  const city = new City({
    name: req.body.name,
    state: req.body.state
  });

  // Salva a cidade no banco de dados
  City.create(city, (err, city) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Um erro ocorreu durante a criação da cidade."
      });
    else res.send(city)
  });
};

//Recupera todas as cidades do banco de dados
exports.findAllCities = (req, res) => {
  City.find((err, city) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Um erro ocorreu durante a recuperação da listagem das cidades."
      });
    else res.send(city)
  });
};

//Encontra a cidade pelo id informado
exports.findCityById = (req, res) => {
  City.findById(req.params.id, (err, city) => {
    if (err)
      res.status(500).send({
        message: `Um erro ocorreu durante a recuperação da cidade pelo id ${req.params.id} informado.`
      });
    else res.send(city)
  });
};

//Atualiza a cidade pelo id informado
exports.updateCityById = (req, res) => {
  // Valida a requisição
  if (!req.body) {
    res.status(400).send({
      message: "Os campos não podem ficar vazios!"
    });
  }

  City.findById(req.params.id, function (err, city) {
    if (err)
      res.send('err: ' + err);
    city.name = req.body.name;
    city.state = req.body.state;
    city.save(function (err) {
      if (err)
        res.status(500).send({
          message: `Um erro ocorreu durante a atualização do nome do cliente pelo id ${req.params.id} informado.`
        });
      else res.send(city)
    })
  })
}

//Exclui a cidade pelo id informado
exports.deleteCityById = (req, res) => {
  City.findOneAndDelete(req.params.id, (err, city) => {
    if (err)
      res.status(500).send({
        message: `Um erro ocorreu durante a exclusão da cidade pelo id ${req.params.id} informado.`
      })
    else res.send({ message: "Cidade excluída com sucesso!" })
  })
}

//Exclui todas as cidades do banco de dados
exports.deleteAllCities = (req, res) => {
  City.deleteMany((err, city) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Um erro ocorreu durante a exclusão de todas as cidades."
      });
    else res.send({ message: "Todas as cidades foram excluídas com sucesso!" })
  })
}