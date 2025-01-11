import '../assets/booksPopover.css';

export default function BooksPopover({books}) {

    return(<>

    <div popover="auto" id="booksPopover">
        <div id='booksPopoverContent'>
            <div id='booksPopoverTitle'>Books in this Book Store</div>
            {books.map(book => (
                <div className="booksPopoverEntry" key={book.title}>
                    <div className="booksPopoverName">{book.title}</div>
                    <div className="booksPopoverQuantity">({book.quantity} left)</div>
                </div>
            ))}
        </div>
    </div>

    </>)

}