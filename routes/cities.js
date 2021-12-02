const express = require('express')
const router = express.Router()
const City = require('../models/city')
const { check, validationResult } = require('express-validator')

// Rota de pesquisa de cidades
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  if (req.query.state != null && req.query.state !== '') {
    searchOptions.state = new RegExp(req.query.state, 'i')
  }
  try {
    const cities = await City.find(searchOptions)
    res.render('cities/index', {
      cities: cities,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

router.get('/new', (req, res) => {
  res.render('cities/new', { city: new City() })
})

// Rota de criação da cidade
router.post('/',
  [
    check('name').isLength({ min: 5 }).withMessage("O nome precisa ter no mínimo 5 caracteres."),
    check('state').isLength({ min: 2, max: 2 }).withMessage("O estado precisa ter exatamente 2 caracteres.")
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const city = new City({
      name: req.body.name,
      state: req.body.state
    })
    try {
      const newCity = await city.save()
      res.redirect(`cities/${newCity.id}`)
    } catch {
      res.render('cities/new', {
        city: city,
        errorMessage: 'Erro durante a criação da cidade.'
      })
      res.json({ message: "Erro durante a criação da cidade." })
      console.log('Erro durante a criação da cidade.')
    }
  })

// Rota de exibição de informações de uma cidade
router.get('/:id', async (req, res) => {
  try {
    const city = await City.findById(req.params.id)
    res.render('cities/show', {
      city: city
    })
  } catch {
    res.redirect('/')
  }
})

// Rota para localização de uma cidade para edição
router.get('/:id/edit', async (req, res) => {
  try {
    const city = await City.findById(req.params.id)
    res.render('cities/edit', { city: city })
  } catch {
    res.redirect('/cities')
  }
})

// Rota de atualização de uma cidade
router.put('/:id',
  [
    check('name').isLength({ min: 5 }).withMessage("O nome precisa ter no mínimo 5 caracteres."),
    check('state').isLength({ min: 2, max: 2 }).withMessage("O estado precisa ter exatamente 2 caracteres.")
  ],

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    let city
    try {
      city = await City.findById(req.params.id)
      city.name = req.body.name
      city.state = req.body.state
      await city.save()
      res.redirect(`/cities/${city.id}`)
    } catch {
      if (city == null) {
        res.redirect('/')
      } else {
        res.render('cities/edit', {
          city: city,
          errorMessage: 'Erro durante a atualização da cidade.'
        })
        res.json({ message: "Erro durante a atualização da cidade." })
        console.log('Erro durante a atualização da cidade.')
      }
    }
  })

// Rota de exclusão de uma cidade
router.delete('/:id', async (req, res) => {
  let city
  try {
    city = await City.findById(req.params.id)
    await city.remove()
    res.redirect('/cities')
  } catch {
    if (city == null) {
      res.redirect('/')
    } else {
      res.json({ message: "Não é possível excluir esta cidade." })
    }
  }
})

module.exports = router