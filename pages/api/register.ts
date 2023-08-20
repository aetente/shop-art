

export default async function handler (req:any, res:any) {
  const { username, password, email } = req.body;

  try {
    const response = await fetch('http://localhost:1337/auth/local/register',
      {
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          password,
          confirmed: true
        })
      })

    // setCookie({ res }, 'jwt', response.data.jwt, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV !== 'development',
    //   maxAge: 30 * 24 * 60 * 60,
    //   path: '/',
    // });

    res.status(200).json({response});
  } catch (e) {
    res.status(400).send('api error', e)
  }
}