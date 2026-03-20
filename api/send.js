export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = req.body;

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Acme <onboarding@resend.dev>', // Keep this exactly as is for Resend free tier testing
                to: ['nottsuraj@gmail.com'], // The email where you want to receive messages
                subject: `New Portfolio Message from ${name}`,
                html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br>${message}</p>`
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
