import ShelfCurrentLoans from "../../models/ShelfCurrentLoans"

export const LoansModel: React.FC<{currentLoans: ShelfCurrentLoans, mobile: boolean, returnBook: any, renewLoan: any}> = (props) => {

    return (
        <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" 
            aria-labelledby="staticBackdropLabel" aria-hidden="true" key={props.currentLoans.book.id} 
            id={props.mobile ? `mobilemodal${props.currentLoans.book.id}` : `modal${props.currentLoans.book.id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">
                                Loans Options
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="mt-3">
                                    <div className="row">
                                        <div className="col-2">
                                            {props.currentLoans.book?.img ?
                                                <img src={props.currentLoans.book?.img} width="56" height="87" alt="book" />
                                                :
                                                <img src={require("./../../Images/BooksImages/book-1000.png")} width="56" height="87" alt="book" />
                                            }
                                        </div>
                                        <div className="col-10">
                                            <h6>{props.currentLoans.book.author}</h6>
                                            <h4>{props.currentLoans.book.title}</h4>
                                        </div>
                                    </div>
                                    <hr/>
                                    {props.currentLoans.daysLeft > 0 && 
                                        <p className="text-secondary">
                                            Due in {props.currentLoans.daysLeft} days.
                                        </p>
                                    }
                                    {props.currentLoans.daysLeft == 0 &&
                                        <p className="text-success">
                                            Due Today.
                                        </p>
                                    }
                                    {props.currentLoans.daysLeft < 0 &&
                                        <p className="text-danger">
                                            Past due by {props.currentLoans.daysLeft} days.
                                        </p>
                                    }
                                    <div className="list-group mt-3">
                                        <button onClick={() => props.returnBook(props.currentLoans.book.id)} 
                                            data-bs-dismiss="modal" className="list-group-item list-group-item-action" aria-current="true">
                                                Return Book
                                        </button>
                                        <button onClick={
                                            props.currentLoans.daysLeft < 0 
                                            ? (event) => event.preventDefault() 
                                            : () => props.renewLoan(props.currentLoans.book.id)} 
                                            data-bs-dismiss="modal" className={
                                                props.currentLoans.daysLeft < 0 
                                                ? "list-group-item list-group-item-action inactiveLink"
                                                : "list-group-item list-group-item-action"
                                        }>
                                            {props.currentLoans.daysLeft < 0
                                                ? "Late dues cannot be renewed"
                                                : "Renew Book"
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    )
}