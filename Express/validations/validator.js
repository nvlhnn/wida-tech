const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    const errors = err.inner.map((e) => {
      return {
        path: e.path,
        errors: e.errors,
      };
    });

    next({
      code: 422,
      message: errors,
    });

  }
};

module.exports = validate;
