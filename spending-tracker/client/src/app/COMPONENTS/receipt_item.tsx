interface ReceiptProps {
    itemKey: number,
    item: String,
    cost: String,
    onClick: (key: number) => void;
}

export default function ReceiptItem({ itemKey, item, cost, onClick }: ReceiptProps) {
    return (
        <button onClick={() => onClick(itemKey)}>
            <div className="flex place-content-between hover:bg-[#D9D9D9]">
                <div className="max-w-1/2 text-start">{item}</div>
                <div>{cost}</div>
            </div>
        </button>
    );
}