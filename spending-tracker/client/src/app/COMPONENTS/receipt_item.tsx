interface ReceiptProps {
    item: String,
    cost: String
}

export default function ReceiptItem({ item, cost }: ReceiptProps) {
    return (
        <div className="flex place-content-between">
            <p>{item}</p>
            <p>{cost}</p>
        </div>
    );
}