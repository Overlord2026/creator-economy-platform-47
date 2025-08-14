export function validateRequest(schemas) {
  return (req, res, next) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body)
      }
      
      if (schemas.query) {
        req.query = schemas.query.parse(req.query)
      }
      
      if (schemas.params) {
        req.params = schemas.params.parse(req.params)
      }
      
      next()
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message
          }))
        })
      }
      next(error)
    }
  }
}