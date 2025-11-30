export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Why is it wrong again?" });
    }

    const WEBHOOK = process.env.WEBHOOK_URL;
    const SECRET = process.env.API_SECRET;
    const { name, question } = req.body;
    const time = new Date().toLocaleString("vi-VN");

    if (req.body.birthday !== SECRET) {
        return res.status(401).json({ error: "Unauthorized" });
    }


    const payload = {
        content:
            "```ini\n[Câu hỏi mới từ website]```" +
            `Thời gian: *${time}*\n` +
            `Tên: ***${name}***\n` +
            `Nội dung:\n${question}`
    };

    await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    return res.status(200).json({ success: true });
}
