import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ofetch } from 'ofetch';
import path from 'path';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/mahasiswa', async (req, res) => {
  try {
    const q = req.query.search;
    const response = await ofetch(`${process.env.BASE_URL}/hit_mhs/${q}`, {
      method: 'GET',
      responseType: 'json',
      parseResponse: JSON.parse,
    });

    return res.status(200).json({ data: response.mahasiswa });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/dosen', async (req, res) => {
  try {
    const q = req.query.search;
    const response = await ofetch(`${process.env.BASE_URL}/hit/${q}`, {
      method: 'GET',
      responseType: 'json',
      parseResponse: JSON.parse,
    });

    return res.status(200).json({ data: response.dosen });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/all', async (req, res) => {
  try {
    const q = req.query.search;
    const mahasiswa = await ofetch(`${process.env.BASE_URL}/hit_mhs/${q}`, {
      method: 'GET',
      responseType: 'json',
      parseResponse: JSON.parse,
    });
    const dosen = await ofetch(`${process.env.BASE_URL}/hit/${q}`, {
      method: 'GET',
      responseType: 'json',
      parseResponse: JSON.parse,
    });

    const data = mahasiswa.mahasiswa.concat(dosen.dosen);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')));
// if (process.env.NODE_ENV === 'production') {
// } else {
//   app.get('/', (req, res) => res.send('Server Ready'));
// }

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
