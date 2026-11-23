export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.GITHUB_TOKEN || req.headers['x-github-token'];
  if (!token) {
    return res.status(401).json({ 
      error: 'GitHub Token diperlukan untuk simpan permanen. Masukkan Token di CMS atau atur GITHUB_TOKEN di Vercel.' 
    });
  }

  const { content } = req.body || {};
  if (!content || typeof content !== 'object') {
    return res.status(400).json({ error: 'Payload konten tidak valid.' });
  }

  const owner = "bobienmartin-bit";
  const repo = "drone-portfolio";
  const path = "site-config.json";
  const branch = "main";

  try {
    // 1. Fetch current file sha if it exists
    let sha = null;
    const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    }

    // 2. Put updated content to GitHub
    const jsonStr = JSON.stringify(content, null, 2);
    const contentBase64 = Buffer.from(jsonStr).toString('base64');

    const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'cms: update site configuration permanently [skip ci]',
        content: contentBase64,
        sha: sha || undefined,
        branch
      })
    });

    if (!putRes.ok) {
      const errData = await putRes.json();
      return res.status(putRes.status).json({ 
        error: errData.message || 'Gagal menyimpan ke GitHub.' 
      });
    }

    const result = await putRes.json();
    return res.status(200).json({ 
      success: true, 
      commit: result.commit ? result.commit.sha : null,
      message: 'Perubahan berhasil disimpan permanen ke GitHub dan otomatis terdeploy di Vercel!'
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
