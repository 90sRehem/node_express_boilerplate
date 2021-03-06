import { app } from '@shared/infra/http/app';

const PORT = process.env.PORT || 3333;

app.listen(PORT, () =>
  console.log(`Server started, listening on port ${PORT} 🚀`),
);
