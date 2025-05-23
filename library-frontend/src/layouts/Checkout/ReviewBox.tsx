import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";
import { LeaveReview } from "../Utils/LeaveReview";

export const ReviewBox: React.FC<{ book: BookModel | undefined, mobile: boolean, 
    currentLoansCount: number, isAuthenticated: any, isCheckedOut: boolean, 
    checkoutBook: any, isReviewLeft: boolean, submitReview: any}> = (props) => {

    function buttonRender() {
        if (props.isAuthenticated) {
            if (!props.isCheckedOut && props.currentLoansCount < 5) {
                return (
                    <button className="btn btn-success btn-lg" onClick={() => props.checkoutBook()}>Checkout</button>
                ) 
            } else if (props.isCheckedOut) {
                    return (
                        <p className="text-success">
                            <b>Book checked out. Enjoy!</b>
                        </p>
                    )
            } else if (props.currentLoansCount >=5) {
                return (
                    <p className="text-danger">
                        <b>Too many books checked out.</b>
                    </p>
                )
            }
        } else {
            return (
                <Link to={'/login'} className="btn btn-success btn-lg">Sign in</Link>
            )
        }
    }

    function reviewRender() {
        if (props.isAuthenticated && !props.isReviewLeft) {
            return (
                <div><LeaveReview submitReview={props.submitReview}/></div>
            )
        } else if (props.isAuthenticated && props.isReviewLeft) {
            return (
                <p><b>Thank you for your review!</b></p>
            )
        }
        return (
            <div>
                <hr/>
                <p>Sign in to be able to leave a review.</p>
            </div>
        )
    }

    return (
        <div className={props.mobile ? "card d-flex mt-5" : "card col-3 container d-flex mb-5"}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>{props.currentLoansCount}/5 </b>
                        books checked out
                    </p>
                    <hr/>
                    {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ? 
                        <h4 className="text-success">
                            Available
                        </h4>
                    : 
                        <h4 className="text-danger">
                            Waitlist
                        </h4>
                    }
                    <div className="row">
                        <p className="col-6 lead">
                            <b>{props.book?.copies} </b>
                            copies
                        </p>
                        <p className="col-6 lead">
                            <b>{props.book?.copiesAvailable} </b>
                            available
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr/>
                <p className="mt-3">
                    This number can change until placing order has been complete.
                </p>
                {reviewRender()}
            </div>
        </div>
    );
};
