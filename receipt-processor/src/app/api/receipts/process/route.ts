import { receipts } from '@/utils/receiptStore';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const id = uuidv4();
        const receipt = await req.json();

        const points = calculatePoints(receipt);
        const dataSet = receipts.set(id, points);

        if (!dataSet) {
            return new Response(JSON.stringify({ error: 'Failed to store receipt data' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ id }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid receipt data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        });
    }
}

function calculatePoints(receipt: {
    retailer: string;
    total: string;
    purchaseDate: string;
    purchaseTime: string;
    items: { shortDescription: string; price: string }[];
  }): number {
    let points = (receipt.retailer.match(/[a-zA-Z0-9]/g) || []).length;

    if (Number.isInteger(parseFloat(receipt.total))) {
        points += 50;
    }

    if ((parseFloat(receipt.total) * 100) % 25 === 0) {
        points += 25;
    }

    points += Math.floor(receipt.items.length / 2) * 5;

    receipt.items.forEach(item => {
        const trimmedDesc = item.shortDescription.trim();
        if (trimmedDesc.length % 3 === 0) {
          points += Math.ceil(parseFloat(item.price) * 0.2);
        }
    });

    const day = parseInt(receipt.purchaseDate.split('-')[2], 10);
    if (day % 2 !== 0) {
        points += 6;
    }

    const [hour, minute] = receipt.purchaseTime.split(':').map(Number);
    if (hour === 14 || (hour === 15 && minute < 60)) {
        points += 10;
    }

    return points
}
