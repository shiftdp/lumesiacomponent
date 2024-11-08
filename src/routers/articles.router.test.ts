
import { Request, Response } from 'express'
import request from 'supertest'
import app from '../app'

jest.mock('../controllers/articles.controller')

describe('Article Routes', () => {
  it('should get all artic', async () => {
    (articlesController.getAll as jest.Mock).mockImplementation((req: Request, res: Response) => {
      res.status(200).json([{ id: 1, title: 'Article 1' }])
    })

    const response = await request(app).get('/articles')

    expect(response.status).toBe(200)
    expect(response.body).toEqual([{ id: 1, title: 'Article 1' }])
  })

  it('should get an article by ID', async () => {
    (articlesController.getById as jest.Mock).mockImplementation((req: Request, res: Response) => {
      res.status(200).json({ id: 1, title: 'Article 1' })
    })

    const response = await request(app).get('/articles/1')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ id: 1, title: 'Article 1' })
  })

  it('should return 404 if article not found', async () => {
    (articlesController.getById as jest.Mock).mockImplementation((req: Request, res: Response) => {
      res.status(404).send()
    })

    const response = await request(app).get('/articles/1')

    expect(response.status).toBe(404)
  })
})
