import { app } from './api';

const port = 3333;
app.listen(port, () =>
  console.log(`API available on http://localhost:${port}`),
);
