import { ChangeEvent, useState } from "react";
import '../styles/globals.css';

type ResponseData = {
    id?: string;
    points?: number;
    error?: string;
} | null;

type Item = {
    shortDescription: string;
    price: string;
};


export default function Home() {
    const [formData, setFormData] = useState({
        retailer: "",
        purchaseDate: "",
        purchaseTime: "",
        total: "",
        items: [{ shortDescription: "", price: "" }],
    });

    const [response, setResponse] = useState<ResponseData>(null);
    const [searchId, setSearchId] = useState<string>("");
    const [pointsResponse, setPointsResponse] = useState<ResponseData>(null);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        index: number | null = null,
        field: keyof Item | null = null
    ) => {
        const { name, value } = e.target;
        if (index !== null && field !== null) {
            const items = [...formData.items];
            items[index][field] = value;
            setFormData({ ...formData, items });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const addItem = () => {
        setFormData({ ...formData, items: [...formData.items, { shortDescription: "", price: "" }] });
    };

    const removeItem = (index: number) => {
        const items = [...formData.items];
        items.splice(index, 1);
        setFormData({ ...formData, items });
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/receipts/process", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                setResponse({ id: data.id });
            } else {
                setResponse({ error: data.error });
            }
        } catch {
            setResponse({ error: "An unexpected error occurred" });
        }
    };

    const handleSearch = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/receipts/${searchId}/points`);
            const data = await res.json();
            if (res.ok) {
                setPointsResponse({ points: data.points });
            } else {
                setPointsResponse({ error: data.error });
            }
        } catch {
            setPointsResponse({ error: "An unexpected error occurred" });
        }
    };

    return (
        <div className="container">
            <div className="module">
                <h1 className="title">Receipt Processor</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Retailer</label>
                        <input
                            type="text"
                            name="retailer"
                            value={formData.retailer}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Purchase Date</label>
                        <input
                            type="date"
                            name="purchaseDate"
                            value={formData.purchaseDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Purchase Time</label>
                        <input
                            type="time"
                            name="purchaseTime"
                            value={formData.purchaseTime}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Total</label>
                        <input
                            type="number"
                            name="total"
                            value={formData.total}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <h3>Items</h3>
                        {formData.items.map((item, index) => (
                            <div key={index} className="item-group">
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={item.shortDescription}
                                    onChange={(e) => handleInputChange(e, index, "shortDescription")}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={item.price}
                                    onChange={(e) => handleInputChange(e, index, "price")}
                                    required
                                />
                                <button type="button" onClick={() => removeItem(index)} className="remove-btn">
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addItem} className="add-btn">Add Item</button>
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>

                {response && (
                    <div className="response">
                        {response.error ? (
                            <p className="error">{response.error}</p>
                        ) : (
                            <p>Receipt ID: {response.id}</p>
                        )}
                    </div>
                )}

                <div className="search">
                    <h2>Search for Points</h2>
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            placeholder="Enter Receipt ID"
                            required
                        />
                        <button type="submit" className="search-btn">Search</button>
                    </form>
                    {pointsResponse && (
                        <div className="response">
                            {pointsResponse.error ? (
                                <p className="error">{pointsResponse.error}</p>
                            ) : (
                                <p>Points: {pointsResponse.points}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
